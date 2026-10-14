// Mengambil elemen
let statusAnggota = document.getElementById("statusAnggota");
let daftarAnggota = document.getElementById("daftarAnggota");
let petunjuk = document.getElementById("petunjuk");
let bagianTugas = document.getElementById("bagianTugas");
let judulTugas = document.getElementById("judulTugas");
let statusTugas = document.getElementById("statusTugas");
let ringkasan = document.getElementById("ringkasan");
let inputCari = document.getElementById("inputCari");
let formTugas = document.getElementById("formTugas");
let inputJudul = document.getElementById("inputJudul");
let tombolSimpan = document.getElementById("tombolSimpan");
let errorForm = document.getElementById("errorForm");
let notifikasi = document.getElementById("notifikasi");
let pesanKosong = document.getElementById("pesanKosong");
let daftarTugas = document.getElementById("daftarTugas");

let idTerpilih = null; // id anggota yang sedang dipilih
let timerNotifikasi = null;

// F1: Menampilkan daftar anggota
async function muatAnggota() {
  statusAnggota.textContent = "Memuat anggota...";
  try {
    let respons = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!respons.ok) {
      throw new Error("Status " + respons.status);
    }
    let anggota = await respons.json();

    anggota.forEach((orang) => {
      let tombol = document.createElement("button");
      tombol.textContent = orang.name;
      tombol.className = "border rounded px-3 py-1 bg-white hover:bg-slate-100";
      tombol.addEventListener("click", () => {
        pilihAnggota(orang, tombol);
      });
      daftarAnggota.appendChild(tombol);
    });

    statusAnggota.textContent = ""; // hapus teks "Memuat anggota..."
  } catch (error) {
    statusAnggota.textContent = "Gagal memuat anggota: " + error.message;
    statusAnggota.classList = "text-red-600"
  }
}

//F2: Menampilkan tugas anggota
async function pilihAnggota(orang, tombolDiklik) {
  idTerpilih = orang.id;

  // Penanda: hapus dari semua tombol, lalu tambahkan ke yang diklik
  let semuaTombol = daftarAnggota.querySelectorAll("button");
  semuaTombol.forEach((t) => {
    t.classList.remove("!bg-blue-600", "!text-white");
  });
  tombolDiklik.classList.add("!bg-blue-600", "!text-white");

  // Tampilkan bagian tugas, sembunyikan petunjuk
  petunjuk.classList.add("hidden");
  bagianTugas.classList.remove("hidden");
  judulTugas.textContent = "Tugas " + orang.name;

  // Bersihkan tampilan lama
  daftarTugas.innerHTML = "";
  ringkasan.textContent = "";
  errorForm.textContent = "";
  notifikasi.textContent = "";
  inputCari.value = "";
  pesanKosong.classList.add("hidden");
  statusTugas.textContent = "Memuat tugas...";

  try {
    let respons = await fetch(
      "https://jsonplaceholder.typicode.com/todos?userId=" + orang.id
    );
    if (!respons.ok) {
      throw new Error("Status " + respons.status);
    }
    let tugas = await respons.json();

    // Jika pengguna sudah klik anggota lain saat menunggu, abaikan hasil ini
    if (idTerpilih !== orang.id) {
      return;
    }

    tugas.forEach((item) => {
      daftarTugas.appendChild(buatItemTugas(item));
    });

    statusTugas.textContent = "";
    perbaruiRingkasan();
  } catch (error) {
    if (idTerpilih === orang.id) {
      statusTugas.textContent = "Gagal memuat tugas: " + error.message;
    }
  }
}

