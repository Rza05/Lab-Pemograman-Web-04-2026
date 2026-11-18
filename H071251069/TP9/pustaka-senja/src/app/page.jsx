// Server Component: boleh async dan langsung membaca database
import Link from "next/link";
import Hero from "@/components/Hero";
import pool from "@/lib/db";

export const dynamic = "force-dynamic"; // selalu ambil data terbaru

export default async function HomePage() {
  const { rows } = await pool.query("SELECT * FROM buku");

  // Statistik dihitung dari data database
  const total = rows.length;
  const tersedia = rows.filter((buku) => buku.tersedia).length;
  const dipinjam = rows.filter((buku) => !buku.tersedia).length;

  const statistik = [
    { label: "Total Koleksi Buku", nilai: total },
    { label: "Buku Tersedia", nilai: tersedia },
    { label: "Buku Dipinjam", nilai: dipinjam },
  ];

  return (
    <div className="space-y-8">
      <Hero
        nama="Pustaka Senja"
        slogan="Ruang baca nyaman untuk menemani sore harimu."
        lokasi="Jl. Perintis Kemerdekaan, dekat kampus"
        jamBuka="Senin - Sabtu, 10.00 - 20.00"
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {statistik.map((item) => (
          <div
            key={item.label}
            className="bg-white border border-slate-200 rounded-xl p-6 text-center"
          >
            <p className="text-3xl font-bold text-indigo-900">{item.nilai}</p>
            <p className="text-sm text-slate-600 mt-1">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4">
        <Link
          href="/katalog"
          className="bg-indigo-700 hover:bg-indigo-600 text-white px-5 py-2.5 rounded-lg"
        >
          Lihat Katalog
        </Link>
        <Link
          href="/usulan"
          className="border border-slate-300 hover:bg-slate-100 px-5 py-2.5 rounded-lg"
        >
          Usulkan Buku
        </Link>
      </div>
    </div>
  );
}
