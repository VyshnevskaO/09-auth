import { fetchNotes } from "@/lib/api/clientApi";
import NotesClient from "./Notes.client";
import { Metadata } from "next";
import { cookies } from "next/headers";

type NotesByCategoryProps = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({
  params,
}: NotesByCategoryProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0] === "all" ? undefined : slug[0];
  const title = tag ? `${tag} notes` : "All notes";
  const description = tag
    ? `Notes filtered by category ${tag}.`
    : "No filter applied. All notes are shown.";
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://notehub-api.goit.study/notes/filter/${tag || "all"}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub app interface preview with sticky notes and handwritten text elementsNoteHub ",
        },
      ],
    },
  };
}

const NotesByCategory = async ({ params }: NotesByCategoryProps) => {
  const cookieStore = await cookies();
  const { slug } = await params;
  const tag = slug[0] === "all" ? undefined : slug[0];

  const response = await fetchNotes({
    page: 1,
    query: "",
    tag,
    cookies: cookieStore.toString(),
  });
  return (
    <div>
      <NotesClient initialData={response} tag={tag} />
    </div>
  );
};

export default NotesByCategory;
