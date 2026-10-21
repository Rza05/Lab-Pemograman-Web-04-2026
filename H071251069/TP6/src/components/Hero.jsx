function Hero() {
  // Fungsi untuk mencetak pesan ke console
  const handleClick = () => {
    console.log("Tombol Hubungi Saya diklik!");
  };

  return (
    <section
      id="home"
      className="max-w-5xl mx-auto px-4 py-16 flex flex-col-reverse md:flex-row items-center gap-8"
    >
      <div className="text-center md:text-left">
        <p className="text-sky-400 mb-2">Halo, saya</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Aditiya Izza Fahreza
        </h1>
        <p className="text-slate-300 mb-6">
          Mahasiswa Sistem Informasi Universitas Hasanuddin yang bercita-cita
          menjadi System Analyst. Saya suka belajar database dan analisis
          sistem.
        </p>
        <button
          onClick={handleClick}
          className="bg-sky-500 hover:bg-sky-400 text-slate-900 font-semibold px-6 py-3 rounded-lg"
        >
          Hubungi Saya
        </button>
      </div>

     
      <img
        src="/images/profile.jpeg"
        alt="Foto Profil"
        className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover border-4 border-sky-400"
      />
    </section>
  );
}

export default Hero;
