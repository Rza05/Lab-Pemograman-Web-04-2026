import { useState } from "react";

function FormPesan({ totalItem, onKirim }) {
  const [nama, setNama] = useState("");
  const [meja, setMeja] = useState("");
  const [pesanError, setPesanError] = useState("");

  function handleSubmit(e) {
    e.preventDefault(); 

    if (totalItem === 0) {
      setPesanError("Pesanan masih kosong. Silakan pilih menu dulu.");
      return;
    }
    if (nama.trim() === "") {
      setPesanError("Nama wajib diisi.");
      return;
    }
    const nomorMeja = Number(meja);
    if (meja === "" || !Number.isInteger(nomorMeja) || nomorMeja < 1) {
      setPesanError("Nomor meja harus berupa angka bulat lebih dari 0.");
      return;
    }

    onKirim(nama.trim(), nomorMeja);
    setNama("");
    setMeja("");
    setPesanError("");
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-bold mb-3">Kirim Pesanan</h2>

      <label className="block mb-3">
        <span className="text-sm">Nama</span>
        <input
          type="text"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          className="mt-1 w-full border rounded px-3 py-2"
          placeholder="Nama kamu"
        />
      </label>

      <label className="block mb-3">
        <span className="text-sm">Nomor Meja</span>
        <input
          type="number"
          min="1"
          value={meja}
          onChange={(e) => setMeja(e.target.value)}
          className="mt-1 w-full border rounded px-3 py-2"
          placeholder="Contoh: 5"
        />
      </label>

      {pesanError !== "" && (
        <p className="mb-3 text-red-600 text-sm">{pesanError}</p>
      )}

      <button
        type="submit"
        className="w-full bg-amber-800 text-white rounded py-2 hover:bg-amber-900"
      >
        Kirim Pesanan
      </button>
    </form>
  );
}

export default FormPesan;