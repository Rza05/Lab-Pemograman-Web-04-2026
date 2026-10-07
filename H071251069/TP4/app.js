// 1. DATA AWAL (Array of Objects)
const dataPraktikan = [
    { nama: "Budi", nilaiTugas: [80, 85, 90] },
    { nama: "Siti", nilaiTugas: [60, 60, 60] },
    { nama: "Andi", nilaiTugas: [90, 90, 90] },
    { nama: "Dewi", nilaiTugas: [75, 75, 75] },
    { nama: "Eko",  nilaiTugas: [45, 45, 45] }
];
const asistenTerdaftar = ["Reza", "Aditiya"]; 

// 2. MEMBUAT FUNGSI (Function Declaration)
function hitungRataRata(kumpulanNilai) {
    let total = 0; 
    for (let nilai of kumpulanNilai) {
        total = total + nilai;
    }
    return total / kumpulanNilai.length;
}

// 3. MEMINTA INPUT PENGGUNA
let namaAsisten = prompt("Masukkan nama Anda (Asisten Lab):");
let htmlTampilan = `
    <div class="bg-white rounded-xl shadow-md border border-gray-200 p-8 w-full max-w-3xl">
        <h1 class="text-2xl font-bold text-gray-800">Sistem Laporan Praktikum</h1>
        <br>
`;

// 4. CONTROL FLOW (Percabangan if...else)

let statusAsisten = false;
if (namaAsisten !== null) {
    for (let nama of asistenTerdaftar) {
        if (namaAsisten.toLowerCase() === nama.toLowerCase()) {
            statusAsisten = true;
        }
    }
}
if (statusAsisten === true) {
    htmlTampilan += `
        <div class="bg-blue-100 rounded-lg p-4 mb-4">
            <p class="text-blue-800">Selamat datang Asisten <strong>${namaAsisten}</strong>!</p>
        </div>
    `;

    for (let siswa of dataPraktikan) {
        let rataRata = hitungRataRata(siswa.nilaiTugas);
        let statusLulus = "";
        let warnaStatus = "";

        if (rataRata >= 75) {
            statusLulus = "Lulus";
            warnaStatus = "bg-green-100 text-green-700";
        } else {
            statusLulus = "Tidak Lulus";
            warnaStatus = "bg-red-100 text-red-700";
        }
        htmlTampilan += `
            <div class="flex justify-between items-center p-4 border border-gray-200 rounded-lg mb-3">
                <div>
                    <h2 class="text-lg font-bold">${siswa.nama}</h2>
                    <p class="text-gray-600">Rata-rata: ${rataRata}</p>
                </div>
                <div class="${warnaStatus} px-4 py-2 rounded-md font-semibold">
                    ${statusLulus}
                </div>
            </div>
        `;
    }

} else {
    htmlTampilan += `
        <div class="bg-red-100 rounded-lg p-4">
            <p class="text-red-800 font-bold">Akses Ditolak</p>
            <p class="text-red-700">Maaf, nama Anda tidak terdaftar sebagai asisten lab.</p>
        </div>
    `;
}

htmlTampilan += `</div>`;

// 5. OUTPUT KE BROWSER
document.write(htmlTampilan);

console.log("Proses evaluasi sistem selesai dijalankan.");
