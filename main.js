async function getSiswa() {
    const response = await fetch('http://localhost:3000/api/siswa');
    const data = await response.json();
    console.log(data);
}

document.addEventListener('DOMContentLoaded', getSiswa);
