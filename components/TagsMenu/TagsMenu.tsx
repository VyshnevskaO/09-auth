'use client'
import css from "./TagsMenu.module.css"
import { useState } from "react"
import Link from "next/link"
import {Tag } from "@/types/note"

const tags: Tag[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];


const TagsMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (

    <div className={css.menuContainer}>
        <button className={css.menuButton} onClick={toggle}>Notes ▾</button>
            {isOpen && (
                <ul className={css.menuList}>
                    <li className={css.menuItem}>
                        <Link href={`/notes/filter/all`} className={css.menuLink} onClick={toggle}>All Notes</Link>
                    </li>
                    {tags.map((tag) => (
                    <li key={tag} className={css.menuItem}>
                        <Link href={`/notes/filter/${tag}`} className={css.menuLink} onClick={toggle}>
                        {tag}</Link>
                   </li>
                 ))}

             </ul>
            )}
    
    </div>

)
}

export default TagsMenu;