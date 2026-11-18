"use client"; // wajib, karena filter kategori memakai useState

import { useState } from "react";
import BukuCard from "@/components/BukuCard";

const daftarKategori = ["Semua", "Teknologi", "Fiksi", "Pengembangan Diri"];

// Data buku datang dari halaman (server) lewat props.
// Komponen ini TIDAK mengakses database, hanya menyaring tampilan.
function DaftarBuku({ daftarBuku }) {
  const [kategoriAktif, setKategoriAktif] = useState("Semua");

  const bukuTampil =
    kategoriAktif === "Semua"
      ? daftarBuku
      : daftarBuku.filter((buku) => buku.kategori === kategoriAktif);

  return (
    <div>
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
    </div>
  );
}

export default DaftarBuku;
