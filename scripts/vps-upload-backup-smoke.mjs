import { execFile as execFileCallback } from "node:child_process";
import { access, rm } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { SignJWT } from "jose";

const execFile = promisify(execFileCallback);

function required(name) {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is required`);
  return value;
}

const jwtSecret = new TextEncoder().encode(required("JWT_SECRET"));
const adminEmail = required("ADMIN_EMAIL").toLowerCase().trim();
const storageDirectory = required("STORAGE_DIR");
const baseUrl = process.env.POSLE_SMOKE_BASE_URL || "http://127.0.0.1:3000";

async function adminCookie() {
  const token = await new SignJWT({ clientId: 0, email: adminEmail })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("5m")
    .sign(jwtSecret);
  return `posle_client_session=${token}`;
}

async function latestBackupDirectory() {
  const { stdout } = await execFile("sudo", [
    "find", "/var/backups/posle/daily", "-mindepth", "1", "-maxdepth", "1", "-type", "d", "-printf", "%T@ %p\\n",
  ]);
  const latest = stdout
    .trim()
    .split("\n")
    .map(line => ({ modified: Number(line.slice(0, line.indexOf(" "))), directory: line.slice(line.indexOf(" ") + 1) }))
    .sort((a, b) => b.modified - a.modified)[0]?.directory;
  if (!latest) throw new Error("Fresh backup directory was not found");
  return latest;
}

let key;
try {
  const cookie = await adminCookie();
  const form = new FormData();
  form.append("file", new Blob([new Uint8Array([0xff, 0xd8, 0xff, 0xd9])], { type: "image/jpeg" }), "backup-smoke.jpg");

  const upload = await fetch(`${baseUrl}/api/upload`, {
    method: "POST",
    headers: { cookie },
    body: form,
  });
  if (!upload.ok) throw new Error(`Upload endpoint returned ${upload.status}`);
  const payload = await upload.json();
  key = payload.key;
  if (typeof key !== "string" || !key.startsWith("visits/")) throw new Error("Upload returned an unexpected key");

  await access(path.join(storageDirectory, key));
  const privateRead = await fetch(`${baseUrl}/uploads/${key}`, { headers: { cookie } });
  if (privateRead.status !== 200) throw new Error(`Admin private-media read returned ${privateRead.status}`);

  await execFile("sudo", ["systemctl", "start", "posle-backup.service"]);
  const latest = await latestBackupDirectory();
  const { stdout: archiveEntries } = await execFile("sudo", ["tar", "-tzf", path.join(latest, "uploads.tar.gz")]);
  if (!archiveEntries.split("\n").includes(`uploads/${key}`)) {
    throw new Error("Fresh backup does not contain the uploaded cabinet file");
  }

  console.log("VPS_UPLOAD_BACKUP_SMOKE_OK upload=200 local_storage=yes private_admin_read=200 backup_contains_file=yes");
} finally {
  if (key) await rm(path.join(storageDirectory, key), { force: true });
}
