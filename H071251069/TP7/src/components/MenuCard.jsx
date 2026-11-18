import { useState } from "react";

function MenuCard({ id, nama, kategori, harga, tersedia, deskripsi, onTambah }) {

  const [detailTerbuka, setDetailTerbuka] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-2">
      <div className="flex items-start justify-between">
        <h3 className="font-bold text-lg">{nama}</h3>
        <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded">
          {kategori}
        </span>
      </div>

      <p className="font-semibold">Rp {harga.toLocaleString("id-ID")}</p>

      {detailTerbuka && <p className="text-sm text-stone-600">{deskripsi}</p>}

      <div className="flex gap-2 mt-auto pt-2">
        <button
          onClick={() => setDetailTerbuka(!detailTerbuka)}
          className="flex-1 border border-amber-800 text-amber-800 rounded py-2 hover:bg-amber-100"
        >
          {detailTerbuka ? "Tutup Detail" : "Lihat Detail"}
        </button>

        <button
          onClick={() => onTambah(id)}
          disabled={!tersedia}
          className={
            tersedia
              ? "flex-1 bg-amber-800 text-white rounded py-2 hover:bg-amber-900"
              : "flex-1 bg-stone-300 text-stone-500 rounded py-2 cursor-not-allowed"
          }
        >
          {tersedia ? "Tambah" : "Habis"}
        </button>
      </div>
    </div>
  );
}

export default MenuCard;