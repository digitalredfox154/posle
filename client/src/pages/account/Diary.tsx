import { useState } from "react";
import AccountLayout from "@/components/AccountLayout";
import { trpc } from "@/lib/trpc";
import { useClientAuth } from "@/hooks/useClientAuth";
import { Link, useParams } from "wouter";
import { PawPrint, ChevronLeft, Calendar, Scissors, Heart, BookOpen } from "lucide-react";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";

function VisitCard({ visit }: { visit: any }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white border border-[#E8F0EC] overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-5 flex items-center gap-4 text-left hover:bg-[#F7F5F2] transition-colors"
      >
        <div className="w-10 h-10 bg-[#F7F5F2] flex items-center justify-center flex-shrink-0">
          <Scissors size={14} className="text-[#A8C5B5]" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[#0E0E0E] font-light" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px" }}>
            {visit.serviceType || "Груминг"}
          </p>
          <p className="text-[#0E0E0E]/40 text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>
            {new Date(visit.visitDate).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>
        <div className={`text-[#0E0E0E]/30 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="border-t border-[#E8F0EC] p-5 flex flex-col gap-6">
          {/* Before/After */}
          {visit.beforePhotoUrl && visit.afterPhotoUrl && (
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#0E0E0E]/30 mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
                До и после
              </p>
              <BeforeAfterSlider
                beforeSrc={visit.beforePhotoUrl}
                afterSrc={visit.afterPhotoUrl}
                aspectRatio="16/9"
              />
            </div>
          )}

          {/* Notes grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {visit.masterNotes && (
              <div className="bg-[#F7F5F2] p-4">
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#A8C5B5] mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Заметки мастера
                </p>
                <p className="text-[#0E0E0E]/70 text-sm leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {visit.masterNotes}
                </p>
              </div>
            )}
            {visit.cosmeticsUsed && (
              <div className="bg-[#F7F5F2] p-4">
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#A8C5B5] mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Косметика
                </p>
                <p className="text-[#0E0E0E]/70 text-sm leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {visit.cosmeticsUsed}
                </p>
              </div>
            )}
            {visit.behaviorNotes && (
              <div className="bg-[#F7F5F2] p-4">
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#A8C5B5] mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Поведение
                </p>
                <p className="text-[#0E0E0E]/70 text-sm leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {visit.behaviorNotes}
                </p>
              </div>
            )}
            {visit.homeCareTips && (
              <div className="bg-[#F7F5F2] p-4">
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#A8C5B5] mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Уход дома
                </p>
                <p className="text-[#0E0E0E]/70 text-sm leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {visit.homeCareTips}
                </p>
              </div>
            )}
          </div>

          {/* Next visit suggestion */}
          {visit.nextVisitSuggestion && (
            <div className="border border-[#A8C5B5]/30 bg-[#A8C5B5]/5 p-4 flex items-start gap-3">
              <Calendar size={14} className="text-[#A8C5B5] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#A8C5B5] mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Следующий визит
                </p>
                <p className="text-[#0E0E0E]/70 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {visit.nextVisitSuggestion}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function AccountDiary() {
  useClientAuth(true);
  const params = useParams<{ petId?: string }>();
  const { data: pets } = trpc.pets.list.useQuery();
  const [selectedPetId, setSelectedPetId] = useState<number | null>(
    params.petId ? parseInt(params.petId) : null
  );

  const activePetId = selectedPetId || (pets?.[0]?.id ?? null);
  const { data: visits, isLoading } = trpc.visits.listForPet.useQuery(
    { petId: activePetId! },
    { enabled: !!activePetId }
  );

  const activePet = pets?.find((p) => p.id === activePetId);

  return (
    <AccountLayout>
      <div className="max-w-2xl">
        <div className="mb-10">
          <p className="text-[#A8C5B5] text-[10px] tracking-[0.3em] uppercase mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>Кабинет</p>
          <h1 className="font-light text-[#0E0E0E]" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 4vw, 40px)" }}>
            Дневник
          </h1>
        </div>

        {/* Pet selector */}
        {pets && pets.length > 0 && (
          <div className="flex gap-2 mb-8 flex-wrap">
            {pets.map((pet) => (
              <button
                key={pet.id}
                onClick={() => setSelectedPetId(pet.id)}
                className={`flex items-center gap-2 px-4 py-2 text-xs tracking-wider uppercase transition-all duration-200 ${
                  activePetId === pet.id
                    ? "bg-[#0E0E0E] text-white"
                    : "bg-white border border-[#E8F0EC] text-[#0E0E0E]/60 hover:border-[#A8C5B5]"
                }`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <PawPrint size={12} />
                {pet.name}
              </button>
            ))}
          </div>
        )}

        {/* Timeline */}
        {!activePetId ? (
          <div className="bg-white border border-dashed border-[#E8F0EC] p-12 text-center">
            <BookOpen size={28} className="text-[#A8C5B5] mx-auto mb-4" />
            <p className="text-[#0E0E0E]/50 text-sm mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
              Сначала добавьте питомца
            </p>
            <Link href="/account/pets" className="text-xs tracking-[0.2em] uppercase text-[#A8C5B5] hover:text-[#0E0E0E] border-b border-[#A8C5B5] pb-0.5 transition-colors" style={{ fontFamily: "'Inter', sans-serif" }}>
              Добавить питомца
            </Link>
          </div>
        ) : isLoading ? (
          <div className="flex flex-col gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white border border-[#E8F0EC] p-6 animate-pulse h-20" />
            ))}
          </div>
        ) : visits && visits.length > 0 ? (
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-5 top-5 bottom-5 w-px bg-[#E8F0EC]" />
            <div className="flex flex-col gap-4 pl-0">
              {visits.map((visit) => (
                <div key={visit.id} className="relative pl-12">
                  {/* Dot */}
                  <div className="absolute left-[18px] top-5 w-2 h-2 rounded-full bg-[#A8C5B5] border-2 border-white" />
                  <VisitCard visit={visit} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white border border-dashed border-[#E8F0EC] p-12 text-center">
            <Calendar size={28} className="text-[#A8C5B5] mx-auto mb-4" />
            <p className="text-[#0E0E0E]/50 text-sm mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
              Визитов пока нет
            </p>
            <p className="text-[#0E0E0E]/30 text-xs mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
              После первого визита здесь появится карточка с фото и заметками мастера
            </p>
            <Link href="/booking" className="text-xs tracking-[0.2em] uppercase text-[#A8C5B5] hover:text-[#0E0E0E] border-b border-[#A8C5B5] pb-0.5 transition-colors" style={{ fontFamily: "'Inter', sans-serif" }}>
              Записаться
            </Link>
          </div>
        )}
      </div>
    </AccountLayout>
  );
}
