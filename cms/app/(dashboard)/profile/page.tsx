"use client";

import { useEffect, useState } from "react";
import { getProfile, updateProfile, createProfile } from "@/lib/api";
import type {
  ProfileData,
  Education,
  Organization,
  Experience,
  CarouselItem,
} from "@/lib/types";
import { Plus, Trash2, Save } from "lucide-react";
import ImageUpload from "@/components/image-upload";

const emptyProfile: ProfileData = {
  name: "",
  position: "",
  imageProfile: "",
  topTagline: "",
  bottomTagline: "",
  description: "",
  biodata: "",
  vision: "",
  mission: "",
  carousel: [],
  education: [],
  organization: [],
  experience: [],
};

export default function ProfilePage() {
  const [profileId, setProfileId] = useState<number | null>(null);
  const [form, setForm] = useState<ProfileData>(emptyProfile);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    getProfile()
      .then(({ data }) => {
        if (data) {
          setProfileId((data as ProfileData & { id?: number }).id ?? null);
          setForm({
            ...emptyProfile,
            ...data,
            carousel: data.carousel ?? [],
            education: data.education ?? [],
            organization: data.organization ?? [],
            experience: data.experience ?? [],
          });
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  function set(key: keyof ProfileData, value: unknown) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      if (profileId) {
        await updateProfile(profileId, form);
      } else {
        await createProfile(form);
      }
      setMessage({ type: "success", text: "Profil berhasil disimpan." });
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Gagal menyimpan.",
      });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40 text-slate-400 text-sm">
        Memuat profil...
      </div>
    );
  }

  return (
    <form onSubmit={handleSave}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Profile</h1>
          <p className="text-slate-500 text-sm mt-1">
            Informasi profil yang ditampilkan di website
          </p>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 disabled:opacity-50 transition-colors"
        >
          <Save className="w-4 h-4" />
          {saving ? "Menyimpan..." : "Simpan"}
        </button>
      </div>

      {message && (
        <div
          className={`mb-6 px-4 py-3 rounded-lg text-sm ${message.type === "success" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}
        >
          {message.text}
        </div>
      )}

      <div className="space-y-6">
        {/* Basic Info */}
        <Section title="Informasi Dasar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Nama">
              <input
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                required
                className={inputClass}
                placeholder="Nama lengkap"
              />
            </Field>
            <Field label="Jabatan">
              <input
                value={form.position}
                onChange={(e) => set("position", e.target.value)}
                required
                className={inputClass}
                placeholder="Jabatan / posisi"
              />
            </Field>
            <Field label="Foto Profil">
              <ImageUpload
                value={form.imageProfile}
                onChange={(url) => set("imageProfile", url)}
              />
            </Field>
            <Field label="Top Tagline">
              <input
                value={form.topTagline}
                onChange={(e) => set("topTagline", e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Bottom Tagline" className="md:col-span-2">
              <input
                value={form.bottomTagline}
                onChange={(e) => set("bottomTagline", e.target.value)}
                className={inputClass}
              />
            </Field>
          </div>
        </Section>

        {/* Description & Bio */}
        <Section title="Deskripsi & Biodata">
          <div className="space-y-4">
            <Field label="Deskripsi Singkat">
              <textarea
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                rows={3}
                className={inputClass}
              />
            </Field>
            <Field label="Biodata">
              <textarea
                value={form.biodata}
                onChange={(e) => set("biodata", e.target.value)}
                rows={4}
                className={inputClass}
              />
            </Field>
            <Field label="Visi">
              <textarea
                value={form.vision}
                onChange={(e) => set("vision", e.target.value)}
                rows={3}
                className={inputClass}
              />
            </Field>
            <Field label="Misi">
              <textarea
                value={form.mission}
                onChange={(e) => set("mission", e.target.value)}
                rows={3}
                className={inputClass}
              />
            </Field>
          </div>
        </Section>

        {/* Carousel */}
        <Section title="Carousel Gambar">
          <DynamicList<CarouselItem>
            items={form.carousel}
            onChange={(items) => set("carousel", items)}
            empty={{ imageCarousel: "" }}
            renderRow={(item, _idx, update) => (
              <ImageUpload
                value={item.imageCarousel}
                onChange={(url) => update({ imageCarousel: url })}
              />
            )}
          />
        </Section>

        {/* Education */}
        <Section title="Pendidikan">
          <DynamicList<Education>
            items={form.education}
            onChange={(items) => set("education", items)}
            empty={{ school: "", location: "", startYear: "", endYear: "" }}
            renderRow={(item, _idx, update) => (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <input
                  value={item.school}
                  onChange={(e) => update({ ...item, school: e.target.value })}
                  className={inputClass}
                  placeholder="Sekolah / Universitas"
                />
                <input
                  value={item.location}
                  onChange={(e) =>
                    update({ ...item, location: e.target.value })
                  }
                  className={inputClass}
                  placeholder="Lokasi"
                />
                <input
                  value={String(item.startYear)}
                  onChange={(e) =>
                    update({ ...item, startYear: e.target.value })
                  }
                  className={inputClass}
                  placeholder="Tahun mulai"
                />
                <input
                  value={String(item.endYear)}
                  onChange={(e) => update({ ...item, endYear: e.target.value })}
                  className={inputClass}
                  placeholder="Tahun selesai / Sekarang"
                />
              </div>
            )}
          />
        </Section>

        {/* Organization */}
        <Section title="Organisasi">
          <DynamicList<Organization>
            items={form.organization}
            onChange={(items) => set("organization", items)}
            empty={{ organization: "", startYear: "", endYear: "", image: "" }}
            renderRow={(item, _idx, update) => (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <input
                  value={item.organization}
                  onChange={(e) =>
                    update({ ...item, organization: e.target.value })
                  }
                  className={inputClass}
                  placeholder="Nama organisasi"
                />
                <input
                  value={String(item.startYear)}
                  onChange={(e) =>
                    update({ ...item, startYear: e.target.value })
                  }
                  className={inputClass}
                  placeholder="Tahun mulai"
                />
                <input
                  value={String(item.endYear)}
                  onChange={(e) => update({ ...item, endYear: e.target.value })}
                  className={inputClass}
                  placeholder="Tahun selesai"
                />
                <div className="col-span-2 md:col-span-1">
                  <ImageUpload
                    label="Logo (Opsional)"
                    value={item.image ?? ""}
                    onChange={(url) => update({ ...item, image: url })}
                  />
                </div>
              </div>
            )}
          />
        </Section>

        {/* Experience */}
        <Section title="Pengalaman">
          <DynamicList<Experience>
            items={form.experience}
            onChange={(items) => set("experience", items)}
            empty={{ experience: "", startYear: "", endYear: "", image: "" }}
            renderRow={(item, _idx, update) => (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <input
                  value={item.experience}
                  onChange={(e) =>
                    update({ ...item, experience: e.target.value })
                  }
                  className={inputClass}
                  placeholder="Nama pengalaman"
                />
                <input
                  value={String(item.startYear)}
                  onChange={(e) =>
                    update({ ...item, startYear: e.target.value })
                  }
                  className={inputClass}
                  placeholder="Tahun mulai"
                />
                <input
                  value={String(item.endYear)}
                  onChange={(e) => update({ ...item, endYear: e.target.value })}
                  className={inputClass}
                  placeholder="Tahun selesai"
                />
                <div className="col-span-2 md:col-span-1">
                  <ImageUpload
                    label="Logo (Opsional)"
                    value={item.image ?? ""}
                    onChange={(url) => update({ ...item, image: url })}
                  />
                </div>
              </div>
            )}
          />
        </Section>
      </div>
    </form>
  );
}

const inputClass =
  "w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent bg-white";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
      <h2 className="font-semibold text-slate-900 mb-4">{title}</h2>
      {children}
    </div>
  );
}

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-xs font-medium text-slate-600 mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}

function DynamicList<T>({
  items,
  onChange,
  empty,
  renderRow,
}: {
  items: T[];
  onChange: (items: T[]) => void;
  empty: T;
  renderRow: (
    item: T,
    index: number,
    update: (val: T) => void,
  ) => React.ReactNode;
}) {
  function add() {
    onChange([...items, { ...empty }]);
  }

  function remove(idx: number) {
    onChange(items.filter((_, i) => i !== idx));
  }

  function update(idx: number, val: T) {
    const next = [...items];
    next[idx] = val;
    onChange(next);
  }

  return (
    <div className="space-y-2">
      {items.map((item, idx) => (
        <div key={idx} className="flex items-start gap-2">
          <div className="flex-1">
            {renderRow(item, idx, (val) => update(idx, val))}
          </div>
          <button
            type="button"
            onClick={() => remove(idx)}
            className="mt-1 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900 px-3 py-1.5 border border-dashed border-slate-300 rounded-lg hover:border-slate-400 transition-colors"
      >
        <Plus className="w-4 h-4" />
        Tambah
      </button>
    </div>
  );
}
