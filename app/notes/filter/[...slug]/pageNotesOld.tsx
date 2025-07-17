import css from "./NotesPage.module.css"
import NotesClient from "./Notes.client"
import { fetchNotes } from "@/lib/api"

export default async function Home() {
    const notes = await fetchNotes({ page: 1 });

  return (
    <div className={css.app}>
      <NotesClient initialData={notes} />
    </div>
  )
}
