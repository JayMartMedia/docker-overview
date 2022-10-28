import Head from 'next/head'
import { ChangeEvent, useEffect, useState } from 'react'
import DisplayDate from '../components/DisplayDate';
import { addNote, getNotes } from '../services/noteService';
import styles from '../styles/index.module.css'

export interface Note {
  _id: string;
  text: string;
  title: string;
  timestamp: number;
}

export default function index() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    (async () => {
      const notes = await getNotes();
      setNotes(notes);
    })();
  }, []);

  function addLocalNote (note: Note) {
    setNotes((oldNotes) => {
      return [note, ...oldNotes]
    });
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <CreateNote addLocalNote={addLocalNote} />
        <Notes notes={notes}/>
      </main>
    </div>
  )
}

function CreateNote({addLocalNote}: {addLocalNote: (note: Note) => void}) {
  const [title, setTitle] = useState<string>('');
  const [text, setText] = useState<string>('');

  async function onButtonClick () {
    if(text.length === 0) return;
    const createdNote = await addNote({title, text});
    addLocalNote(createdNote);
    setText('');
    setTitle('');
  }

  return (
    <div className={styles.createNote}>
      <div>Title</div>
      <input type={'text'} onChange={(e) => {setTitle(e.target.value)}}/>
      <div>Text<span className={styles.required}>*</span></div>
      <textarea onChange={(e) => {setText(e.target.value)} }/>
      <input type={'button'} onClick={onButtonClick} value={"Add Note"}/>
    </div>
  )
}

function Note({note}: {note: Note}) {
  return (
    <div className={styles.card}>
      <h3>{note.title}</h3>
      <div className={styles.timestamp}>{note.timestamp ? <DisplayDate timestamp={note.timestamp}/>: "No Timestamp"}</div>
      <div>{note.text}</div>
    </div>
  )
}

function Notes({notes}: {notes: Note[]}) {
  return (
    <div>
      {notes.map(note => {
        return <Note note={note} key={note._id}/>
      })}
    </div>
  )
}
