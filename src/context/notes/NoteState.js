import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const noteInitial = []
    const userInitial = []
    const [notes, setNotes] = useState(noteInitial)
    const [user, setUser] = useState(userInitial)
    //fetch all notes
    const getNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnode`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "auth-token": localStorage.getItem("token")
            }
        });
        const json = await response.json()
        setNotes(json)
    }

     //fetch all users
     const getUser = async () => {
        const response = await fetch(`${host}/api/auth/getuser`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "auth-token": localStorage.getItem("token")
            }
        });
        const json = await response.json()  
        setUser(json)
    }
    //add note
    const addNote = async (title, description, tag) => {
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json()
        setNotes(notes.concat(note))
    }
    //delete note
    const deleteNote = async (id) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                "auth-token": localStorage.getItem("token")
            },

        });
        const json = await response.json()
        console.log(json)
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }

    //edit note
    const editNote = async (id, title, description, tag) => {
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json()
        console.log(json)

        let newNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag
                break
            }

        }
        setNotes(newNotes);
    }
    return (
        <NoteContext.Provider value={{user, notes, getNotes, addNote, deleteNote, editNote, getUser }}>
            {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState