import Notes from "../model/notesModel.js";


const getAllNotes = async (req, res) => {
    try {
        const notes = await Notes.findAll();
        res.status(200).json({
            message: "Notes fetched successfully",
            data: notes
        });
    } catch (error) {
        console.log(error);
    }
}

const addNotes = async (req, res) => {
    try {
        const { title, description, category, date } = req.body;

        if (!title || !description || !category || !date) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const newNote = await Notes.create({
            title,
            description,
            category,
            date,

        });

        if (newNote) {
            res.status(201).json({
                message: "Note added successfully",
                data: newNote
            });

        }
    } catch (error) {
        res.status(500).json({
            message: "Failed to add note",
            error: error.message
        });
    }

}

const editNotes = async (req, res) => {
    try {
        const { id } = req.params;

        const { title, description, category, date } = req.body;


        const newNotes = await Notes.findByPk(id);

        if (!newNotes) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        await newNotes.update({
            title: title || newNotes.title,
            description: description || newNotes.description,
            category: category || newNotes.category,
            date: date || newNotes.date,

        })

        res.status(200).json({
            message: "Note updated successfully",
            data: newNotes
        })

    } catch (error) {
        res.status(500).json({
            message: "Failed to update note",
            error: error.message
        });
    }



}


const deleteNotes = async (req, res) => {


    try {
        const { id } = req.params;

        const note = await Notes.findByPk(id);

        if (!note) {
            return res.status(404).json({
                message: "Note not found"
            })
        }

        await note.destroy();

        res.status(200).json({
            message: "Note deleted successfully",
        })

    } catch (error) {
        res.status(500).json({
            message: "Failed to delete note",
            error: error.message
        })

    }
}

export { getAllNotes, addNotes, editNotes, deleteNotes };