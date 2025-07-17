'use client'
import css from "./NoteForm.module.css"
import { useId } from "react";
// import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewNote, NewNoteData } from "@/lib/api"; 
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Tag } from "@/types/note";
import { useNoteDraftStore } from "@/lib/store/noteStore";


const tags: Tag[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

export default function NoteForm() {
    const queryClient = useQueryClient();
    const fieldId = useId();
    const router = useRouter();

    const {draft, setDraft, clearDraft} = useNoteDraftStore();

    const handleChange = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) => {
      setDraft({
        ...draft,[event.target.name]:event.target.value,
      });
    }

  
  
    const {mutate} = useMutation({
      mutationFn: createNewNote,
      onSuccess: () => {
        clearDraft();
        toast.success("Note created successfully");
        queryClient.invalidateQueries({ queryKey: ['notesList'] });
        router.push('/notes/filter/all')
      },
      onError: () => {
        toast.error("Something went wrong");
      }
    });

    const handleSubmit=(formData:FormData)=>{
      const values = Object.fromEntries(formData) as NewNoteData;
      mutate(values);
    }

    const handleCancel=()=>{
      router.push('/notes/filter/all')
    }
      

    return (
      <form action={handleSubmit} className={css.form}>
        <div className={css.formGroup}>
           <label htmlFor={`${fieldId}-title`}>Title</label>
           <input name="title" id={`${fieldId}-title`} className={css.input} defaultValue={draft?.title} onChange={handleChange}/>
        </div>
        <div className={css.formGroup}>
           <label htmlFor={`${fieldId}-content`}>Content</label>
           <textarea name="content" id={`${fieldId}-content`} rows={8} className={css.textarea} defaultValue={draft?.content} onChange={handleChange}/>
        </div>
        <div className={css.formGroup}>
      <label htmlFor={`${fieldId}-tag`}>Category</label>
           <select name="tag" id={`${fieldId}-tag`} className={css.select} defaultValue={draft?.tag} onChange={handleChange}>
               {tags.map((tag) => (<option key={tag} value={tag}>{tag}</option>))}
           </select>
        </div>
        <div className={css.actions}>
           <button type="submit">Create Note</button>
           <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>


    )
}