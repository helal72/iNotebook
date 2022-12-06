//import logo from './logo.svg';
import './App.css';
import Navbar from './componants/Navbar'
import { Home } from './componants/Home'
import About from './componants/About'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Alert from './componants/Alert';
import Signin from './componants/Signin';
import Signup from './componants/Signup';
import { useState } from 'react';
import Profile from './componants/Profile';

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type)=>{
    setAlert({
      message: message,
      type: type
    })
    setTimeout(()=>{
      setAlert(null);
    },1500);
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert ={alert}/>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home showAlert = {showAlert}/>} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/profile" element={<Profile />} />
              <Route exact path="/signin" element={<Signin showAlert = {showAlert}/>} />
              <Route exact path="/signup" element={<Signup showAlert = {showAlert}/>} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
