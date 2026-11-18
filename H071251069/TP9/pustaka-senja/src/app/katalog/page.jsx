// Server Component: membaca database, lalu menyerahkan datanya ke komponen client
import pool from "@/lib/db";
import FormBuku from "@/components/FormBuku";
import DaftarBuku from "@/components/DaftarBuku";
import { tambahBuku } from "./actions";

export const dynamic = "force-dynamic"; // jangan di-cache

export default async function KatalogPage() {
  const { rows } = await pool.query("SELECT * FROM buku ORDER BY id");

  return (
    <section>
      <h1 className="text-3xl font-bold mb-2">Katalog Buku</h1>
      <p className="text-slate-600 mb-6">
        Pilih kategori untuk menyaring buku, atau tambahkan buku baru.
      </p>

      <details className="bg-white border border-slate-200 rounded-xl p-5 mb-8">
        <summary className="cursor-pointer font-semibold">Tambah Buku Baru</summary>
        <div className="mt-4">
          <FormBuku action={tambahBuku} labelTombol="Simpan Buku" />
        </div>
      </details>

      <DaftarBuku daftarBuku={rows} />
    </section>
  );
}
