"use client"; // wajib, karena memakai useState dan onClick

import { useState } from "react";
import BukuCard from "@/components/BukuCard";
import dataBuku from "@/data/dataBuku";

const daftarKategori = ["Semua", "Teknologi", "Fiksi", "Pengembangan Diri"];

export default function KatalogPage() {
  const [kategoriAktif, setKategoriAktif] = useState("Semua");

  // Kalau "Semua", tampilkan semua buku. Selain itu, saring sesuai kategori.
  const bukuTampil =
    kategoriAktif === "Semua"
      ? dataBuku
      : dataBuku.filter((buku) => buku.kategori === kategoriAktif);

  return (
    <section>
      <h1 className="text-3xl font-bold mb-2">Katalog Buku</h1>
      <p className="text-slate-600 mb-6">Pilih kategori untuk menyaring buku.</p>

      <div className="flex flex-wrap gap-2 mb-6">
        {daftarKategori.map((kategori) => (
          <button
            key={kategori}
            onClick={() => setKategoriAktif(kategori)}
            className={
              kategori === kategoriAktif
                ? "px-4 py-2 rounded-lg bg-indigo-700 text-white"
                : "px-4 py-2 rounded-lg bg-white border border-slate-300 hover:bg-slate-100"
            }
          >
            {kategori}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {bukuTampil.map((buku) => (
          <BukuCard
            key={buku.id}
            id={buku.id}
            judul={buku.judul}
            penulis={buku.penulis}
            kategori={buku.kategori}
            tahun={buku.tahun}
            tersedia={buku.tersedia}
          />
        ))}
      </div>
    </section>
  );
}
