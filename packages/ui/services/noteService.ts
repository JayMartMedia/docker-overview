const serverHost = process.env.SERVER_HOST ?? 'http://localhost:3001';

export async function getNotes () {
    const res = await fetch(`${serverHost}/notes`);
    return res.json();
}