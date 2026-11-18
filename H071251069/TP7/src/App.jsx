import { useState } from "react";
import Navbar from "./components/Navbar";
import MenuList from "./components/MenuList";
import RingkasanPesanan from "./components/RingkasanPesanan";
import FormPesan from "./components/FormPesan";
import Footer from "./components/Footer";

// Data menu ditulis satu kali di sini
const dataMenu = [
  { id: 1, nama: "Kopi Susu", kategori: "Kopi", harga: 18000, tersedia: true, deskripsi: "Espresso dengan susu segar dan gula aren." },
  { id: 2, nama: "Americano", kategori: "Kopi", harga: 15000, tersedia: true, deskripsi: "Espresso dengan air panas, rasa kuat dan bersih." },
  { id: 3, nama: "Cappuccino", kategori: "Kopi", harga: 22000, tersedia: true, deskripsi: "Espresso, susu panas, dan busa susu tebal." },
  { id: 4, nama: "Matcha Latte", kategori: "Non-Kopi", harga: 24000, tersedia: true, deskripsi: "Teh hijau matcha dengan susu." },
  { id: 5, nama: "Teh Tarik", kategori: "Non-Kopi", harga: 14000, tersedia: false, deskripsi: "Teh susu yang ditarik hingga berbusa." },
  { id: 6, nama: "Cokelat Panas", kategori: "Non-Kopi", harga: 20000, tersedia: true, deskripsi: "Cokelat pekat dengan susu hangat." },
  { id: 7, nama: "Roti Bakar", kategori: "Makanan", harga: 16000, tersedia: true, deskripsi: "Roti tebal dengan selai cokelat dan keju." },
  { id: 8, nama: "Pisang Goreng", kategori: "Makanan", harga: 12000, tersedia: false, deskripsi: "Pisang goreng renyah dengan taburan keju." },
  { id: 9, nama: "Nasi Goreng", kategori: "Makanan", harga: 25000, tersedia: true, deskripsi: "Nasi goreng kampung dengan telur mata sapi." },
];

function App() {
  const [kategoriAktif, setKategoriAktif] = useState("Semua");
  const [pesanan, setPesanan] = useState([]);
  const [ucapan, setUcapan] = useState("");

  // Menu yang ditampilkan sesuai kategori
  const menuTampil =
    kategoriAktif === "Semua"
      ? dataMenu
      : dataMenu.filter((menu) => menu.kategori === kategoriAktif);

  // Gabungkan pesanan dengan data menu supaya ada nama dan harga
  const itemPesanan = pesanan.map((item) => {
    const menu = dataMenu.find((m) => m.id === item.id);
    return { ...menu, jumlah: item.jumlah };
  });

  // Total dihitung dari pesanan 
  const totalItem = itemPesanan.reduce((hasil, item) => hasil + item.jumlah, 0);
  const totalHarga = itemPesanan.reduce(
    (hasil, item) => hasil + item.harga * item.jumlah,
    0
  );

  function tambahPesanan(id) {
    const sudahAda = pesanan.find((item) => item.id === id);

    if (sudahAda) {
      // menu sudah ada: jumlahnya ditambah 1
      setPesanan(
        pesanan.map((item) =>
          item.id === id ? { ...item, jumlah: item.jumlah + 1 } : item
        )
      );
    } else {
      // menu belum ada: tambahkan sebagai item baru
      setPesanan([...pesanan, { id: id, jumlah: 1 }]);
    }
    setUcapan("");
  }

  function kirimPesanan(nama, meja) {
    setUcapan(`Terima kasih, ${nama}! Pesanan untuk meja ${meja} sudah kami terima.`);
    setPesanan([]); 
  }

  return (
    <div className="min-h-screen bg-amber-50 text-stone-800">
      <Navbar totalItem={totalItem} totalHarga={totalHarga} />

      <main className="max-w-5xl mx-auto px-4 py-6">
        {ucapan !== "" && (
          <div className="mb-6 rounded-lg bg-green-100 border border-green-400 text-green-800 p-4">
            {ucapan}
          </div>
        )}

        <MenuList
          menu={menuTampil}
          kategoriAktif={kategoriAktif}
          onPilihKategori={setKategoriAktif}
          onTambah={tambahPesanan}
        />

        <div className="grid gap-6 md:grid-cols-2 mt-8">
          <RingkasanPesanan
            itemPesanan={itemPesanan}
            totalItem={totalItem}
            totalHarga={totalHarga}
          />
          <FormPesan totalItem={totalItem} onKirim={kirimPesanan} />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;