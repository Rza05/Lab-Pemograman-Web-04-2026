// Server Component: async karena params berupa Promise
import Link from "next/link";
import dataBuku from "@/data/dataBuku";

export default async function DetailBukuPage({ params }) {
  const { id } = await params; // nilai dari URL, misalnya "4" pada /katalog/4
  const buku = dataBuku.find((item) => item.id === id);

  // Jika id tidak ada di data (misalnya /katalog/99)
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

      <Link
        href="/katalog"
        className="inline-block bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-lg"
      >
        &larr; Kembali ke Katalog
      </Link>
    </article>
  );
}
