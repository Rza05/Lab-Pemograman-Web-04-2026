import MenuCard from "./MenuCard";

const daftarKategori = ["Semua", "Kopi", "Non-Kopi", "Makanan"];

function MenuList({ menu, kategoriAktif, onPilihKategori, onTambah }) {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Daftar Menu</h2>

      <div className="flex flex-wrap gap-2 mb-6">
        {daftarKategori.map((kategori) => (
          <button
            key={kategori}
            onClick={() => onPilihKategori(kategori)}
            className={
              kategori === kategoriAktif
                ? "px-4 py-2 rounded-full bg-amber-800 text-white"
                : "px-4 py-2 rounded-full bg-white border border-amber-800 text-amber-800 hover:bg-amber-100"
            }
          >
            {kategori}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {menu.map((item) => (
          <MenuCard
            key={item.id}
            id={item.id}
            nama={item.nama}
            kategori={item.kategori}
            harga={item.harga}
            tersedia={item.tersedia}
            deskripsi={item.deskripsi}
            onTambah={onTambah}
          />
        ))}
      </div>
    </section>
  );
}

export default MenuList;