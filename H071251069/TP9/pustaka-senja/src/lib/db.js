import { Pool } from "pg";

// Pool = kumpulan koneksi yang dipakai bergantian oleh semua halaman.
// Alamat database dibaca dari .env.local (tidak ditulis di kode).
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default pool;
