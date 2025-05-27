import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchWithAuth } from "../api/fetchWithAuth";
import Swal from "sweetalert2";

const BASE_URL = "http://localhost:3000/notes";

const NotesPage = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [editingNote, setEditingNote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const getAllNotes = async () => {
    try {
      setLoading(true);
      const response = await fetchWithAuth(`${BASE_URL}/notes`);
      const { data, user } = await response.json();
      setNotes(data);
      setUser(user);
    } catch (error) {
      console.error("Gagal mengambil catatan:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingNote
      ? `${BASE_URL}/editNotes/${editingNote.id}`
      : `${BASE_URL}/addNotes`;
    const method = editingNote ? "PUT" : "POST";

    try {
      const response = await fetchWithAuth(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, category, date }),
      });

      if (!response.ok) {
        throw new Error("Gagal menyimpan catatan.");
      }

      await getAllNotes();
      setTitle("");
      setDescription("");
      setCategory("");
      setDate("");
      setEditingNote(null);

      Swal.fire({
        icon: "success",
        title: editingNote ? "Catatan berhasil diperbarui!" : "Catatan berhasil ditambahkan!",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal menyimpan catatan!",
        text: error.message,
      });
    }
  };

  const handleEdit = (note) => {
    setTitle(note.title);
    setDescription(note.description);
    setCategory(note.category);
    setDate(note.date?.slice(0, 10) || "");
    setEditingNote(note);
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Yakin ingin menghapus?",
      text: "Catatan yang dihapus tidak bisa dikembalikan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (confirm.isConfirmed) {
      try {
        const response = await fetchWithAuth(`${BASE_URL}/deleteNotes/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Gagal menghapus catatan.");
        }

        await getAllNotes();
        Swal.fire({
          icon: "success",
          title: "Catatan berhasil dihapus!",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Gagal menghapus catatan!",
          text: error.message,
        });
      }
    }
  };

  const handleLogout = async () => {
    const confirm = await Swal.fire({
      title: "Keluar dari akun?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, logout",
      cancelButtonText: "Batal",
    });

    if (!confirm.isConfirmed) return;

    try {
      const response = await fetch("http://localhost:3000/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Logout gagal");
      }

      localStorage.removeItem("accessToken");

      Swal.fire({
        icon: "success",
        title: "Berhasil logout",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/login");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal logout!",
        text: error.message,
      });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
    } else {
      getAllNotes();
    }
  }, []);

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-center">Catatan Saya</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {user && (
        <div className="mb-6 text-center">
          <p className="text-lg font-medium">
            Selamat datang, <span className="font-bold">{user.name}</span>!
          </p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow p-4 mb-6 rounded-lg"
      >
        <input
          type="text"
          placeholder="Judul"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 mb-2 rounded"
          required
        />
        <textarea
          placeholder="Deskripsi"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 mb-2 rounded"
          rows={4}
          required
        ></textarea>
        <input
          type="text"
          placeholder="Kategori"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border p-2 mb-2 rounded"
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border p-2 mb-4 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          {editingNote ? "Update Catatan" : "Tambah Catatan"}
        </button>
      </form>

      {loading ? (
        <p className="text-center text-gray-500">Memuat catatan...</p>
      ) : notes.length === 0 ? (
        <p className="text-center text-gray-500">Belum ada catatan.</p>
      ) : (
        <div className="grid gap-4">
          {notes.map((note) => (
            <div
              key={note.id}
              className="bg-white shadow p-4 rounded-lg"
            >
              <h2 className="text-xl font-semibold">{note.title}</h2>
              <p className="text-gray-700 mt-1">{note.description}</p>
              <p className="text-sm text-gray-500 mt-1">
                Kategori: {note.category}
              </p>
              <p className="text-sm text-gray-500">
                Tanggal: {note.date?.slice(0, 10)}
              </p>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleEdit(note)}
                  className="bg-yellow-400 text-white py-1 px-3 rounded hover:bg-yellow-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(note.id)}
                  className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotesPage;
