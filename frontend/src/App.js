import React, { useState, useEffect } from 'react';
import './index.css';
import { BASE_URL } from './utils';
import Login from './Login'; // Tambahkan impor Login
import Register from './Register'; // Tambahkan impor Register

function App() {
  const [catatan, setCatatan] = useState([]);
  const [judul, setJudul] = useState('');
  const [isi, setIsi] = useState('');
  const [catatanId, setCatatanId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const apiUrl = `${BASE_URL}/catatan`;

  // Pindahkan useEffect ke luar dari kondisi
  useEffect(() => {
    if (isLoggedIn) {
      fetchCatatan();
    }
  }, [isLoggedIn]);

  const fetchCatatan = async () => {
    const token = localStorage.getItem('accessToken'); // Ambil token dari localStorage
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`, // Sertakan token di header
      },
    });
  
    if (response.ok) {
      const data = await response.json();
      setCatatan(data); // Simpan data catatan ke state
    } else {
      console.error('Failed to fetch catatan:', await response.text());
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = catatanId ? 'PUT' : 'POST';
    const url = catatanId ? `${apiUrl}/${catatanId}` : apiUrl;
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ judul, isi }),
    });
    if (response.ok) {
      fetchCatatan();
      setJudul('');
      setIsi('');
      setCatatanId(null);
    }
  };

  const handleDelete = async (id) => {
    const response = await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
    if (response.ok) {
      fetchCatatan();
    }
  };

  const handleEdit = (id, judul, isi) => {
    setCatatanId(id);
    setJudul(judul);
    setIsi(isi);
  };

  if (!isLoggedIn) {
    return showRegister ? (
      <div>
        <Register />
        <p className="text-center mt-3">
          Already have an account?{' '}
          <button
            className="btn btn-link"
            onClick={() => setShowRegister(false)}
          >
            Login here
          </button>
        </p>
      </div>
    ) : (
      <div>
        <Login onLoginSuccess={() => setIsLoggedIn(true)} />
        <p className="text-center mt-3">
          Don't have an account?{' '}
          <button
            className="btn btn-link"
            onClick={() => setShowRegister(true)}
          >
            Register here
          </button>
        </p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center">Catatan Fikri Astama Putra</h1>
      <h4 className="text-center fw-bold">123220108</h4>
      <div className="row">
        <div className="col-md-6">
          <form onSubmit={handleSubmit} className="mb-4">
            <input type="hidden" value={catatanId || ''} />
            <div className="form-group">
              <label htmlFor="judul">Judul:</label>
              <input
                type="text"
                id="judul"
                className="form-control"
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="isi">Isi:</label>
              <textarea
                id="isi"
                className="form-control"
                value={isi}
                onChange={(e) => setIsi(e.target.value)}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Simpan
            </button>
          </form>
        </div>
        <div className="col-md-6">
          <div id="catatanList" className="list-group">
            {catatan.map((item) => (
              <div key={item.id} className="catatan list-group-item">
                <h3>{item.judul}</h3>
                <p>{item.isi}</p>
                <small className="text-muted">
                  Created at: {new Date(item.createdAt).toLocaleString()}
                </small>
                <br />
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(item.id)}
                >
                  Hapus
                </button>
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => handleEdit(item.id, item.judul, item.isi)}
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;