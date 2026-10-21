function Skills() {
  // Daftar keahlian disimpan sebagai array string
  const skills = ["HTML", "CSS", "JavaScript", "Python", "SQL", "Tailwind CSS"];

  return (
    <section id="skills" className="max-w-5xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-6 text-sky-400">Keahlian</h2>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="bg-sky-500/20 text-sky-300 border border-sky-500 px-4 py-2 rounded-full"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}

export default Skills;
