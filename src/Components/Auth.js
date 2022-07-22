import React, {useEffect, useState} from 'react'
import "./App.css"
import {auth, provider, db} from './Firebase/firebase'
import {onAuthStateChanged,signInWithRedirect, signOut} from 'firebase/auth'
import LoginIcon from '@mui/icons-material/Login';
import { Button, Input, Card } from '@mui/material';
import Home from './Home'
import Modal from 'react-modal';
import {
  collection,
  addDoc,
  query,
  where,
  getDocs
} from "firebase/firestore";
import moment from 'moment';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import LogoutIcon from '@mui/icons-material/Logout';

function Auth() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [shout, setShout] = useState('')
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpen2, setIsOpen2] = useState(false);
  const [results2, setResults2] = useState([])

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  
  const customStyles2 = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  
  function closeModal() {
    setIsOpen(false);
  }

  function openModal2() {
    setIsOpen2(true);
  }

  function closeModal2() {
    setIsOpen2(false);
  }


  const results_map = results2.map((results2) => {
    return(
        <div key={results2.id}>
            <p>{results2.notification}</p>
        </div>
    )
})


  const createShout = async () => {
    if (shout === null){
      return;
    } 
    alert('post has been created sucessfully')
    await addDoc(collection(db, "shouts") , {
        uid: auth.currentUser.uid,
        displayName: auth.currentUser.displayName,
        shout,
        time: moment().format('MMMM Do YYYY, h:mm a'),
        pfp: auth.currentUser.photoURL
    })
    window.location.reload()
}

const QueryData = async () => {
  const collectionRef = collection(db, "notification");
  const q = query(collectionRef, where("uid", "==", auth.currentUser.uid));
  const snapshot = await getDocs(q);  
  const results = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

  setResults2(results)
  console.log(results)
};

if (modalIsOpen2 === true){
    QueryData()
}

const signuserout = () => {
  signOut(auth).then(() => {
    alert('Signed out')
    setLoggedIn(false)
    window.location.reload()
  })
}


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true)
      }else{
        setLoggedIn(false)
      }
    })
  })

  function openModal() {
    setIsOpen(true);
  }

  
  const signIn = async () => {
    try{
      await signInWithRedirect(auth, provider)
    }catch(err){
      alert(err.message);
    }
  }

  if (loggedIn){
    return(
      <div>
      <Button onClick={openModal} className="postShout"><ModeEditIcon/></Button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Modal"
      >
      Post a new shout:
      <br />
      <Input 
      multiline 
      onChange={(event) => {
          setShout(event.target.value);
        }}>
      </Input>
      <Button onClick={createShout}>Shout!</Button>
      </Modal>
      <Button onClick={signuserout} className="postShout"><LogoutIcon /></Button>
      <Button onClick={openModal2} className='postShout'><NotificationsOutlinedIcon /></Button>
      <Modal
        isOpen={modalIsOpen2}
        onRequestClose={closeModal2}
        style={customStyles2}
        contentLabel="Modal 3a"
      >
      {results_map}
      </Modal>
      <Home />
      </div>
    )
  }
    return (
      <div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <center>
        <Card variant="outlined" className="signIn">
        <center>
          <h2>Sign into Crowd.ly</h2>
          <button className='login-with-google-btn' onClick={() => {signIn()}}>Sign in</button>
        </center>
        </Card>
        </center>
      </div>
    )
  
}

export default Auth