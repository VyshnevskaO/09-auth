import NoteForm from '@/components/NoteForm/NoteForm';
import css from './CreateNote.module.css'
import { Metadata } from 'next';

export const metadata:Metadata = {
 title:'Create New Note | NoteHub',
 description: 'Start writing your thoughts, tasks, or reminders with a new note in NoteHub.',
 openGraph:{
    title:'Create New Note | NoteHub',
    description: 'Start writing your thoughts, tasks, or reminders with a new note in NoteHub.',
    url: `https://notehub.com/notes/action/create`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: 'NoteHub app interface preview with sticky notes and handwritten text elements',
        },
      ],
      type: 'article',
 }
}

const CreateNote=()=> {


    return(
        <main className={css.main}>
          <div className={css.container}>
           <h1 className={css.title}>Create note</h1>
	         <NoteForm/>
          </div>
         </main>
 
    )
}

export default CreateNote;