document.addEventListener('DOMContentLoaded', () => {
    const catatanForm = document.getElementById('catatanForm');
    const catatanList = document.getElementById('catatanList');
    const catatanId = document.getElementById('catatanId');
    const judul = document.getElementById('judul');
    const isi = document.getElementById('isi');

    const apiUrl = 'http://localhost:5000/catatan';

    const fetchCatatan = async () => {
        const response = await fetch(apiUrl);
        const data = await response.json();
        renderCatatan(data);
    };

    const renderCatatan = (catatan) => {
        catatanList.innerHTML = '';
        catatan.forEach(item => {
            const catatanDiv = document.createElement('div');
            catatanDiv.classList.add('catatan', 'list-group-item');
            catatanDiv.innerHTML = `
                <h3>${item.judul}</h3>
                <p>${item.isi}</p>
                <small class="text-muted">Created at: ${new Date(item.createdAt).toLocaleString()}</small>
                <br>
                <button class="btn btn-danger btn-sm" onclick="deleteCatatan(${item.id})">Hapus</button>
                <button class="btn btn-warning btn-sm" onclick="editCatatan(${item.id}, '${item.judul}', '${item.isi}')">Edit</button>
            `;
            catatanList.appendChild(catatanDiv);
        });
    };

    catatanForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = catatanId.value;
        const method = id ? 'PUT' : 'POST';
        const url = id ? `${apiUrl}/${id}` : apiUrl;
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                judul: judul.value,
                isi: isi.value
            })
        });
        if (response.ok) {
            fetchCatatan();
            catatanForm.reset();
        }
    });

    window.deleteCatatan = async (id) => {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            fetchCatatan();
        }
    };

    window.editCatatan = (id, judulValue, isiValue) => {
        catatanId.value = id;
        judul.value = judulValue;
        isi.value = isiValue;
    };

    fetchCatatan();
});
