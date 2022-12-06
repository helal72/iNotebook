import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../context/notes/NoteContext';
import Noteitem from './Noteitem';
import { useNavigate } from 'react-router-dom'
import iamges from '../images/logo.png'

const Profile = (props) => {
  let history = useNavigate()
  const {showAlert} = props
  const context = useContext(NoteContext);
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
  //const [user, setUser] = useState("")
  const ref = useRef(null)
  const refClose = useRef(null)
  const { user,notes, getNotes, editNote,getUser } = context

  useEffect( () => {
    if(localStorage.getItem("token")){
       getNotes()
    }
    else{
      history("/signin");
    } 
    getUser()
    //eslint-disable-next-line
  }, [])

  const updateNote = (currentNote) => {
    ref.current.click()
    setNote({id:currentNote._id, etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag})
    
  }
 
  const handleClic = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag)
    refClose.current.click()
    props.showAlert("Edited Successfully","success")
  }
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  return (
    <>
    <div className='container emp-profile'>
      <form method=''>
        <div className='row'>
          <div className='col-md-4'>
            <img className="img-thumbnail ms-5" src={iamges} alt="helal"/>
          </div>
          <div className='col-md-6'> 
              <div className='profile-head mt-3'>
                <h4>Name: {user.name}</h4>
                <h4>Email: {user.email}</h4>
                <h4>About me-  </h4>
              </div>
          </div>
          <div className='col-md-2'>
            <input type="submit" className='btn btn-light' name='btnAddMore' value="Edit Profile" />
          </div>
        </div>

      </form>
    </div>
      <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className='my-3'>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="text" className="form-control" onChange={onChange} value={note.etitle} minLength={5} required id="etitle" name="etitle" aria-describedby="emailHelp" />

                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input type="text" className="form-control" onChange={onChange} value={note.edescription} minLength={5} required id="edescription" name="edescription" />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input type="text" className="form-control" onChange={onChange} value={note.etag} id="etag" name="etag" />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button"  disabled={note.etitle.length<3 || note.edescription.length<5} className="btn btn-primary" onClick={handleClic}>Update Note</button>
            </div>
          </div>
        </div>
      </div>

      <div className=" container row my-3">
        <h2>Notes</h2>
        <div className="container">
          {notes.length===0 && "No notes to display"}
        </div>
        {notes.map((note) => {
          return <Noteitem key={note._id} showAlert = {showAlert} updateNote={updateNote} note={note} />
        })}
      </div>
    </>
  )
}

export default Profile


