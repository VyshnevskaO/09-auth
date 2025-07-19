"use client"

type Props  = {
    error:Error
}
export default function NotesError ({error}:Props) {
    return <p className="error-message">Could not fetch the list of notes. {error.message}</p>


  }
  