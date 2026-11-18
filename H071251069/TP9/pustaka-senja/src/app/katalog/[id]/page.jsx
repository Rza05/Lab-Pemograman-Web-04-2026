// Server Component: async karena params berupa Promise dan membaca database
import Link from "next/link";
import pool from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function DetailBukuPage({ params }) {
  const { id } = await params; // nilai dari URL, misalnya "4" pada /katalog/4

  // Hanya cari ke database jika id berupa angka (mencegah error untuk /katalog/abc)
  let buku = null;
  if (/^\d{1,9}$/.test(id)) {
    const { rows } = await pool.query("SELECT * FROM buku WHERE id = $1", [id]);
    buku = rows[0]; // undefined jika tidak ada
  }

  if (!buku) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Buku dengan ID &quot;{id}&quot; tidak ditemukan.
        </h1>
        <Link href="/katalog" className="text-indigo-700 hover:underline">
          &larr; Kembali ke Katalog
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-2xl p-8">
      <span className="text-xs text-indigo-700 font-medium">{buku.kategori}</span>
      <h1 className="text-3xl font-bold mt-1 mb-2">{buku.judul}</h1>
      <p className="text-slate-600 mb-4">
        {buku.penulis} &bull; {buku.tahun}
      </p>

      {buku.tersedia ? (
        <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700">
          Tersedia
        </span>
      ) : (
        <span className="text-xs px-3 py-1 rounded-full bg-red-100 text-red-700">
          Sedang Dipinjam
        </span>
      )}

      <h2 className="font-semibold mt-6 mb-2">Sinopsis</h2>
      <p className="text-slate-700 leading-relaxed mb-8">{buku.sinopsis}</p>

      <div className="flex gap-3">
        <Link
          href="/katalog"
          className="bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-lg"
        >
          &larr; Kembali ke Katalog
        </Link>
        <Link
          href={`/katalog/${buku.id}/edit`}
          className="bg-indigo-700 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg"
        >
          Edit Buku
        </Link>
      </div>
    </article>
  );
}
