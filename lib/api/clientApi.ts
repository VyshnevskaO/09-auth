import { User } from "@/types/user";
import type { Note } from "../../types/note";
import { nextServer } from "./api";

interface FetchNotesProps {
  page: number;
  query?: string;
  tag?: string;
  cookies?: string;
}

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface NewNoteData {
  title: string;
  content?: string;
  tag: string;
}

export interface AuthRequest {
  email: string;
  password: string;
}

type CheckSessionRequest = {
  success: boolean;
};

export type UpdateUserRequest = {
  username: string;
};

export const fetchNotes = async ({
  page,
  query,
  tag,
  cookies,
}: FetchNotesProps): Promise<FetchNotesResponse> => {
  const params = new URLSearchParams();

  params.append("page", `${page}`);
  params.append("perPage", "12");

  if (query) {
    params.append("search", query);
  }

  if (tag && tag !== "All") {
    params.append("tag", tag);
  }

  const res = await nextServer.get<FetchNotesResponse>(
    `/notes?${params.toString()}`,
    {
      headers: cookies ? { Cookie: cookies } : undefined,
    }
  );

  return res.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const res = await nextServer.delete<Note>(`/notes/${id}`);
  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await nextServer.get<Note>(`/notes/${id}`);
  return res.data;
};

export const createNewNote = async (data: NewNoteData): Promise<Note> => {
  const res = await nextServer.post<Note>(`/notes/`, data);
  return res.data;
};

export const register = async (payload: AuthRequest) => {
  const { data } = await nextServer.post<User>("/auth/register", payload);
  return data;
};

export const login = async (payload: AuthRequest) => {
  const { data } = await nextServer.post<User>("/auth/login", payload);
  return data;
};

export const checkSession = async () => {
  const { data } = await nextServer.get<CheckSessionRequest>("/auth/session");
  return data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};

export const updateMe = async (payload: UpdateUserRequest) => {
  const res = await nextServer.patch<User>("/users/me", payload);
  return res.data;
};
