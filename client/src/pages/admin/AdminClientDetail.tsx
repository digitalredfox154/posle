import { useState, useRef } from "react";
import { Link, useParams } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { trpc } from "@/lib/trpc";
import { useClientAuth } from "@/hooks/useClientAuth";
import { ArrowLeft, Plus, Upload, Save, X, PawPrint, Calendar, Edit2, Check } from "lucide-react";
import { toast } from "sonner";

const inputStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(168,197,181,0.2)",
  padding: "10px 14px",
  color: "#F5F0E8",
  fontFamily: "'Inter', sans-serif",
  fontSize: "13px",
  outline: "none",
  width: "100%",
  boxSizing: "border-box",
  transition: "border-color 0.2s",
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

function VisitEditor({ visit, onUpdate, onPhotoUpload, isUpdating }: {
  visit: any;
  onUpdate: (data: any) => void;
  onPhotoUpload: (type: "before" | "after") => void;
  isUpdating: boolean;
}) {
  const [fields, setFields] = useState({
    masterNotes: visit.masterNotes || "",
    cosmeticsUsed: visit.cosmeticsUsed || "",
    behaviorNotes: visit.behaviorNotes || "",
    homeCareTips: visit.homeCareTips || "",
    nextVisitSuggestion: visit.nextVisitSuggestion || "",
  });

  return (
    <div style={{ padding: "24px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>
        {(["before", "after"] as const).map((type) => {
          const url = type === "before" ? visit.beforePhotoUrl : visit.afterPhotoUrl;
          return (
            <div key={type}>
              <label style={labelStyle}>{type === "before" ? "Фото до" : "Фото после"}</label>
              {url ? (
                <div style={{ position: "relative" }}>
                  <img src={url} alt={type} style={{ width: "100%", height: "180px", objectFit: "cover" }} />
                  <button
                    onClick={() => onPhotoUpload(type)}
                    style={{ position: "absolute", bottom: "8px", right: "8px", background: "rgba(14,14,14,0.8)", border: "1px solid rgba(168,197,181,0.3)", padding: "6px 12px", cursor: "pointer", color: "#A8C5B5", fontFamily: "'Inter', sans-serif", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase" }}
                  >
                    Заменить
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => onPhotoUpload(type)}
                  style={{ width: "100%", height: "120px", background: "rgba(168,197,181,0.04)", border: "1px dashed rgba(168,197,181,0.2)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px", cursor: "pointer", transition: "all 0.2s" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(168,197,181,0.08)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(168,197,181,0.04)"; }}
                >
                  <Upload size={16} color="rgba(168,197,181,0.5)" />
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(168,197,181,0.5)" }}>Загрузить</span>
                </button>
              )}
            </div>
          );
        })}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
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
  const [uploadingFor, setUploadingFor] = useState<{ visitId: number; type: "before" | "after" } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data, isLoading, refetch } = trpc.admin.getClient.useQuery({ clientId }, { enabled: !!clientId });

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

  const uploadPhoto = trpc.admin.uploadPhoto.useMutation({
    onSuccess: (result: any) => {
      if (uploadingFor) {
        const field = uploadingFor.type === "before" ? "beforePhotoUrl" : "afterPhotoUrl";
        const keyField = uploadingFor.type === "before" ? "beforePhotoKey" : "afterPhotoKey";
        updateVisit.mutate({ id: uploadingFor.visitId, [field]: result.url, [keyField]: result.key });
      }
      setUploadingFor(null);
    },
    onError: (e: any) => { toast.error(e.message); setUploadingFor(null); },
  });

  const [newVisit, setNewVisit] = useState({
    petId: 0,
    visitDate: new Date().toISOString().slice(0, 16),
    serviceType: "",
    masterNotes: "",
    cosmeticsUsed: "",
    behaviorNotes: "",
    homeCareTips: "",
    nextVisitSuggestion: "",
  });

  const [newPet, setNewPet] = useState({ name: "", breed: "", notes: "" });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !uploadingFor) return;
    const reader = new FileReader();
    reader.onload = () => {
      uploadPhoto.mutate({ base64: reader.result as string, mimeType: file.type as any, purpose: uploadingFor.type === "before" ? "before_photo" : "after_photo", clientId });
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

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

  const { client, pets, visits } = data;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#0E0E0E" }}>
      <header style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "0 32px", height: "64px", display: "flex", alignItems: "center", gap: "16px" }}>
        <Link href="/admin" style={{ display: "flex", alignItems: "center", gap: "8px", color: "rgba(245,240,232,0.4)", textDecoration: "none", fontFamily: "'Inter', sans-serif", fontSize: "12px", letterSpacing: "0.1em" }}>
          <ArrowLeft size={14} />
          Клиенты
        </Link>
        <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
        <Link href="/" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", fontWeight: 300, letterSpacing: "0.2em", color: "#F5F0E8", textDecoration: "none", marginLeft: "auto" }}>
          ПОСЛЕ
        </Link>
      </header>

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "48px 32px", width: "100%" }}>
        {/* Client header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} style={{ marginBottom: "48px" }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", letterSpacing: "0.35em", textTransform: "uppercase", color: "#A8C5B5", marginBottom: "12px" }}>Клиент #{client.id}</p>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
            {editingName ? (
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <input
                  autoFocus
                  value={nameValue}
                  onChange={(e) => setNameValue(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") updateClient.mutate({ clientId, name: nameValue }); if (e.key === "Escape") setEditingName(false); }}
                  style={{ ...inputStyle, fontSize: "32px", fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, padding: "4px 10px", width: "280px" }}
                />
                <button onClick={() => updateClient.mutate({ clientId, name: nameValue })} style={{ background: "none", border: "none", cursor: "pointer", color: "#A8C5B5" }}><Check size={18} /></button>
                <button onClick={() => setEditingName(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(245,240,232,0.3)" }}><X size={18} /></button>
              </div>
            ) : (
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 300, color: "#F5F0E8", lineHeight: 1.1 }}>
                  {client.name || "Без имени"}
                </h1>
                <button onClick={() => { setNameValue(client.name || ""); setEditingName(true); }} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(245,240,232,0.25)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#A8C5B5")} onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,240,232,0.25)")}>
                  <Edit2 size={16} />
                </button>
              </div>
            )}
          </div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "rgba(245,240,232,0.4)", marginTop: "8px" }}>
            {client.email || client.phone || "—"}
          </p>
        </motion.div>

        {/* Pets */}
        <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }} style={{ marginBottom: "48px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <PawPrint size={16} color="#A8C5B5" />
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "24px", fontWeight: 300, color: "#F5F0E8" }}>Питомцы</h2>
            </div>
            <button onClick={() => setShowNewPet(!showNewPet)} style={{ display: "flex", alignItems: "center", gap: "6px", background: "none", border: "1px solid rgba(168,197,181,0.3)", padding: "7px 14px", cursor: "pointer", color: "#A8C5B5", fontFamily: "'Inter', sans-serif", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase" }}>
              <Plus size={13} /> Добавить
            </button>
          </div>
          <AnimatePresence>
            {showNewPet && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} style={{ overflow: "hidden", marginBottom: "16px" }}>
                <div style={{ background: "rgba(168,197,181,0.05)", border: "1px solid rgba(168,197,181,0.15)", padding: "24px" }}>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#A8C5B5", marginBottom: "20px" }}>Новый питомец</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
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
                  <div style={{ display: "flex", gap: "10px" }}>
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
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "12px" }}>
              {pets.map((pet: any) => (
                <div key={pet.id} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", padding: "20px" }}>
                  {pet.photoUrl ? (
                    <img src={pet.photoUrl} alt={pet.name} style={{ width: "100%", height: "140px", objectFit: "cover", marginBottom: "14px" }} />
                  ) : (
                    <div style={{ width: "100%", height: "140px", background: "rgba(168,197,181,0.06)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "14px", cursor: "pointer", border: "1px dashed rgba(168,197,181,0.2)" }}
                      onClick={() => {
                        const input = document.createElement("input");
                        input.type = "file"; input.accept = "image/*";
                        input.onchange = (e: any) => {
                          const file = e.target.files?.[0]; if (!file) return;
                          const reader = new FileReader();
                          reader.onload = () => {
                            uploadPhoto.mutate({ base64: reader.result as string, mimeType: file.type as any, purpose: "pet_photo", clientId, petId: pet.id } as any);
                          };
                          reader.readAsDataURL(file);
                        };
                        input.click();
                      }}>
                      <Upload size={18} color="rgba(168,197,181,0.5)" />
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(168,197,181,0.5)" }}>Добавить фото</span>
                    </div>
                  )}
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", fontWeight: 300, color: "#F5F0E8", marginBottom: "4px" }}>{pet.name}</p>
                  {pet.breed && <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "rgba(245,240,232,0.4)" }}>{pet.breed}</p>}
                  {pet.notes && <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "rgba(245,240,232,0.35)", marginTop: "8px", lineHeight: 1.5 }}>{pet.notes}</p>}
                </div>
              ))}
            </div>
          )}
        </motion.section>

        {/* Visits */}
        <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Calendar size={16} color="#A8C5B5" />
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "24px", fontWeight: 300, color: "#F5F0E8" }}>Визиты</h2>
            </div>
            <button onClick={() => setShowNewVisit(!showNewVisit)} style={{ display: "flex", alignItems: "center", gap: "6px", background: "none", border: "1px solid rgba(168,197,181,0.3)", padding: "7px 14px", cursor: "pointer", color: "#A8C5B5", fontFamily: "'Inter', sans-serif", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase" }}>
              <Plus size={13} /> Добавить визит
            </button>
          </div>
          <AnimatePresence>
            {showNewVisit && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} style={{ overflow: "hidden", marginBottom: "16px" }}>
                <div style={{ background: "rgba(168,197,181,0.05)", border: "1px solid rgba(168,197,181,0.15)", padding: "24px" }}>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#A8C5B5", marginBottom: "20px" }}>Новый визит</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
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
                  <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
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
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {visits.map((visit: any) => {
                const pet = pets.find((p: any) => p.id === visit.petId);
                const isOpen = selectedVisitId === visit.id;
                return (
                  <div key={visit.id} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", overflow: "hidden" }}>
                    <button onClick={() => setSelectedVisitId(isOpen ? null : visit.id)}
                      style={{ width: "100%", display: "flex", alignItems: "center", gap: "16px", padding: "18px 24px", background: "none", border: "none", cursor: "pointer", textAlign: "left", transition: "background 0.2s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(168,197,181,0.04)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "none")}>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", fontWeight: 300, color: "#F5F0E8", marginBottom: "4px" }}>
                          {new Date(visit.visitDate).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })}
                          {visit.serviceType && <span style={{ marginLeft: "12px", fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#A8C5B5" }}>{visit.serviceType}</span>}
                        </p>
                        {pet && <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "rgba(245,240,232,0.4)" }}>Питомец: {pet.name}</p>}
                      </div>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "rgba(245,240,232,0.3)", letterSpacing: "0.1em" }}>
                        {isOpen ? "Свернуть" : "Подробнее"}
                      </span>
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} style={{ overflow: "hidden" }}>
                          <VisitEditor
                            visit={visit}
                            onUpdate={(data) => updateVisit.mutate({ id: visit.id, ...data })}
                            onPhotoUpload={(type) => { setUploadingFor({ visitId: visit.id, type }); fileInputRef.current?.click(); }}
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
      <input ref={fileInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleFileChange} />
    </div>
  );
}
