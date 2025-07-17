import axios from "axios";
import type { Note } from "../types/note";

interface FetchNotesProps {
    page: number;
  query?: string;
  tag?: string;
}

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;

}

export interface NewNoteData {
  title?: string;
  content?: string;
  tag?: string;
};



const API_KEY = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN as string;

export const fetchNotes = async ({ page, query, tag }: FetchNotesProps): Promise<FetchNotesResponse> => {
  const url = new URL("https://notehub-public.goit.study/api/notes");

    url.searchParams.append("page", `${page}`);
    url.searchParams.append("perPage", "12");
   
    if (query) {
      url.searchParams.append("search", query);
    }

    if (tag) {
      url.searchParams.append("tag", `${tag}`);
    }
  
    const res = await axios.get<FetchNotesResponse>(`${url}`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });
  
    return res.data;
};
  


export const deleteNote = async (id: number): Promise<Note> => {
  const res = await axios.delete<Note>(`https://notehub-public.goit.study/api/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  return res.data;
};

export const fetchNoteById = async (id: number):Promise<Note> => {
  const res = await axios<Note>(`https://notehub-public.goit.study/api/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  return res.data;
}

export const createNewNote = async (data:NewNoteData) => {
  const res = await axios.post<Note>(`https://notehub-public.goit.study/api/notes/`,
    data,
    {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    }
    }
  );
  return res.data;
}



