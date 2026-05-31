import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { trpc } from "@/lib/trpc";
import { useParams, Link } from "wouter";
import { toast } from "sonner";
import { ArrowLeft, Plus, Save, Upload, ChevronDown, ChevronUp, PawPrint, Edit2, Check, X, Calendar } from "lucide-react";
import { useClientAuth } from "@/hooks/useClientAuth";

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(168,197,181,0.2)",
  color: "#F5F0E8",
  fontFamily: "'Inter', sans-serif",
  fontSize: "13px",
  padding: "10px 14px",
  outline: "none",
  transition: "border-color 0.2s",
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  fontFamily: "'Inter', sans-serif",
  fontSize: "10px",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: "rgba(245,240,232,0.35)",
  marginBottom: "6px",
  display: "block",
};

function PhotoSlot({ url, label, onUpload }: { url?: string | null; label: string; onUpload: () => void }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      {url ? (
        <div style={{ position: "relative" }}>
          <img src={url} alt={label} style={{ width: "100%", height: "180px", objectFit: "cover", display: "block" }} />
          <button
            onClick={onUpload}
            style={{ position: "absolute", bottom: "8px", right: "8px", background: "rgba(14,14,14,0.85)", border: "1px solid rgba(168,197,181,0.3)", padding: "6px 12px", cursor: "pointer", color: "#A8C5B5", fontFamily: "'Inter', sans-serif", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase" }}
          >
            Заменить
          </button>
        </div>
      ) : (
        <button
          onClick={onUpload}
          style={{ width: "100%", height: "140px", background: "rgba(168,197,181,0.04)", border: "1px dashed rgba(168,197,181,0.25)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "10px", cursor: "pointer", transition: "all 0.2s" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(168,197,181,0.08)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(168,197,181,0.4)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(168,197,181,0.04)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(168,197,181,0.25)"; }}
        >
          <Upload size={18} color="rgba(168,197,181,0.5)" />
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(168,197,181,0.5)" }}>Загрузить фото</span>
        </button>
      )}
    </div>
  );
}

// VisitEditor has its own file input ref — this eliminates the race condition
// that occurred when the parent's state was used to track which visit/type was being uploaded.
function VisitEditor({ visit, clientId, onUpdate, isUpdating }: {
  visit: any;
  clientId: number;
  onUpdate: (data: any) => void;
  isUpdating: boolean;
}) {
  const [fields, setFields] = useState({
    masterNotes: visit.masterNotes || "",
    cosmeticsUsed: visit.cosmeticsUsed || "",
    behaviorNotes: visit.behaviorNotes || "",
    homeCareTips: visit.homeCareTips || "",
    nextVisitSuggestion: visit.nextVisitSuggestion || "",
    beforePhotoUrl: visit.beforePhotoUrl || "",
    beforePhotoKey: visit.beforePhotoKey || "",
    afterPhotoUrl: visit.afterPhotoUrl || "",
    afterPhotoKey: visit.afterPhotoKey || "",
  });

  // Use ref to avoid stale closure in file input onChange — fix for the race condition
  const uploadTypeRef = useRef<"before" | "after" | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const uploadPhoto = trpc.admin.uploadPhoto.useMutation({
    onSuccess: (result: any) => {
      const type = uploadTypeRef.current;
      if (type === "before") {
        const updated = { ...fields, beforePhotoUrl: result.url, beforePhotoKey: result.key };
        setFields(updated);
        onUpdate(updated);
      } else if (type === "after") {
        const updated = { ...fields, afterPhotoUrl: result.url, afterPhotoKey: result.key };
        setFields(updated);
        onUpdate(updated);
      }
      uploadTypeRef.current = null;
      toast.success("Фото загружено");
    },
    onError: (e: any) => {
      toast.error(e.message || "Ошибка загрузки фото");
      uploadTypeRef.current = null;
    },
  });

  const handlePhotoClick = useCallback((type: "before" | "after") => {
    uploadTypeRef.current = type;
    if (fileRef.current) {
      fileRef.current.value = "";
      fileRef.current.click();
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      uploadPhoto.mutate({
        base64: reader.result as string,
        mimeType: file.type as "image/jpeg" | "image/png" | "image/webp",
        purpose: uploadTypeRef.current === "before" ? "before_photo" : "after_photo",
        clientId,
      });
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  return (
    <div style={{ padding: "20px 24px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      {/* Before / After photos — responsive grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "24px" }}>
        <PhotoSlot url={fields.beforePhotoUrl} label="Фото до" onUpload={() => handlePhotoClick("before")} />
        <PhotoSlot url={fields.afterPhotoUrl} label="Фото после" onUpload={() => handlePhotoClick("after")} />
      </div>

      {uploadPhoto.isPending && (
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#A8C5B5", marginBottom: "16px" }}>
          Загружаем фото...
        </p>
      )}

      {/* Notes — responsive grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "14px", marginBottom: "14px" }}>
        {[
          { key: "masterNotes", label: "Заметки мастера" },
          { key: "behaviorNotes", label: "Поведение питомца" },
          { key: "cosmeticsUsed", label: "Косметика" },
          { key: "homeCareTips", label: "Рекомендации домой" },
        ].map(({ key, label }) => (
          <div key={key}>
            <label style={labelStyle}>{label}</label>
            <textarea
              style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }}
              value={(fields as any)[key]}
              onChange={(e) => setFields({ ...fields, [key]: e.target.value })}
              onFocus={(e) => (e.target.style.borderColor = "#A8C5B5")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(168,197,181,0.2)")}
            />
          </div>
        ))}
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label style={labelStyle}>Следующий визит</label>
        <textarea
          style={{ ...inputStyle, minHeight: "60px", resize: "vertical" }}
          value={fields.nextVisitSuggestion}
          onChange={(e) => setFields({ ...fields, nextVisitSuggestion: e.target.value })}
          onFocus={(e) => (e.target.style.borderColor = "#A8C5B5")}
          onBlur={(e) => (e.target.style.borderColor = "rgba(168,197,181,0.2)")}
        />
      </div>

      <button
        onClick={() => onUpdate(fields)}
        disabled={isUpdating}
        className="btn-mint"
        style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 24px", fontSize: "11px" }}
      >
        <Save size={13} />
        {isUpdating ? "Сохраняем..." : "Сохранить изменения"}
      </button>

      {/* Each VisitEditor has its own hidden file input */}
      <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" style={{ display: "none" }} onChange={handleFileChange} />
    </div>
  );
}

export default function AdminClientDetail() {
  const { id } = useParams<{ id: string }>();
  const clientId = parseInt(id || "0");
  const { isLoading: authLoading } = useClientAuth(true);

  const [editingName, setEditingName] = useState(false);
  const [nameValue, setNameValue] = useState("");
  const [showNewVisit, setShowNewVisit] = useState(false);
  const [showNewPet, setShowNewPet] = useState(false);
  const [selectedVisitId, setSelectedVisitId] = useState<number | null>(null);

  // Pet photo upload — also use ref to avoid stale closure
  const petPhotoRef = useRef<HTMLInputElement>(null);
  const petPhotoIdRef = useRef<number | null>(null);

  const { data, isLoading, refetch } = trpc.admin.getClient.useQuery(
    { clientId },
    { enabled: !!clientId }
  );

  const updateClient = trpc.admin.updateClient.useMutation({
    onSuccess: () => { toast.success("Имя обновлено"); setEditingName(false); refetch(); },
    onError: (e: any) => toast.error(e.message),
  });

  const upsertPet = trpc.admin.upsertPet.useMutation({
    onSuccess: () => { toast.success("Питомец сохранён"); setShowNewPet(false); refetch(); },
    onError: (e: any) => toast.error(e.message),
  });

  const createVisit = trpc.admin.createVisit.useMutation({
    onSuccess: () => { toast.success("Визит добавлен"); setShowNewVisit(false); refetch(); },
    onError: (e: any) => toast.error(e.message),
  });

  const updateVisit = trpc.admin.updateVisit.useMutation({
    onSuccess: () => { toast.success("Визит обновлён"); refetch(); },
    onError: (e: any) => toast.error(e.message),
  });

  const updatePetPhoto = trpc.admin.updatePetPhoto.useMutation({
    onSuccess: () => { toast.success("Фото питомца сохранено"); refetch(); },
    onError: (e: any) => toast.error(e.message),
  });

  const uploadPetPhoto = trpc.admin.uploadPhoto.useMutation({
    onSuccess: (result: any) => {
      const petId = petPhotoIdRef.current;
      if (petId) {
        updatePetPhoto.mutate({ petId, clientId, photoUrl: result.url, photoKey: result.key });
      }
      petPhotoIdRef.current = null;
    },
    onError: (e: any) => toast.error(e.message),
  });

  const handlePetPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      uploadPetPhoto.mutate({
        base64: reader.result as string,
        mimeType: file.type as "image/jpeg" | "image/png" | "image/webp",
        purpose: "pet_photo",
        clientId,
      });
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const [newVisit, setNewVisit] = useState({
    petId: 0,
    visitDate: new Date().toISOString().slice(0, 16),
    serviceType: "",
    cosmeticsUsed: "",
    masterNotes: "",
    behaviorNotes: "",
    homeCareTips: "",
    nextVisitSuggestion: "",
  });

  const [newPet, setNewPet] = useState({ name: "", breed: "", notes: "" });

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-[#0E0E0E] flex items-center justify-center">
        <div className="w-px h-12 bg-[#A8C5B5] animate-pulse" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-[#0E0E0E] flex items-center justify-center">
        <p style={{ color: "rgba(245,240,232,0.4)", fontFamily: "'Inter', sans-serif" }}>Клиент не найден</p>
      </div>
    );
  }

  const { client, pets, visits } = data as any;

  return (
    <div style={{ minHeight: "100vh", background: "#0E0E0E", color: "#F5F0E8" }}>
      {/* Header */}
      <header style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "0 16px", height: "64px", display: "flex", alignItems: "center", gap: "16px", position: "sticky", top: 0, background: "#0E0E0E", zIndex: 10 }}>
        <Link
          href="/admin"
          style={{ display: "flex", alignItems: "center", gap: "8px", fontFamily: "'Inter', sans-serif", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(245,240,232,0.4)", textDecoration: "none", transition: "color 0.2s", flexShrink: 0 }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(245,240,232,0.7)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(245,240,232,0.4)")}
        >
          <ArrowLeft size={14} />
          <span>Клиенты</span>
        </Link>
        <div style={{ width: "1px", height: "20px", background: "rgba(255,255,255,0.1)", flexShrink: 0 }} />
        {editingName ? (
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flex: 1, minWidth: 0 }}>
            <input
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)}
              style={{ ...inputStyle, flex: 1, maxWidth: "300px", padding: "6px 12px", fontSize: "16px", fontFamily: "'Cormorant Garamond', serif" }}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") updateClient.mutate({ clientId, name: nameValue });
                if (e.key === "Escape") setEditingName(false);
              }}
            />
            <button onClick={() => updateClient.mutate({ clientId, name: nameValue })} style={{ background: "none", border: "none", cursor: "pointer", color: "#A8C5B5", padding: "4px", flexShrink: 0 }}><Check size={16} /></button>
            <button onClick={() => setEditingName(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(245,240,232,0.4)", padding: "4px", flexShrink: 0 }}><X size={16} /></button>
          </div>
        ) : (
          <button
            onClick={() => { setNameValue(client.name || ""); setEditingName(true); }}
            style={{ display: "flex", alignItems: "center", gap: "8px", background: "none", border: "none", cursor: "pointer", color: "#F5F0E8", fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(16px, 3vw, 22px)", fontWeight: 300, padding: 0, overflow: "hidden", flex: 1, minWidth: 0 }}
          >
            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{client.name || "Без имени"}</span>
            <Edit2 size={13} color="rgba(245,240,232,0.3)" style={{ flexShrink: 0 }} />
          </button>
        )}
        <Link href="/" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", fontWeight: 300, letterSpacing: "0.2em", color: "#F5F0E8", textDecoration: "none", flexShrink: 0, marginLeft: "auto" }}>
          ПОСЛЕ
        </Link>
      </header>

      {/* Content */}
      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "32px 16px 80px", width: "100%" }}>
        {/* Client info */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} style={{ marginBottom: "40px" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", letterSpacing: "0.35em", textTransform: "uppercase", color: "#A8C5B5", marginBottom: "8px" }}>Клиент #{client.id}</p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "rgba(245,240,232,0.4)" }}>{client.email || client.phone || "—"}</p>
          {client.createdAt && (
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", color: "rgba(245,240,232,0.2)", marginTop: "4px" }}>
              Клиент с {new Date(client.createdAt).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })}
            </p>
          )}
        </motion.div>

        {/* Pets section */}
        <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }} style={{ marginBottom: "48px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", flexWrap: "wrap", gap: "10px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <PawPrint size={16} color="#A8C5B5" />
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "24px", fontWeight: 300, color: "#F5F0E8" }}>Питомцы</h2>
            </div>
            <button onClick={() => setShowNewPet(!showNewPet)} style={{ display: "flex", alignItems: "center", gap: "6px", background: "none", border: "1px solid rgba(168,197,181,0.3)", padding: "7px 14px", cursor: "pointer", color: "#A8C5B5", fontFamily: "'Inter', sans-serif", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", transition: "all 0.2s", flexShrink: 0 }}>
              <Plus size={13} /> Добавить
            </button>
          </div>

          <AnimatePresence>
            {showNewPet && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} style={{ overflow: "hidden", marginBottom: "16px" }}>
                <div style={{ background: "rgba(168,197,181,0.05)", border: "1px solid rgba(168,197,181,0.15)", padding: "24px" }}>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#A8C5B5", marginBottom: "20px" }}>Новый питомец</p>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "14px", marginBottom: "14px" }}>
                    <div>
                      <label style={labelStyle}>Имя *</label>
                      <input style={inputStyle} value={newPet.name} onChange={(e) => setNewPet({ ...newPet, name: e.target.value })}
                        onFocus={(e) => (e.target.style.borderColor = "#A8C5B5")} onBlur={(e) => (e.target.style.borderColor = "rgba(168,197,181,0.2)")} />
                    </div>
                    <div>
                      <label style={labelStyle}>Порода</label>
                      <input style={inputStyle} value={newPet.breed} onChange={(e) => setNewPet({ ...newPet, breed: e.target.value })}
                        onFocus={(e) => (e.target.style.borderColor = "#A8C5B5")} onBlur={(e) => (e.target.style.borderColor = "rgba(168,197,181,0.2)")} />
                    </div>
                  </div>
                  <div style={{ marginBottom: "16px" }}>
                    <label style={labelStyle}>Заметки</label>
                    <textarea style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }} value={newPet.notes} onChange={(e) => setNewPet({ ...newPet, notes: e.target.value })}
                      onFocus={(e) => (e.target.style.borderColor = "#A8C5B5")} onBlur={(e) => (e.target.style.borderColor = "rgba(168,197,181,0.2)")} />
                  </div>
                  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    <button onClick={() => upsertPet.mutate({ clientId, name: newPet.name, breed: newPet.breed || undefined, notes: newPet.notes || undefined })}
                      disabled={!newPet.name || upsertPet.isPending} className="btn-mint" style={{ padding: "10px 24px", fontSize: "11px", opacity: !newPet.name ? 0.5 : 1 }}>
                      {upsertPet.isPending ? "Сохраняем..." : "Сохранить"}
                    </button>
                    <button onClick={() => setShowNewPet(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(245,240,232,0.3)", fontFamily: "'Inter', sans-serif", fontSize: "11px" }}>Отмена</button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {pets.length === 0 && !showNewPet ? (
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "rgba(245,240,232,0.3)", padding: "24px 0" }}>Питомцев нет</p>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "12px" }}>
              {pets.map((pet: any) => (
                <div key={pet.id} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", padding: "16px" }}>
                  {pet.photoUrl ? (
                    <img src={pet.photoUrl} alt={pet.name} style={{ width: "100%", height: "130px", objectFit: "cover", marginBottom: "12px" }} />
                  ) : (
                    <div style={{ width: "100%", height: "100px", background: "rgba(168,197,181,0.06)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "12px", cursor: "pointer", border: "1px dashed rgba(168,197,181,0.2)" }}
                      onClick={() => {
                        petPhotoIdRef.current = pet.id;
                        if (petPhotoRef.current) { petPhotoRef.current.value = ""; petPhotoRef.current.click(); }
                      }}>
                      <Upload size={18} color="rgba(168,197,181,0.5)" />
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(168,197,181,0.5)" }}>Добавить фото</span>
                    </div>
                  )}
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", fontWeight: 300, color: "#F5F0E8", marginBottom: "4px" }}>{pet.name}</p>
                  {pet.breed && <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "rgba(245,240,232,0.4)" }}>{pet.breed}</p>}
                  {pet.notes && <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "rgba(245,240,232,0.35)", marginTop: "8px", lineHeight: 1.5 }}>{pet.notes}</p>}
                  {pet.photoUrl && (
                    <button
                      onClick={() => { petPhotoIdRef.current = pet.id; if (petPhotoRef.current) { petPhotoRef.current.value = ""; petPhotoRef.current.click(); } }}
                      style={{ marginTop: "10px", background: "none", border: "1px solid rgba(168,197,181,0.2)", cursor: "pointer", color: "rgba(168,197,181,0.6)", fontFamily: "'Inter', sans-serif", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", padding: "6px 12px", width: "100%", transition: "all 0.2s" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#A8C5B5"; (e.currentTarget as HTMLElement).style.color = "#A8C5B5"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(168,197,181,0.2)"; (e.currentTarget as HTMLElement).style.color = "rgba(168,197,181,0.6)"; }}
                    >
                      Заменить фото
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </motion.section>

        {/* Visits section */}
        <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", flexWrap: "wrap", gap: "10px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Calendar size={16} color="#A8C5B5" />
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "24px", fontWeight: 300, color: "#F5F0E8" }}>Визиты</h2>
            </div>
            <button onClick={() => setShowNewVisit(!showNewVisit)} style={{ display: "flex", alignItems: "center", gap: "6px", background: "none", border: "1px solid rgba(168,197,181,0.3)", padding: "7px 14px", cursor: "pointer", color: "#A8C5B5", fontFamily: "'Inter', sans-serif", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", transition: "all 0.2s", flexShrink: 0 }}>
              <Plus size={13} /> Добавить визит
            </button>
          </div>

          <AnimatePresence>
            {showNewVisit && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} style={{ overflow: "hidden", marginBottom: "16px" }}>
                <div style={{ background: "rgba(168,197,181,0.05)", border: "1px solid rgba(168,197,181,0.15)", padding: "24px" }}>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#A8C5B5", marginBottom: "20px" }}>Новый визит</p>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "14px", marginBottom: "16px" }}>
                    <div>
                      <label style={labelStyle}>Питомец *</label>
                      <select style={{ ...inputStyle, cursor: "pointer" }} value={newVisit.petId} onChange={(e) => setNewVisit({ ...newVisit, petId: parseInt(e.target.value) })}
                        onFocus={(e) => (e.target.style.borderColor = "#A8C5B5")} onBlur={(e) => (e.target.style.borderColor = "rgba(168,197,181,0.2)")}>
                        <option value={0} style={{ background: "#1a1a1a" }}>Выберите питомца</option>
                        {pets.map((p: any) => <option key={p.id} value={p.id} style={{ background: "#1a1a1a" }}>{p.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>Дата и время *</label>
                      <input type="datetime-local" style={{ ...inputStyle, colorScheme: "dark" }} value={newVisit.visitDate} onChange={(e) => setNewVisit({ ...newVisit, visitDate: e.target.value })}
                        onFocus={(e) => (e.target.style.borderColor = "#A8C5B5")} onBlur={(e) => (e.target.style.borderColor = "rgba(168,197,181,0.2)")} />
                    </div>
                    <div>
                      <label style={labelStyle}>Услуга</label>
                      <input style={inputStyle} placeholder="Груминг, стрижка..." value={newVisit.serviceType} onChange={(e) => setNewVisit({ ...newVisit, serviceType: e.target.value })}
                        onFocus={(e) => (e.target.style.borderColor = "#A8C5B5")} onBlur={(e) => (e.target.style.borderColor = "rgba(168,197,181,0.2)")} />
                    </div>
                    <div>
                      <label style={labelStyle}>Косметика</label>
                      <input style={inputStyle} placeholder="Шампунь, маска..." value={newVisit.cosmeticsUsed} onChange={(e) => setNewVisit({ ...newVisit, cosmeticsUsed: e.target.value })}
                        onFocus={(e) => (e.target.style.borderColor = "#A8C5B5")} onBlur={(e) => (e.target.style.borderColor = "rgba(168,197,181,0.2)")} />
                    </div>
                  </div>
                  {[
                    { key: "masterNotes", label: "Заметки мастера" },
                    { key: "behaviorNotes", label: "Поведение питомца" },
                    { key: "homeCareTips", label: "Рекомендации по уходу дома" },
                    { key: "nextVisitSuggestion", label: "Следующий визит" },
                  ].map(({ key, label }) => (
                    <div key={key} style={{ marginBottom: "12px" }}>
                      <label style={labelStyle}>{label}</label>
                      <textarea style={{ ...inputStyle, minHeight: "72px", resize: "vertical" }} value={(newVisit as any)[key]} onChange={(e) => setNewVisit({ ...newVisit, [key]: e.target.value })}
                        onFocus={(e) => (e.target.style.borderColor = "#A8C5B5")} onBlur={(e) => (e.target.style.borderColor = "rgba(168,197,181,0.2)")} />
                    </div>
                  ))}
                  <div style={{ display: "flex", gap: "10px", marginTop: "8px", flexWrap: "wrap" }}>
                    <button onClick={() => createVisit.mutate({ clientId, ...newVisit, published: true })}
                      disabled={!newVisit.petId || !newVisit.visitDate || createVisit.isPending} className="btn-mint"
                      style={{ padding: "10px 24px", fontSize: "11px", opacity: (!newVisit.petId || !newVisit.visitDate) ? 0.5 : 1 }}>
                      {createVisit.isPending ? "Сохраняем..." : "Сохранить визит"}
                    </button>
                    <button onClick={() => setShowNewVisit(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(245,240,232,0.3)", fontFamily: "'Inter', sans-serif", fontSize: "11px" }}>Отмена</button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {visits.length === 0 && !showNewVisit ? (
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "rgba(245,240,232,0.3)", padding: "24px 0" }}>Визитов нет</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {visits.map((visit: any) => {
                const pet = pets.find((p: any) => p.id === visit.petId);
                const isOpen = selectedVisitId === visit.id;
                return (
                  <div key={visit.id} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", overflow: "hidden" }}>
                    <button
                      onClick={() => setSelectedVisitId(isOpen ? null : visit.id)}
                      style={{ width: "100%", display: "flex", alignItems: "center", gap: "12px", padding: "16px 20px", background: "none", border: "none", cursor: "pointer", textAlign: "left", transition: "background 0.2s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(168,197,181,0.04)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
                    >
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", fontWeight: 300, color: "#F5F0E8", marginBottom: "2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {new Date(visit.visitDate).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })}
                          {visit.serviceType && <span style={{ marginLeft: "10px", fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#A8C5B5" }}>{visit.serviceType}</span>}
                        </p>
                        {pet && <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "rgba(245,240,232,0.4)" }}>{pet.name}</p>}
                      </div>
                      {isOpen ? <ChevronUp size={14} color="rgba(245,240,232,0.3)" /> : <ChevronDown size={14} color="rgba(245,240,232,0.3)" />}
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} style={{ overflow: "hidden" }}>
                          <VisitEditor
                            visit={visit}
                            clientId={clientId}
                            onUpdate={(data) => updateVisit.mutate({ id: visit.id, ...data })}
                            isUpdating={updateVisit.isPending}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          )}
        </motion.section>
      </div>

      {/* Pet photo hidden input */}
      <input ref={petPhotoRef} type="file" accept="image/jpeg,image/png,image/webp" style={{ display: "none" }} onChange={handlePetPhotoChange} />
    </div>
  );
}
