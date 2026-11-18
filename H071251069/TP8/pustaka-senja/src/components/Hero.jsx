// Server Component: hanya menerima props lalu menampilkannya
function Hero({ nama, slogan, lokasi, jamBuka }) {
  return (
    <section className="bg-indigo-900 text-white rounded-2xl p-10 text-center">
      <h1 className="text-4xl font-bold mb-3">{nama}</h1>
      <p className="text-indigo-100 text-lg mb-6">{slogan}</p>
      <p className="text-sm text-indigo-200">{lokasi}</p>
      <p className="text-sm text-indigo-200">Buka: {jamBuka}</p>
    </section>
  );
}

export default Hero;
