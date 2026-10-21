function About() {
  const dataDiri = [
    { id: 1, label: "Nama", isi: "Aditiya Izza Fahreza" },
    { id: 2, label: "Kampus", isi: "Universitas Hasanuddin" },
    { id: 3, label: "Jurusan", isi: "Sistem Informasi" },
    { id: 4, label: "Fokus", isi: "Database & Analisis Sistem" },
    { id: 5, label: "Cita-cita", isi: "Hidup Chill" },
  ];

  return (
    <section id="about" className="max-w-5xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-6 text-sky-400">Tentang Saya</h2>
      <p className="text-slate-300 mb-6">
        Saya mahasiswa Sistem Informasi tahun kedua. Saya sedang belajar
        membuat website dan memperdalam pengelolaan database dengan SQL dan
        Python. Saat ini saya mencari kesempatan magang atau proyek kolaborasi.
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        {dataDiri.map((item) => (
          <div
            key={item.id}
            className="bg-slate-800 p-4 rounded-lg border border-slate-700"
          >
            <p className="text-sm text-slate-400">{item.label}</p>
            <p className="font-semibold">{item.isi}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default About;
