import { useState, useEffect } from "react";
import { useLocation, useRoute } from "wouter";
import { motion } from "framer-motion";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { toast } from "sonner";
import { ArrowLeft, Upload, Eye, Clock, Save } from "lucide-react";

async function compressToWebP(file: File, maxSizeMB = 5): Promise<File> {
  if (file.size > maxSizeMB * 1024 * 1024) {
    throw new Error(`Файл слишком большой. Максимум ${maxSizeMB} МБ`);
  }
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const canvas = document.createElement("canvas");
      const maxDim = 1600;
      let { width, height } = img;
      if (width > maxDim || height > maxDim) {
        if (width > height) { height = Math.round((height * maxDim) / width); width = maxDim; }
        else { width = Math.round((width * maxDim) / height); height = maxDim; }
      }
      canvas.width = width;
      canvas.height = height;
      canvas.getContext("2d")!.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        (blob) => {
          if (!blob) return reject(new Error("Ошибка конвертации"));
          resolve(new File([blob], file.name.replace(/\.[^.]+$/, ".webp"), { type: "image/webp" }));
        },
        "image/webp",
        0.88
      );
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("Ошибка чтения файла")); };
    img.src = url;
  });
}

export default function EditVisit() {
  const [, params] = useRoute("/master/visit/:id");
  const [, navigate] = useLocation();
  const { user, isAuthenticated } = useAuth();
  const visitId = params?.id ? parseInt(params.id) : 0;

  const [masterNotes, setMasterNotes] = useState("");
  const [cosmeticsUsed, setCosmeticsUsed] = useState("");
  const [behaviorNotes, setBehaviorNotes] = useState("");
  const [homeCareTips, setHomeCareTips] = useState("");
  const [nextVisitSuggestion, setNextVisitSuggestion] = useState("");
  const [beforePhotoUrl, setBeforePhotoUrl] = useState("");
  const [beforePhotoKey, setBeforePhotoKey] = useState("");
  const [afterPhotoUrl, setAfterPhotoUrl] = useState("");
  const [afterPhotoKey, setAfterPhotoKey] = useState("");
  const [uploading, setUploading] = useState<"before" | "after" | null>(null);
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [isExpired, setIsExpired] = useState(false);

  const { data: currentVisit, isLoading } = trpc.visits.masterGet.useQuery(
    { id: visitId },
    { enabled: isAuthenticated && user?.role === "admin" && visitId > 0 }
  );

  useEffect(() => {
    if (currentVisit) {
      setMasterNotes(currentVisit.masterNotes || "");
      setCosmeticsUsed(currentVisit.cosmeticsUsed || "");
      setBehaviorNotes(currentVisit.behaviorNotes || "");
      setHomeCareTips(currentVisit.homeCareTips || "");
      setNextVisitSuggestion(currentVisit.nextVisitSuggestion || "");
      setBeforePhotoUrl(currentVisit.beforePhotoUrl || "");
      setBeforePhotoKey(currentVisit.beforePhotoKey || "");
      setAfterPhotoUrl(currentVisit.afterPhotoUrl || "");
      setAfterPhotoKey(currentVisit.afterPhotoKey || "");

      const created = new Date(currentVisit.createdAt).getTime();
      const deadline = created + 24 * 60 * 60 * 1000;
      const remaining = deadline - Date.now();
      if (remaining > 0) {
        const hours = Math.floor(remaining / (1000 * 60 * 60));
        const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
        setTimeLeft(`${hours}ч ${minutes}мин`);
        setIsExpired(false);
      } else {
        setTimeLeft("истёк");
        setIsExpired(true);
      }
    }
  }, [currentVisit]);

  const updateVisit = trpc.visits.masterUpdate.useMutation({
    onSuccess: () => {
      toast.success("Карточка визита обновлена");
      navigate("/master");
    },
    onError: (e) => toast.error(e.message),
  });

  const handlePhotoUpload = async (type: "before" | "after", file: File) => {
    setUploading(type);
    try {
      const webpFile = await compressToWebP(file);
      const formData = new FormData();
      formData.append("file", webpFile);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Ошибка загрузки");
      const data = await res.json() as { url: string; key: string };
      if (type === "before") { setBeforePhotoUrl(data.url); setBeforePhotoKey(data.key); }
      else { setAfterPhotoUrl(data.url); setAfterPhotoKey(data.key); }
      toast.success("Фото загружено (WebP)");
    } catch (e: any) {
      toast.error(e.message || "Ошибка загрузки фото");
    } finally {
      setUploading(null);
    }
  };

  const handleSave = (publish: boolean) => {
    updateVisit.mutate({
      id: visitId,
      masterNotes,
      cosmeticsUsed,
      behaviorNotes,
      homeCareTips,
      nextVisitSuggestion,
      beforePhotoUrl: beforePhotoUrl || undefined,
      beforePhotoKey: beforePhotoKey || undefined,
      afterPhotoUrl: afterPhotoUrl || undefined,
      afterPhotoKey: afterPhotoKey || undefined,
      published: publish,
    });
  };

  if (!isAuthenticated || user?.role !== "admin") {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-[#0E0E0E]/40 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>Доступ запрещён</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-6 h-6 border border-[#A8C5B5] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!currentVisit) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#0E0E0E]/40 text-sm mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>Визит не найден</p>
          <button onClick={() => navigate("/master")} className="text-xs tracking-[0.2em] uppercase text-[#A8C5B5] border-b border-[#A8C5B5] pb-0.5" style={{ fontFamily: "'Inter', sans-serif" }}>
            Вернуться
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-[#0E0E0E] px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate("/master")} className="text-white/40 hover:text-white transition-colors">
            <ArrowLeft size={18} />
          </button>
          <span className="text-white text-xs tracking-[0.3em] uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>
            Визит #{visitId}
          </span>
        </div>
        {timeLeft && (
          <div className={`flex items-center gap-2 text-xs ${isExpired ? "text-red-400" : "text-[#A8C5B5]"}`} style={{ fontFamily: "'Inter', sans-serif" }}>
            <Clock size={12} />
            {isExpired ? "Окно редактирования истекло" : `Осталось: ${timeLeft}`}
          </div>
        )}
      </header>

      <div className="max-w-2xl mx-auto px-6 py-12">
        {isExpired && (
          <div className="bg-red-50 border border-red-100 p-4 mb-8 text-center">
            <p className="text-red-400 text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>
              24-часовое окно редактирования истекло. Изменения недоступны.
            </p>
          </div>
        )}

        <div className="border-b border-[#E8F0EC] pb-6 mb-8">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#0E0E0E]/30 mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>Дата визита</p>
          <p className="text-[#0E0E0E] font-light" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "24px" }}>
            {new Date(currentVisit.visitDate).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
          </p>
          <p className="text-[#0E0E0E]/40 text-xs mt-1" style={{ fontFamily: "'Inter', sans-serif" }}>
            {currentVisit.published ? "✓ Опубликовано клиенту" : "Черновик — не виден клиенту"}
          </p>
        </div>

        {/* Photos */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {(["before", "after"] as const).map((type) => {
            const url = type === "before" ? beforePhotoUrl : afterPhotoUrl;
            const label = type === "before" ? "До" : "После";
            return (
              <div key={type}>
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#0E0E0E]/40 mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>{label}</p>
                <label className={`block cursor-pointer ${isExpired ? "opacity-50 pointer-events-none" : ""}`}>
                  <input type="file" accept="image/*" className="hidden" disabled={isExpired}
                    onChange={(e) => { const f = e.target.files?.[0]; if (f) handlePhotoUpload(type, f); }} />
                  {url ? (
                    <div className="relative group">
                      <img src={url} alt={label} className="w-full aspect-square object-cover" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <Upload size={20} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  ) : (
                    <div className="w-full aspect-square border-2 border-dashed border-[#E8F0EC] flex flex-col items-center justify-center gap-2 hover:border-[#A8C5B5] transition-colors">
                      {uploading === type ? (
                        <div className="w-5 h-5 border border-[#A8C5B5] border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Upload size={20} className="text-[#0E0E0E]/20" />
                          <span className="text-[10px] text-[#0E0E0E]/30" style={{ fontFamily: "'Inter', sans-serif" }}>Загрузить · WebP</span>
                        </>
                      )}
                    </div>
                  )}
                </label>
              </div>
            );
          })}
        </div>

        {/* Text fields */}
        {[
          { label: "Заметки мастера", value: masterNotes, setter: setMasterNotes, rows: 3 },
          { label: "Использованная косметика", value: cosmeticsUsed, setter: setCosmeticsUsed, rows: 2 },
          { label: "Поведение питомца", value: behaviorNotes, setter: setBehaviorNotes, rows: 2 },
          { label: "Рекомендации по уходу дома", value: homeCareTips, setter: setHomeCareTips, rows: 3 },
          { label: "Следующий визит", value: nextVisitSuggestion, setter: setNextVisitSuggestion, rows: 1 },
        ].map(({ label, value, setter, rows }) => (
          <div key={label} className="mb-6">
            <label className="block text-[10px] tracking-[0.2em] uppercase text-[#0E0E0E]/40 mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>{label}</label>
            <textarea
              value={value}
              onChange={(e) => setter(e.target.value)}
              rows={rows}
              disabled={isExpired}
              className="w-full border border-[#E8F0EC] p-3 text-sm text-[#0E0E0E] resize-none focus:outline-none focus:border-[#A8C5B5] transition-colors disabled:opacity-50 disabled:bg-[#F7FAF9]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            />
          </div>
        ))}

        {!isExpired && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3 pt-4 border-t border-[#E8F0EC]">
            <button
              onClick={() => handleSave(false)}
              disabled={updateVisit.isPending}
              className="flex items-center gap-2 border border-[#E8F0EC] px-6 py-3 text-xs tracking-[0.2em] uppercase text-[#0E0E0E]/60 hover:border-[#0E0E0E] hover:text-[#0E0E0E] transition-colors disabled:opacity-50"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <Save size={12} />
              Черновик
            </button>
            <button
              onClick={() => handleSave(true)}
              disabled={updateVisit.isPending}
              className="flex-1 flex items-center justify-center gap-2 bg-[#0E0E0E] text-white px-6 py-3 text-xs tracking-[0.2em] uppercase hover:bg-[#A8C5B5] hover:text-[#0E0E0E] transition-colors disabled:opacity-50"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {updateVisit.isPending ? (
                <div className="w-4 h-4 border border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <><Eye size={12} />Опубликовать клиенту</>
              )}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
