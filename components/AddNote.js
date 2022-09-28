import { collection, addDoc } from "firebase/firestore"; 
// import db from '../firebase'
import db from '../lib/firebase'


//  async function addNote(){
//     try {
//         const docRef = await addDoc(collection(db, "notes"), {
//           first: "Alan",
//           middle: "Mathison",
//           last: "Turing",
//           born: 1912
//         });
//         console.log("Document written with ID: ", docRef.id);
//       } catch (e) {
//         alert('error')

//         console.error("Error adding document: ", e);
//       }
//     console.log('hello')
//     alert('error')

// }

const colRef = collection(db, 'users', 'notes', 'details')

import React, { useState } from 'react'
import axios from "axios";

const AddNote = () => {
  const [title, setTitle] = useState('')
  const [note, setNote] = useState('')

  const handleSubmit =(e) => {
    e.preventDefault();
    axios({
      method: "POST",
      url:"/send",
      data: details
    }).then((response) =>{
      if(response.data.status === 'success'){
        alert('note added')
      }else if (response.data.status === 'fail'){
        alert('note failed to add')
      }
    })

    let details = {
      title:title,
      note:note
    }
    addDoc(colRef, {
      details
    })
    .then(() =>{
      e.preventDefault();

    })
    .catch((error) => {
      alert(error.message)
    });
    console.log('details are', details)
    setTitle('')
    setNote('')
  }


  return (
    <>
    <form action="POST" onSubmit={handleSubmit}>
      <input type="text" placeholder="title"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input type="text" placeholder="What is on your mind"
        name="note"
        value={note}
        onChange={(e) => setNote(e.target.value)}

      />
      <button type="submit">Add Note</button>

    </form>
    <div className="notes">
      <h1>{title}</h1>
      <h2>{note}</h2>

      
    </div>
    </>
   
  )
}

export default AddNote