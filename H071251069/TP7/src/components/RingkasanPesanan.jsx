function RingkasanPesanan({ itemPesanan, totalItem, totalHarga }) {
  return (
    <section className="bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-bold mb-3">Ringkasan Pesanan</h2>

      {itemPesanan.length === 0 ? (
        <p className="text-stone-500">Belum ada pesanan.</p>
      ) : (
        <ul className="divide-y">
          {itemPesanan.map((item) => (
            <li key={item.id} className="flex justify-between py-2">
              <span>
                {item.nama} x {item.jumlah}
              </span>
              <span>Rp {(item.harga * item.jumlah).toLocaleString("id-ID")}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 pt-3 border-t font-bold flex justify-between">
        <span>Total ({totalItem} item)</span>
        <span>Rp {totalHarga.toLocaleString("id-ID")}</span>
      </div>
    </section>
  );
}

export default RingkasanPesanan;