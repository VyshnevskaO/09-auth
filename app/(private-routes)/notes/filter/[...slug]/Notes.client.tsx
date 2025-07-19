"use client";
import css from "./NotesPage.module.css";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "use-debounce";

import { fetchNotes } from "@/lib/api/clientApi";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import type { Note } from "@/types/note";
import Link from "next/link";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}
type NotesClientProps = {
  initialData: FetchNotesResponse;
  tag?: string;
};

export default function NotesClient({ initialData, tag }: NotesClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);

  const { data } = useQuery({
    queryKey: ["notesList", currentPage, debouncedSearchQuery, tag],
    queryFn: () =>
      fetchNotes({ page: currentPage, query: debouncedSearchQuery, tag }),
    placeholderData: keepPreviousData,
    initialData:
      currentPage === 1 && debouncedSearchQuery === ""
        ? initialData
        : undefined,
  });

  const handleInputChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchQuery} onChange={handleInputChange} />
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        <Link href={`/notes/action/create`} className={css.button}>
          Create note +
        </Link>
      </header>
      {data?.notes && data.notes.length > 0 && <NoteList notes={data.notes} />}
    </div>
  );
}
