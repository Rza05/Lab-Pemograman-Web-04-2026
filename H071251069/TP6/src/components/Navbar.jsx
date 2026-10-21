function Navbar() {
  // Data menu disimpan di array
  const menu = ["Home", "About", "Skills", "Gallery"];

  // Fungsi untuk mencetak nama menu ke console
  const handleClick = (nama) => {
    console.log("Menu diklik:", nama);
  };

  return (
    <nav className="sticky top-0 z-10 bg-slate-900/90 backdrop-blur border-b border-slate-700">
      <div className="max-w-5xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-2">
        <h2 className="text-xl font-bold text-sky-400">MyPortfolio</h2>
        <ul className="flex gap-5">
          {menu.map((item, index) => (
            <li key={index}>
              <a
                href={"#" + item.toLowerCase()}
                onClick={() => handleClick(item)}
                className="hover:text-sky-400"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
