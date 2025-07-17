import { fetchNoteById } from "@/lib/api";
import NotePreviewClient from "./NotePreview.client";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

type NotePreviewProps = {
    params: Promise<{id:string}>
};

const NotePreview = async({params}:NotePreviewProps) =>{
  const {id} = await params;
  const queryClient = new QueryClient();
  const idNum = Number(id);
  await queryClient.prefetchQuery({
    queryKey:['note', idNum],
    queryFn: ()=> fetchNoteById(idNum),
  })

  
  return(
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient/>
    </HydrationBoundary>
  )
}

export default NotePreview ;



  