import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useClientAuth } from "@/hooks/useClientAuth";
import { Link, useLocation } from "wouter";
import { toast } from "sonner";
import { Upload, X, Check } from "lucide-react";

function MasterLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const logout = trpc.posleClient.logout.useMutation({ onSuccess: () => { window.location.href = "/"; } });
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5F0E8" }}>
      <header className="bg-[#0E0E0E] h-16 flex items-center px-6 gap-6">
        <Link href="/" className="text-white font-light tracking-[0.15em] mr-auto" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px" }}>ПОСЛЕ</Link>
        <span className="text-[#A8C5B5] text-[10px] tracking-[0.2em] uppercase hidden sm:block" style={{ fontFamily: "'Inter', sans-serif" }}>Мастер</span>
        <Link href="/master" className={`text-xs tracking-widest uppercase transition-colors ${location === "/master" ? "text-white" : "text-white/40 hover:text-white"}`} style={{ fontFamily: "'Inter', sans-serif" }}>Визиты</Link>
        <Link href="/master/new-visit" className={`text-xs tracking-widest uppercase transition-colors ${location === "/master/new-visit" ? "text-white" : "text-white/40 hover:text-white"}`} style={{ fontFamily: "'Inter', sans-serif" }}>Новый визит</Link>
        <button onClick={() => logout.mutate()} className="text-white/30 hover:text-white transition-colors text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>Выйти</button>
      </header>
      <main className="container py-10 max-w-2xl">{children}</main>
    </div>
  );
}

