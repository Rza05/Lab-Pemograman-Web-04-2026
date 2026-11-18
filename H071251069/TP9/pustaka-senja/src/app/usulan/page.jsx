"use client"; // wajib, karena memakai useState dan onSubmit/onChange

import { useState } from "react";

export default function UsulanPage() {
  // Satu state untuk tiap input (controlled component)
  const [nama, setNama] = useState("");
  const [judul, setJudul] = useState("");
  const [kategori, setKategori] = useState("");
  const [alasan, setAlasan] = useState("");

  const [pesan, setPesan] = useState(""); // pesan peringatan / konfirmasi
  const [berhasil, setBerhasil] = useState(false); // true = hijau, false = merah
  const [daftarUsulan, setDaftarUsulan] = useState([]);

  function handleSubmit(e) {
    e.preventDefault(); // cegah halaman reload

    // Validasi: semua kolom wajib terisi (setelah trim)
    if (
      nama.trim() === "" ||
      judul.trim() === "" ||
      kategori === "" ||
      alasan.trim() === ""
    ) {
      setBerhasil(false);
      setPesan("Semua kolom wajib diisi sebelum mengirim usulan.");
      return;
    }

    const usulanBaru = {
      id: Date.now(), // id unik untuk key
      nama: nama.trim(),
      judul: judul.trim(),
      kategori: kategori,
      alasan: alasan.trim(),
    };

    // Tambahkan ke daftar tanpa mengubah array lama (tanpa mutasi)
    setDaftarUsulan([usulanBaru, ...daftarUsulan]);

    setBerhasil(true);
    setPesan("Terima kasih, usulan buku berhasil dikirim!");

    // Kosongkan form
    setNama("");
    setJudul("");
    setKategori("");
    setAlasan("");
  }

  const gayaInput =
    "w-full border border-slate-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:border-indigo-600";

  return (
    <section className="max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Usulan Buku</h1>
      <p className="text-slate-600 mb-6">
        Ada buku yang ingin dihadirkan di Pustaka Senja? Isi formulir ini.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4"
      >
        <div>
          <label className="block text-sm mb-1">Nama Pengusul</label>
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className={gayaInput}
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Judul Buku yang Diusulkan</label>
          <input
            type="text"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            className={gayaInput}
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Kategori</label>
          <select
            value={kategori}
            onChange={(e) => setKategori(e.target.value)}
            className={gayaInput}
          >
            <option value="">-- Pilih kategori --</option>
            <option value="Teknologi">Teknologi</option>
            <option value="Fiksi">Fiksi</option>
            <option value="Pengembangan Diri">Pengembangan Diri</option>
          </select>
        </div>

        <div>
          <label className="block text-sm mb-1">Alasan Usulan</label>
          <textarea
            rows={4}
            value={alasan}
            onChange={(e) => setAlasan(e.target.value)}
            className={gayaInput}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-700 hover:bg-indigo-600 text-white py-2.5 rounded-lg"
        >
          Kirim Usulan
        </button>
      </form>

      {pesan !== "" && (
        <p
          className={
            berhasil
              ? "mt-4 p-3 rounded-lg text-sm bg-green-100 text-green-700"
              : "mt-4 p-3 rounded-lg text-sm bg-red-100 text-red-700"
          }
        >
          {pesan}
        </p>
      )}

      {daftarUsulan.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-3">Usulan yang Baru Dikirim</h2>
          <ul className="space-y-3">
            {daftarUsulan.map((usulan) => (
              <li
                key={usulan.id}
                className="bg-white border border-slate-200 rounded-xl p-4"
              >
                <p className="font-semibold">{usulan.judul}</p>
                <p className="text-sm text-slate-600">
                  {usulan.kategori} &bull; diusulkan oleh {usulan.nama}
                </p>
                <p className="text-sm text-slate-700 mt-1">{usulan.alasan}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
