import foto1 from "../assets/gallery/foto1.jpg";
import foto2 from "../assets/gallery/foto2.png";
import foto3 from "../assets/gallery/foto3.jpg";
import foto4 from "../assets/gallery/foto4.jpg";

function Gallery() {
  // Data foto disimpan sebagai array of object
  const galeriFoto = [
    { id: 1, src: foto1, judul: "Kegiatan Kampus" },
    { id: 2, src: foto2, judul: "Belajar Coding" },
    { id: 3, src: foto3, judul: "Kil" },
    { id: 4, src: foto4, judul: "Momen Favorit" },
  ];

  return (
    <section id="gallery" className="max-w-5xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-6 text-sky-400">Galeri</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {galeriFoto.map((foto) => (
          <figure
            key={foto.id}
            className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700"
          >
            <img
              src={foto.src}
              alt={foto.judul}
              className="w-full h-48 object-cover"
            />
            <figcaption className="p-3 text-center text-slate-300">
              {foto.judul}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export default Gallery;
