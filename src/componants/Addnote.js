import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext';

const Addnote = (props) => {
    const context = useContext(NoteContext);
    const [note, setNote] = useState({title:"", description:"", tag:""})
    const {addNote } = context
    const handleClic =(e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag: ""})
        props.showAlert("Note Added Successfully","success")
    }
    const onChange =(e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
    return (
        <div className="container my-3">
            <h2>Add a Note</h2>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" onChange={onChange} value={note.title} id="title" name="title" aria-describedby="emailHelp" />
                    
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" onChange={onChange} value={note.description} id="description" name="description" />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" onChange={onChange} value={note.tag} id="tag" name="tag" />
                </div>
              
                <button type="submit" disabled={note.title.length<3 || note.description.length<5} className="btn btn-primary" onClick={handleClic}>Submit</button>
            </form>
        </div>
    )
}

export default Addnote
