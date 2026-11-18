"use client"; // wajib, karena memakai useState dan onClick

import { useState } from "react";
import Link from "next/link";

function BukuCard({ id, judul, penulis, kategori, tahun, tersedia }) {
  // state favorit milik masing-masing kartu
  const [favorit, setFavorit] = useState(false);

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col gap-2">
      <span className="text-xs text-indigo-700 font-medium">{kategori}</span>
      <h3 className="text-lg font-semibold">{judul}</h3>
      <p className="text-sm text-slate-600">
        {penulis} &bull; {tahun}
      </p>

      {tersedia ? (
        <span className="w-fit text-xs px-3 py-1 rounded-full bg-green-100 text-green-700">
          Tersedia
        </span>
      ) : (
        <span className="w-fit text-xs px-3 py-1 rounded-full bg-red-100 text-red-700">
          Sedang Dipinjam
        </span>
      )}

      <div className="flex items-center justify-between mt-3">
        <button
          onClick={() => setFavorit(!favorit)}
          className={
            favorit
              ? "text-sm px-3 py-1.5 rounded-lg bg-pink-500 text-white"
              : "text-sm px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200"
          }
        >
          {favorit ? "Favorit ✓" : "Simpan ke Favorit"}
        </button>
        <Link
          href={`/katalog/${id}`}
          className="text-sm text-indigo-700 hover:underline"
        >
          Lihat Detail
        </Link>
      </div>
    </div>
  );
}

export default BukuCard;
