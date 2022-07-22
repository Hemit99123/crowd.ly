import React, {useState, useEffect} from 'react'
import { Button, Card} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ViewArrayIcon from '@mui/icons-material/ViewArray';
import {
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    doc,
    query,
    where,
    onSnapshot
  } from "firebase/firestore";
import {auth,db} from './Firebase/firebase'
import Modal from 'react-modal';

function Home() {
  const [shout, setShout] = useState('')
  const [modalIsOpen2, setIsOpen2] = useState(false);
  const [modalIsOpen3, setIsOpen3] = useState(false);
  const [results, setResults] = useState([])
  const [results3, setResults3] = useState([])

  const comments = results3.map((results3) => {
    return(
        <div key={results3.id} className='scroll'>
            <h3>{results3.displayName}</h3>
            <p>{results3.comment}</p>
        </div>

    )
})

const customStyles3 = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-60%',
    transform: 'translate(-50%, -50%)',
  },
};


function closeModal3() {
  setIsOpen2(true);
}
  const makeComment = async (id, uid) => {
    const comment = prompt('Your comment')
    if (shout === null){
      return;
    }
    if (comment === null){
      return;
    }
    await addDoc(collection(db, "comments"), {
      uid: auth.currentUser.uid,
      displayName: auth.currentUser.displayName,
      comment,
      postID: id
    })
    if (uid !== auth.currentUser.uid){
      await addDoc(collection(db, "notification"), {
        uid: uid,
        displayName: auth.currentUser.displayName,
        notification: `${auth.currentUser.displayName} commented ${comment}!`,
        postID: id
      })
    }

  }

  useEffect(
    () =>
      onSnapshot(collection(db, "shouts"), (snapshot) =>
        setResults(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      ),
    []
  );

  console.log(results)

  const readComment = (id) => {
    const collectionRef = collection(db, "comments");
    const q = query(collectionRef, where("postID", "==", id));

    const unsub = onSnapshot(q, (snapshot) =>
      setResults3(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))),
      setIsOpen3(true)
    );

    return unsub;
  }



const deleteShout = async (id) => {
  alert('post has been deleted sucessfully!')
  const postDoc = doc(db, "shouts", id);
  await deleteDoc(postDoc);
  //delete all comments
  const collectionRef = collection(db, "comments");
  const q = query(collectionRef, where("postID", "==", id));
  const snapshot = await getDocs(q);

  const results = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

  results.forEach(async (results) => {
    const docRef = doc(db, "comments", results.id);
    await deleteDoc(docRef);
  });
};


const shouts = results.map((results) => {
  return (
    <div key={results.id} className="div">
      <Card variant="outlined">
      <img src={results.pfp} className='img' alt="profile"/>
      <h3>{results.displayName}</h3>
      <h2>{results.shout}</h2>
      {results.uid === auth.currentUser.uid && (
        <div className='div1'>
          <Button
          onClick={() => {deleteShout(results.id)}}
          ><DeleteIcon />
          </Button>
        </div>
      )}
      <Button className='div1' onClick={() => {makeComment(results.id,results.uid)}}><ChatBubbleOutlineIcon /></Button>
      <Button className='div1' onClick={() => {readComment(results.id)}}><ViewArrayIcon /></Button>
      <Modal
        isOpen={modalIsOpen3}
        onRequestClose={closeModal3}
        style={customStyles3}
        contentLabel="Modal"
      >
      <div className="wrapper">
      {comments}
      </div>
      <br />
      <Button onClick={() => {window.location.reload()}}>Close</Button>
      </Modal>
      </Card>
    </div>
  )
})
  return (
    <div>
      {shouts}
    </div>
  )
}

export default Home
