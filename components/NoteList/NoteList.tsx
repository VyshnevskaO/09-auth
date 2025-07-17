"use client"
import css from "./NoteList.module.css";
import type { Note } from "../../types/note";
import { deleteNote } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Link from "next/link";
import { useState } from "react";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const mutation = useMutation<Note, Error, number>({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notesList'] }); 
    },
    onError: () => {
      toast.error("Failed to delete note");
    },
  });

  const handleDelete = (id: number) => {
    setDeletingId(id);
    mutation.mutate(id, {
      onSettled: () => {
        setDeletingId(null);
      }
    });
  };

  

  return (
  <ul className={css.list}>{notes.map((note) => (
    <li key={note.id} className={css.listItem}>
      <h2 className={css.title}>{note.title}</h2>
      <p className={css.content}>{note.content}</p>
      <div className={css.footer}>
        <span className={css.tag}>{note.tag}</span>
        <Link  href={`/notes/${note.id}`} className={css.button}>
         View details
        </Link>
          <button className={css.button} onClick={() => handleDelete(note.id)} disabled={deletingId === note.id}>Delete</button>
      </div>
    </li>
      ))}
  </ul>
  );
}
