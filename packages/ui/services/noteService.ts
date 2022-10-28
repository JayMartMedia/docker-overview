import { Note } from "../pages";

const serverHost = process.env.SERVER_HOST ?? 'http://localhost:3001';

export async function getNotes () {
    const res = await fetch(`${serverHost}/notes`);
    return res.json();
}

export async function addNote (note: {title: string, text: string}) {
    const res = await fetch(`${serverHost}/notes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(note)
    });
    const createNote = await res.json();
    return createNote;
}