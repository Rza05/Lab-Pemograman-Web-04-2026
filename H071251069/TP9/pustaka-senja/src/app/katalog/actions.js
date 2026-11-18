"use server"; // semua fungsi di file ini berjalan di server

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import pool from "@/lib/db";

const daftarKategori = ["Teknologi", "Fiksi", "Pengembangan Diri"];

// Membaca dan memvalidasi isi form. Mengembalikan null jika ada yang tidak valid.
function bacaForm(formData) {
  const judul = String(formData.get("judul") || "").trim();
  const penulis = String(formData.get("penulis") || "").trim();
  const kategori = String(formData.get("kategori") || "");
  const tahun = Number(formData.get("tahun"));
  const tersedia = formData.get("tersedia") === "on"; // checkbox
  const sinopsis = String(formData.get("sinopsis") || "").trim();

  if (
    judul === "" ||
    penulis === "" ||
    sinopsis === "" ||
    !daftarKategori.includes(kategori) ||
    !Number.isInteger(tahun) ||
    tahun < 1000 ||
    tahun > 2100
  ) {
    return null;
  }

  return { judul, penulis, kategori, tahun, tersedia, sinopsis };
}

// CREATE
export async function tambahBuku(formData) {
  const data = bacaForm(formData);
  if (!data) return;

  await pool.query(
    "INSERT INTO buku (judul, penulis, kategori, tahun, tersedia, sinopsis) VALUES ($1, $2, $3, $4, $5, $6)",
    [data.judul, data.penulis, data.kategori, data.tahun, data.tersedia, data.sinopsis]
  );

  revalidatePath("/katalog");
  revalidatePath("/");
}

// UPDATE
export async function ubahBuku(formData) {
  const id = Number(formData.get("id"));
  const data = bacaForm(formData);
  if (!Number.isInteger(id) || !data) return;

  await pool.query(
    "UPDATE buku SET judul = $1, penulis = $2, kategori = $3, tahun = $4, tersedia = $5, sinopsis = $6 WHERE id = $7",
    [data.judul, data.penulis, data.kategori, data.tahun, data.tersedia, data.sinopsis, id]
  );

  revalidatePath("/katalog");
  revalidatePath("/");
  redirect("/katalog");
}

// DELETE
export async function hapusBuku(formData) {
  const id = Number(formData.get("id"));
  if (!Number.isInteger(id)) return;

  await pool.query("DELETE FROM buku WHERE id = $1", [id]);

  revalidatePath("/katalog");
  revalidatePath("/");
}
