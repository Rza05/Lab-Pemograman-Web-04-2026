// Server Component: dipakai ulang untuk form Tambah dan form Edit.
// Kalau props "buku" ada, input terisi data lama (mode edit).
const daftarKategori = ["Teknologi", "Fiksi", "Pengembangan Diri"];

const gayaInput =
  "w-full border border-slate-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:border-indigo-600";

function FormBuku({ action, buku, labelTombol }) {
  return (
    <form action={action} className="space-y-4">
      {buku && <input type="hidden" name="id" value={buku.id} />}

      <div>
        <label className="block text-sm mb-1">Judul</label>
        <input
          name="judul"
          type="text"
          defaultValue={buku?.judul}
          required
          className={gayaInput}
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Penulis</label>
        <input
          name="penulis"
          type="text"
          defaultValue={buku?.penulis}
          required
          className={gayaInput}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1">Kategori</label>
          <select
            name="kategori"
            defaultValue={buku?.kategori ?? "Teknologi"}
            className={gayaInput}
          >
            {daftarKategori.map((kategori) => (
              <option key={kategori} value={kategori}>
                {kategori}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm mb-1">Tahun Terbit</label>
          <input
            name="tahun"
            type="number"
            min="1000"
            max="2100"
            defaultValue={buku?.tahun}
            required
            className={gayaInput}
          />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input
          name="tersedia"
          type="checkbox"
          defaultChecked={buku ? buku.tersedia : true}
        />
        Buku tersedia (tidak sedang dipinjam)
      </label>

      <div>
        <label className="block text-sm mb-1">Sinopsis</label>
        <textarea
          name="sinopsis"
          rows={4}
          defaultValue={buku?.sinopsis}
          required
          className={gayaInput}
        />
      </div>

      <button
        type="submit"
        className="bg-indigo-700 hover:bg-indigo-600 text-white px-5 py-2.5 rounded-lg"
      >
        {labelTombol}
      </button>
    </form>
  );
}

export default FormBuku;