export default function NewVisit() {
  useClientAuth(true);
  const [, setLocation] = useLocation();
  const [done, setDone] = useState(false);

  const [form, setForm] = useState({
    clientPhone: "",
    petId: "",
    visitDate: new Date().toISOString().slice(0, 16),
    serviceType: "",
    masterNotes: "",
    cosmeticsUsed: "",
    behaviorNotes: "",
    homeCareTips: "",
    nextVisitSuggestion: "",
    published: false,
  });

  const [beforeFile, setBeforeFile] = useState<File | null>(null);
  const [afterFile, setAfterFile] = useState<File | null>(null);
  const [beforePreview, setBeforePreview] = useState("");
  const [afterPreview, setAfterPreview] = useState("");
  const [uploading, setUploading] = useState(false);

  const utils = trpc.useUtils();
  const { data: allPets } = trpc.pets.listAll.useQuery();
  type PetItem = NonNullable<typeof allPets>[number];

  const createVisit = trpc.visits.masterCreate.useMutation({
    onSuccess: () => {
      setDone(true);
      utils.visits.masterList.invalidate();
    },
    onError: (e) => toast.error(e.message),
  });

  const handleFileChange = (type: "before" | "after", e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { toast.error("Файл слишком большой. Максимум 5MB"); return; }
    const url = URL.createObjectURL(file);
    if (type === "before") { setBeforeFile(file); setBeforePreview(url); }
    else { setAfterFile(file); setAfterPreview(url); }
  };

  const uploadPhoto = async (file: File): Promise<{ url: string; key: string }> => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    if (!res.ok) throw new Error("Ошибка загрузки фото");
    return res.json();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.petId) { toast.error("Выберите питомца"); return; }

    setUploading(true);
    try {
      let beforePhotoUrl = "";
      let beforePhotoKey = "";
      let afterPhotoUrl = "";
      let afterPhotoKey = "";

      if (beforeFile) {
        const r = await uploadPhoto(beforeFile);
        beforePhotoUrl = r.url;
        beforePhotoKey = r.key;
      }
      if (afterFile) {
        const r = await uploadPhoto(afterFile);
        afterPhotoUrl = r.url;
        afterPhotoKey = r.key;
      }

      createVisit.mutate({
        petId: parseInt(form.petId),
        clientId: allPets?.find((p: PetItem) => p.id === parseInt(form.petId))?.clientId || 0,
        visitDate: form.visitDate,
        serviceType: form.serviceType || undefined,
        beforePhotoUrl: beforePhotoUrl || undefined,
        beforePhotoKey: beforePhotoKey || undefined,
        afterPhotoUrl: afterPhotoUrl || undefined,
        afterPhotoKey: afterPhotoKey || undefined,
        masterNotes: form.masterNotes || undefined,
        cosmeticsUsed: form.cosmeticsUsed || undefined,
        behaviorNotes: form.behaviorNotes || undefined,
        homeCareTips: form.homeCareTips || undefined,
        nextVisitSuggestion: form.nextVisitSuggestion || undefined,
        published: form.published,
      });
    } catch (err: any) {
      toast.error(err.message || "Ошибка загрузки");
    } finally {
      setUploading(false);
    }
  };

  if (done) {
    return (
      <MasterLayout>
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-full bg-[#A8C5B5]/20 flex items-center justify-center mx-auto mb-6">
            <Check size={24} className="text-[#A8C5B5]" />
          </div>
          <h2 className="font-light text-[#0E0E0E] mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "32px" }}>Визит сохранён</h2>
          <p className="text-[#0E0E0E]/50 text-sm mb-8" style={{ fontFamily: "'Inter', sans-serif" }}>
            {form.published ? "Карточка опубликована в дневник клиента" : "Карточка сохранена как черновик"}
          </p>
          <div className="flex gap-4 justify-center">
            <button onClick={() => { setDone(false); setForm({ ...form, petId: "", masterNotes: "", cosmeticsUsed: "", behaviorNotes: "", homeCareTips: "", nextVisitSuggestion: "" }); setBeforeFile(null); setAfterFile(null); setBeforePreview(""); setAfterPreview(""); }} className="text-xs tracking-[0.2em] uppercase bg-[#0E0E0E] text-white px-6 py-3 hover:bg-[#1a1a1a] transition-colors" style={{ fontFamily: "'Inter', sans-serif" }}>
              Новый визит
            </button>
            <Link href="/master" className="text-xs tracking-[0.2em] uppercase border border-[#E8F0EC] text-[#0E0E0E]/60 px-6 py-3 hover:border-[#0E0E0E] transition-colors" style={{ fontFamily: "'Inter', sans-serif" }}>
              К списку
            </Link>
          </div>
        </div>
      </MasterLayout>
    );
  }

  return (
    <MasterLayout>
      <div className="mb-8">
        <p className="text-[#A8C5B5] text-[10px] tracking-[0.3em] uppercase mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>Мастер</p>
        <h1 className="font-light text-[#0E0E0E]" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 4vw, 40px)" }}>Новый визит</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Pet */}
        <div>
          <label className="block text-[10px] tracking-[0.2em] uppercase text-[#0E0E0E]/40 mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>Питомец *</label>
          <select
            value={form.petId}
            onChange={(e) => setForm({ ...form, petId: e.target.value })}
            className="w-full border border-[#E8F0EC] bg-white px-4 py-3 text-[#0E0E0E] text-sm focus:outline-none focus:border-[#A8C5B5] transition-colors"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <option value="">Выберите питомца</option>
            {allPets?.map((pet: PetItem) => (
              <option key={pet.id} value={pet.id}>{pet.name} ({pet.breed || pet.species})</option>
            ))}
          </select>
        </div>

        {/* Date & Service */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] tracking-[0.2em] uppercase text-[#0E0E0E]/40 mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>Дата и время</label>
            <input
              type="datetime-local"
              value={form.visitDate}
              onChange={(e) => setForm({ ...form, visitDate: e.target.value })}
              className="w-full border border-[#E8F0EC] bg-white px-4 py-3 text-[#0E0E0E] text-sm focus:outline-none focus:border-[#A8C5B5] transition-colors"
              style={{ fontFamily: "'Inter', sans-serif" }}
            />
          </div>
          <div>
            <label className="block text-[10px] tracking-[0.2em] uppercase text-[#0E0E0E]/40 mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>Услуга</label>
            <input
              value={form.serviceType}
              onChange={(e) => setForm({ ...form, serviceType: e.target.value })}
              className="w-full border border-[#E8F0EC] bg-white px-4 py-3 text-[#0E0E0E] text-sm focus:outline-none focus:border-[#A8C5B5] transition-colors"
              placeholder="Полный груминг"
              style={{ fontFamily: "'Inter', sans-serif" }}
            />
          </div>
        </div>

        {/* Photos */}
        <div className="grid grid-cols-2 gap-4">
          {(["before", "after"] as const).map((type) => {
            const preview = type === "before" ? beforePreview : afterPreview;
            const label = type === "before" ? "Фото ДО" : "Фото ПОСЛЕ";
            return (
              <div key={type}>
                <label className="block text-[10px] tracking-[0.2em] uppercase text-[#0E0E0E]/40 mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>{label}</label>
                <label className="block cursor-pointer">
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange(type, e)} />
                  {preview ? (
                    <div className="relative">
                      <img src={preview} alt={label} className="w-full h-36 object-cover" />
                      <button
                        type="button"
                        onClick={(e) => { e.preventDefault(); if (type === "before") { setBeforeFile(null); setBeforePreview(""); } else { setAfterFile(null); setAfterPreview(""); } }}
                        className="absolute top-2 right-2 w-6 h-6 bg-[#0E0E0E]/60 text-white flex items-center justify-center hover:bg-[#0E0E0E]"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ) : (
                    <div className="border border-dashed border-[#E8F0EC] bg-[#F7FAF9] h-36 flex flex-col items-center justify-center gap-2 hover:border-[#A8C5B5] transition-colors">
                      <Upload size={18} className="text-[#A8C5B5]" />
                      <span className="text-xs text-[#0E0E0E]/30" style={{ fontFamily: "'Inter', sans-serif" }}>Загрузить</span>
                    </div>
                  )}
                </label>
              </div>
            );
          })}
        </div>

        {/* Notes */}
        {[
          { key: "masterNotes", label: "Заметки мастера" },
          { key: "cosmeticsUsed", label: "Косметика" },
          { key: "behaviorNotes", label: "Поведение" },
          { key: "homeCareTips", label: "Уход дома" },
          { key: "nextVisitSuggestion", label: "Следующий визит" },
        ].map(({ key, label }) => (
          <div key={key}>
            <label className="block text-[10px] tracking-[0.2em] uppercase text-[#0E0E0E]/40 mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>{label}</label>
            <textarea
              value={(form as any)[key]}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              className="w-full border border-[#E8F0EC] bg-white px-4 py-3 text-[#0E0E0E] text-sm focus:outline-none focus:border-[#A8C5B5] transition-colors resize-none"
              rows={2}
              style={{ fontFamily: "'Inter', sans-serif" }}
            />
          </div>
        ))}

        {/* Publish toggle */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setForm({ ...form, published: !form.published })}
            className={`w-10 h-6 rounded-full transition-colors relative ${form.published ? "bg-[#A8C5B5]" : "bg-[#E8F0EC]"}`}
          >
            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${form.published ? "translate-x-5" : "translate-x-1"}`} />
          </button>
          <span className="text-sm text-[#0E0E0E]/60" style={{ fontFamily: "'Inter', sans-serif" }}>
            {form.published ? "Опубликовать в дневник клиента" : "Сохранить как черновик"}
          </span>
        </div>

        <button
          type="submit"
          disabled={createVisit.isPending || uploading}
          className="w-full bg-[#0E0E0E] text-white text-xs tracking-[0.2em] uppercase py-4 hover:bg-[#1a1a1a] transition-colors disabled:opacity-50"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {uploading ? "Загружаем фото..." : createVisit.isPending ? "Сохраняем..." : "Сохранить визит"}
        </button>
      </form>
    </MasterLayout>
  );
}
