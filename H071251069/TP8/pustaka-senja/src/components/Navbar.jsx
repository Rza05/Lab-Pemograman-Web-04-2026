"use client"; // wajib, karena memakai hook usePathname

import Link from "next/link";
import { usePathname } from "next/navigation";

const daftarMenu = [
  { nama: "Beranda", path: "/" },
  { nama: "Katalog", path: "/katalog" },
  { nama: "Usulan Buku", path: "/usulan" },
];

function Navbar() {
  // pathname berisi alamat URL saat ini, misalnya "/katalog/1"
  const pathname = usePathname();

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-indigo-900">
          Pustaka Senja
        </Link>

        <ul className="flex gap-6">
          {daftarMenu.map((item) => {
            // Beranda harus persis "/", menu lain cukup diawali path-nya
            // (jadi /katalog/1 tetap menandai Katalog sebagai aktif)
            const aktif =
              item.path === "/"
                ? pathname === "/"
                : pathname.startsWith(item.path);

            return (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={
                    aktif
                      ? "font-semibold text-indigo-700 border-b-2 border-indigo-700 pb-1"
                      : "text-slate-500 hover:text-slate-800"
                  }
                >
                  {item.nama}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
