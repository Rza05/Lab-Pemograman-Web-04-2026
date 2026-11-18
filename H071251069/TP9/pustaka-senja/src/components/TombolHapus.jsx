"use client"; // wajib, karena memakai onSubmit dan confirm() milik browser

import { hapusBuku } from "@/app/katalog/actions";

export default function TombolHapus({ id }) {
  return (
    <form
      action={hapusBuku}
      onSubmit={(e) => {
        // Jika pengguna menekan Batal, hentikan pengiriman form
        if (!confirm("Yakin hapus buku ini?")) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button type="submit" className="text-sm text-red-600 hover:underline">
        Hapus
      </button>
    </form>
  );
}
