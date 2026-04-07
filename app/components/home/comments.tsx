"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
// import { postComment } from "@/app/hooks/mutation";

interface CommentFormData {
  nama: string;
  email: string;
  aspirasi: string;
  nomor_whatsapp: string;
}

export default function Comments() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentFormData>();

  const onSubmit = async (data: CommentFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // TODO: Uncomment when API is back online
      // await postComment(data);

      // TEMP: Mock successful submission for local development
      console.log("🚀 Mock comment submission:", data);
      setSubmitStatus("success");
      reset();
    } catch (error) {
      setSubmitStatus("error");
      console.error("Error submitting comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="comments-section" className="py-16 px-4 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Bagikan Aspirasi Anda
          </h2>
          <p className="text-gray-600">
            Kirimkan pesan, komentar, atau aspirasi Anda kepada kami. Kami akan
            merespons setiap masukan yang Anda berikan.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Nama Field */}
            <div>
              <label
                htmlFor="nama"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Nama Lengkap
              </label>
              <input
                type="text"
                id="nama"
                {...register("nama", {
                  required: "Nama wajib diisi",
                  minLength: {
                    value: 3,
                    message: "Nama minimal 3 karakter",
                  },
                })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                  errors.nama ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Masukkan nama lengkap Anda"
              />
              {errors.nama && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.nama.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email", {
                  required: "Email wajib diisi",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Format email tidak valid",
                  },
                })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="email@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Nomor WhatsApp Field */}
            <div>
              <label
                htmlFor="nomor_whatsapp"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Nomor WhatsApp
              </label>
              <input
                type="tel"
                id="nomor_whatsapp"
                {...register("nomor_whatsapp", {
                  required: "Nomor WhatsApp wajib diisi",
                  pattern: {
                    value: /^[0-9+\-\s]+$/,
                    message: "Format nomor telepon tidak valid",
                  },
                  minLength: {
                    value: 10,
                    message: "Nomor telepon minimal 10 digit",
                  },
                })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                  errors.nomor_whatsapp ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="08xx-xxxx-xxxx"
              />
              {errors.nomor_whatsapp && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.nomor_whatsapp.message}
                </p>
              )}
            </div>

            {/* Aspirasi Field */}
            <div>
              <label
                htmlFor="aspirasi"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Aspirasi/Pesan
              </label>
              <textarea
                id="aspirasi"
                {...register("aspirasi", {
                  required: "Aspirasi wajib diisi",
                  minLength: {
                    value: 10,
                    message: "Aspirasi minimal 10 karakter",
                  },
                  maxLength: {
                    value: 500,
                    message: "Aspirasi maksimal 500 karakter",
                  },
                })}
                rows={5}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none ${
                  errors.aspirasi ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Tuliskan aspirasi, komentar, atau pesan Anda di sini..."
              />
              {errors.aspirasi && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.aspirasi.message}
                </p>
              )}
            </div>

            {/* Submit Status Messages */}
            {submitStatus === "success" && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 text-sm">
                  ✅ Aspirasi Anda berhasil dikirim! Kami akan segera merespons.
                </p>
              </div>
            )}

            {submitStatus === "error" && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 text-sm">
                  ❌ Terjadi kesalahan. Silakan coba lagi nanti.
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Mengirim..." : "Kirim Aspirasi"}
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="mt-8 text-center text-gray-600 text-sm">
          <p>
            Anda juga dapat menghubungi kami langsung melalui WhatsApp atau
            email untuk respon lebih cepat.
          </p>
        </div>
      </div>
    </section>
  );
}
