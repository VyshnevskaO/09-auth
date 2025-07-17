"use client"

type Props  = {
    error:Error
}
export default function NoteError({error}:Props) {
    return <p className="error-message">Could not fetch note details. {error.message}</p>
  }

