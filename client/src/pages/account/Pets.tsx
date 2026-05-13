import { useState } from "react";
import AccountLayout from "@/components/AccountLayout";
import { trpc } from "@/lib/trpc";
import { useClientAuth } from "@/hooks/useClientAuth";
import { Link } from "wouter";
import { PawPrint, Plus, X, ChevronRight } from "lucide-react";
import { toast } from "sonner";

type PetForm = {
  name: string;
  species: "dog" | "cat" | "other";
  breed: string;
  birthYear: string;
  notes: string;
  allergies: string;
};

const emptyForm: PetForm = { name: "", species: "dog", breed: "", birthYear: "", notes: "", allergies: "" };

export default function AccountPets() {
  useClientAuth(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<PetForm>(emptyForm);

  const utils = trpc.useUtils();
  const { data: pets, isLoading } = trpc.pets.list.useQuery();

  const createPet = trpc.pets.create.useMutation({
    onSuccess: () => {
      utils.pets.list.invalidate();
      setShowForm(false);
      setForm(emptyForm);
      toast.success("Питомец добавлен");
    },
    onError: (e) => toast.error(e.message),
  });

  const deletePet = trpc.pets.delete.useMutation({
    onSuccess: () => {
      utils.pets.list.invalidate();
      toast.success("Питомец удалён");
    },
    onError: (e) => toast.error(e.message),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) { toast.error("Введите имя питомца"); return; }
    createPet.mutate({
      name: form.name.trim(),
      species: form.species,
      breed: form.breed || undefined,
      birthYear: form.birthYear ? parseInt(form.birthYear) : undefined,
      notes: form.notes || undefined,
      allergies: form.allergies || undefined,
    });
  };

  return (
    <AccountLayout>
      <div className="max-w-2xl">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-[#A8C5B5] text-[10px] tracking-[0.3em] uppercase mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>Кабинет</p>
            <h1 className="font-light text-[#0E0E0E]" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 4vw, 40px)" }}>
              Мои питомцы
            </h1>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase bg-[#0E0E0E] text-white px-5 py-3 hover:bg-[#1a1a1a] transition-colors"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <Plus size={14} />
            Добавить
          </button>
        </div>

        {/* Add form */}
        {showForm && (
          <div className="bg-white border border-[#E8F0EC] p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <p className="text-[#0E0E0E] font-light" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px" }}>Новый питомец</p>
              <button onClick={() => setShowForm(false)} className="text-[#0E0E0E]/30 hover:text-[#0E0E0E] transition-colors">
                <X size={16} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-[10px] tracking-[0.2em] uppercase text-[#0E0E0E]/40 mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>Имя *</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-[#E8F0EC] bg-[#F7F5F2] px-4 py-3 text-[#0E0E0E] text-sm focus:outline-none focus:border-[#A8C5B5] transition-colors"
                  placeholder="Как зовут питомца?"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                />
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.2em] uppercase text-[#0E0E0E]/40 mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>Вид</label>
                <select
                  value={form.species}
                  onChange={(e) => setForm({ ...form, species: e.target.value as any })}
                  className="w-full border border-[#E8F0EC] bg-[#F7F5F2] px-4 py-3 text-[#0E0E0E] text-sm focus:outline-none focus:border-[#A8C5B5] transition-colors"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <option value="dog">Собака</option>
                  <option value="cat">Кошка</option>
                  <option value="other">Другое</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.2em] uppercase text-[#0E0E0E]/40 mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>Порода</label>
                <input
                  value={form.breed}
                  onChange={(e) => setForm({ ...form, breed: e.target.value })}
                  className="w-full border border-[#E8F0EC] bg-[#F7F5F2] px-4 py-3 text-[#0E0E0E] text-sm focus:outline-none focus:border-[#A8C5B5] transition-colors"
                  placeholder="Необязательно"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                />
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.2em] uppercase text-[#0E0E0E]/40 mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>Год рождения</label>
                <input
                  type="number"
                  value={form.birthYear}
                  onChange={(e) => setForm({ ...form, birthYear: e.target.value })}
                  className="w-full border border-[#E8F0EC] bg-[#F7F5F2] px-4 py-3 text-[#0E0E0E] text-sm focus:outline-none focus:border-[#A8C5B5] transition-colors"
                  placeholder="2020"
                  min="2000"
                  max="2030"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                />
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.2em] uppercase text-[#0E0E0E]/40 mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>Аллергии</label>
                <input
                  value={form.allergies}
                  onChange={(e) => setForm({ ...form, allergies: e.target.value })}
                  className="w-full border border-[#E8F0EC] bg-[#F7F5F2] px-4 py-3 text-[#0E0E0E] text-sm focus:outline-none focus:border-[#A8C5B5] transition-colors"
                  placeholder="Если есть"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-[10px] tracking-[0.2em] uppercase text-[#0E0E0E]/40 mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>Заметки</label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="w-full border border-[#E8F0EC] bg-[#F7F5F2] px-4 py-3 text-[#0E0E0E] text-sm focus:outline-none focus:border-[#A8C5B5] transition-colors resize-none"
                  placeholder="Особенности характера, поведение..."
                  rows={3}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                />
              </div>
              <div className="sm:col-span-2 flex gap-3">
                <button
                  type="submit"
                  disabled={createPet.isPending}
                  className="bg-[#0E0E0E] text-white text-xs tracking-[0.2em] uppercase px-8 py-3 hover:bg-[#1a1a1a] transition-colors disabled:opacity-50"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {createPet.isPending ? "Сохраняем..." : "Сохранить"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="text-[#0E0E0E]/40 text-xs tracking-[0.2em] uppercase px-6 py-3 hover:text-[#0E0E0E] transition-colors"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Отмена
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Pets list */}
        {isLoading ? (
          <div className="flex flex-col gap-3">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white border border-[#E8F0EC] p-6 animate-pulse h-20" />
            ))}
          </div>
        ) : pets && pets.length > 0 ? (
          <div className="flex flex-col gap-3">
            {pets.map((pet) => (
              <div key={pet.id} className="bg-white border border-[#E8F0EC] p-5 flex items-center gap-4 hover:border-[#A8C5B5] transition-colors group">
                <div className="w-10 h-10 rounded-full bg-[#F7F5F2] flex items-center justify-center flex-shrink-0">
                  <PawPrint size={16} className="text-[#A8C5B5]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#0E0E0E] font-light" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px" }}>{pet.name}</p>
                  <p className="text-[#0E0E0E]/40 text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {pet.species === "dog" ? "Собака" : pet.species === "cat" ? "Кошка" : "Другое"}
                    {pet.breed ? ` · ${pet.breed}` : ""}
                    {pet.birthYear ? ` · ${new Date().getFullYear() - pet.birthYear} лет` : ""}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Link
                    href={`/account/diary/${pet.id}`}
                    className="text-xs text-[#A8C5B5] hover:text-[#0E0E0E] transition-colors hidden sm:block"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Дневник
                  </Link>
                  <button
                    onClick={() => {
                      if (confirm(`Удалить ${pet.name}?`)) deletePet.mutate({ id: pet.id });
                    }}
                    className="text-[#0E0E0E]/20 hover:text-red-400 transition-colors"
                  >
                    <X size={14} />
                  </button>
                  <Link href={`/account/diary/${pet.id}`}>
                    <ChevronRight size={16} className="text-[#0E0E0E]/20 group-hover:text-[#0E0E0E]/50 transition-colors" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-dashed border-[#E8F0EC] p-12 text-center">
            <PawPrint size={28} className="text-[#A8C5B5] mx-auto mb-4" />
            <p className="text-[#0E0E0E]/50 text-sm mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>Питомцев пока нет</p>
            <p className="text-[#0E0E0E]/30 text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>Нажмите «Добавить», чтобы создать профиль питомца</p>
          </div>
        )}
      </div>
    </AccountLayout>
  );
}
