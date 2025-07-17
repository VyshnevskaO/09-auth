'use client'
import Modal from "@/components/Modal/Modal";
import css from "./NotePreview.module.css"
import { useParams, useRouter } from "next/navigation";
import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";


const NotePreviewClient = () =>{
  const router = useRouter();
  const handleGoBack =()=>{
   router.back();
  }
  const { id } = useParams<{ id: string }>();
  const idNum = parseInt(id, 10);
  const { data: note, isLoading, error } = useQuery({
        queryKey: ['note', idNum],
        queryFn: () => fetchNoteById(idNum),
        refetchOnMount: false,
    
    });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !note) return <p>Something went wrong.</p>;  

  return(
    <Modal onClose={handleGoBack}>
    <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>
          <p className={css.content}>{note.content}</p>
          <p className={css.tag}>{note.tag}</p>
          <p className={css.date}>{note.createdAt}</p>
          <button className={css.backBtn} onClick={handleGoBack}>Close</button>
        </div>
     </div>
    </Modal>
  )
}

export default NotePreviewClient ;