// Membuat satu baris tugas (<li>) beserta tombolnya
function buatItemTugas(tugas) {
  let li = document.createElement("li");
  li.className = "flex items-center gap-2 border rounded p-2";

  let judul = document.createElement("span");
  judul.className = "judul flex-1";
  judul.textContent = tugas.title;

  // Tugas yang sudah selesai diberi class berbeda
  if (tugas.completed) {
    judul.classList.add("line-through", "text-gray-400");
  }

  li.appendChild(judul);

  // F5: tombol Tandai selesai (hanya untuk tugas yang belum selesai)
  if (!tugas.completed) {
    let tombolSelesai = document.createElement("button");
    tombolSelesai.textContent = "Tandai selesai";
    tombolSelesai.className = "text-sm bg-green-600 text-white px-2 py-1 rounded";
    tombolSelesai.addEventListener("click", () => {
      judul.classList.add("line-through", "text-gray-400");
      tombolSelesai.remove();
      perbaruiRingkasan();
    });
    li.appendChild(tombolSelesai);
  }

  // F5: tombol Hapus
  let tombolHapus = document.createElement("button");
  tombolHapus.textContent = "Hapus";
  tombolHapus.className = "text-sm bg-red-600 text-white px-2 py-1 rounded";
  tombolHapus.addEventListener("click", () => {
    li.remove();
    perbaruiRingkasan();
    terapkanPencarian();
  });
  li.appendChild(tombolHapus);

  return li;
}

// Menghitung dan menampilkan "X dari Y tugas selesai"
function perbaruiRingkasan() {
  let total = daftarTugas.children.length;
  let selesai = daftarTugas.querySelectorAll(".line-through").length;
  ringkasan.textContent = selesai + " dari " + total + " tugas selesai";
}

//  F3: Mencari tugas 
function terapkanPencarian() {
  let kata = inputCari.value.trim().toLowerCase();
  let semuaItem = daftarTugas.querySelectorAll("li");
  let jumlahTampil = 0;

  semuaItem.forEach((li) => {
    let judul = li.querySelector(".judul").textContent.toLowerCase();
    if (judul.includes(kata)) {
      li.classList.remove("hidden");
      jumlahTampil++;
    } else {
      li.classList.add("hidden");
    }
  });

  // Tampilkan pesan jika ada tugas tetapi tidak ada yang cocok
  if (semuaItem.length > 0 && jumlahTampil === 0) {
    pesanKosong.classList.remove("hidden");
  } else {
    pesanKosong.classList.add("hidden");
  }
}

inputCari.addEventListener("input", terapkanPencarian);

// F4: Menambah tugas baru 

// Simulasi menyimpan ke server
function simpanTugas(judul) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Cek judul yang sama (tidak membedakan huruf besar/kecil)
      let semuaJudul = daftarTugas.querySelectorAll(".judul");
      let sudahAda = false;
      semuaJudul.forEach((el) => {
        if (el.textContent.toLowerCase() === judul.toLowerCase()) {
          sudahAda = true;
        }
      });

      if (sudahAda) {
        reject(new Error('Tugas "' + judul + '" sudah ada di daftar.'));
      } else {
        resolve({ title: judul, completed: false });
      }
    }, 1000);
  });
}

function tampilkanNotifikasi() {
  notifikasi.textContent = "Tugas berhasil ditambahkan.";
  clearTimeout(timerNotifikasi);
  timerNotifikasi = setTimeout(() => {
    notifikasi.textContent = ""; // hilang otomatis setelah 3 detik
  }, 3000);
}

formTugas.addEventListener("submit", async (event) => {
  event.preventDefault(); // halaman tidak reload
  errorForm.textContent = "";

  // Validasi
  let judul = inputJudul.value.trim();
  if (judul.length < 5) {
    errorForm.textContent = "Judul tugas minimal 5 karakter.";
    return;
  }

  tombolSimpan.textContent = "Menyimpan...";
  tombolSimpan.disabled = true; // cegah klik ganda saat menunggu

  try {
    let tugasBaru = await simpanTugas(judul);
    daftarTugas.appendChild(buatItemTugas(tugasBaru));
    perbaruiRingkasan();
    terapkanPencarian();
    inputJudul.value = "";
    tampilkanNotifikasi();
  } catch (error) {
    errorForm.textContent = error.message;
  } finally {
    tombolSimpan.textContent = "Simpan";
    tombolSimpan.disabled = false;
  }
});

// Jalankan saat halaman dibuka 
muatAnggota();
