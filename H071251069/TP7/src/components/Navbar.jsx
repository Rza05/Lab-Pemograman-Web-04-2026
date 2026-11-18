function Navbar({ totalItem, totalHarga }) {
  return (
    <header className="bg-amber-900 text-white sticky top-0 z-10 shadow">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold">☕ Kedai Kopi Senja</h1>
        <div className="text-right text-sm">
          <p>{totalItem} item</p>
          <p className="font-bold">Rp {totalHarga.toLocaleString("id-ID")}</p>
        </div>
      </div>
    </header>
  );
}

export default Navbar;