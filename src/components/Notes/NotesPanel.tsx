import { Note } from "../../types";
import AddNoteForm from "./AddNoteForm";
import NoteDetail from "./NoteDetail";


type Props = {
    notes: Note[]
}
export default function NotesPanel({notes}: Props) {

    return (
        <>
            <AddNoteForm/>
            <div className="divide-y divide-gray-200 mt-8">
                {notes.length ? (
                    <>
                        <p className="font-bold text-2xl text-slate-600">Notas:</p>
                        {notes.map( note => <NoteDetail key={note._id} note={note}/> )}
                    </>
                ) : <p className="text-gray-500 text-center pt-3">No hay notas aun</p> }
            </div>
        </>
  )
}
