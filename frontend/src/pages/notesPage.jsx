import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState({ title: "", description: "", category: "", date: "" });
  const [editId, setEditId] = useState(null);

  const apiUrl = "https://notes-backend-130852023885.us-central1.run.app";

  const getAllNotes = async () => {
    try {
      const response = await fetch(`${apiUrl}/notes`);
      const { data } = await response.json();
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    getAllNotes();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    editId ? updateNote() : addNote();
  };

  const addNote = async () => {
    try {
      const response = await fetch(`${apiUrl}/addNotes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        resetForm();
        getAllNotes();
        Swal.fire({
          title: "Success!",
          text: "Note has been added.",
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        throw new Error("Failed to add note");
      }
    } catch (error) {
      console.error("Error adding note:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to add note. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  
  const updateNote = async () => {
    try {
      const response = await fetch(`${apiUrl}/editNotes/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        resetForm();
        getAllNotes();
        Swal.fire({
          title: "Updated!",
          text: "Note has been updated successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        throw new Error("Failed to update note");
      }
    } catch (error) {
      console.error("Error updating note:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to update note. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  

  const handleEdit = (note) => {
    setFormData(note);
    setEditId(note.id);
  };

  const handleCancelEdit = () => {
    resetForm();
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });
  
    if (result.isConfirmed) {
      try {
        const response = await fetch(`${apiUrl}/Deletenotes/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Failed to delete note");
        fetchNotes();
        Swal.fire("Deleted!", "Your note has been deleted.", "success");
      } catch (error) {
        console.error(error.message);
      }
    }
  };
  

  const resetForm = () => {
    setFormData({ title: "", description: "", category: "", date: "" });
    setEditId(null);
  };

  return (
    <div className="min-h-screen bg-blue-800 flex items-center justify-center">
    <div className="max-w-3xl mx-auto p-6 bg-gray-200 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Notes App</h1>
      <form onSubmit={handleSubmit} className="mb-6 space-y-4 bg-white p-4 rounded-lg shadow-md">
        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required></textarea>
        <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        <div className="flex space-x-3">
          <button type="submit" className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all">{editId ? "Update Note" : "Add Note"}</button>
          {editId && (
            <button type="button" onClick={handleCancelEdit} className="w-full p-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-all">Back</button>
          )}
        </div>
      </form>
      <div className="space-y-4">
        {notes.map((note) => (
          <div key={note.id} className="p-5 border rounded-lg shadow-md bg-white">
            <h2 className="text-xl font-semibold text-gray-800">{note.title}</h2>
            <p className="text-gray-700">{note.description}</p>
            <p className="text-sm text-gray-500">Category: <span className="font-semibold text-gray-600">{note.category}</span> | Date: <span className="font-semibold text-gray-600">{new Date(note.date).toLocaleDateString("id-ID")}</span></p>
            <div className="flex space-x-3 mt-3">
              <button onClick={() => handleEdit(note)} className="p-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-all">Edit</button>
              <button onClick={() => handleDelete(note.id)} className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default NotesPage;