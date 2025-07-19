import Link from "next/link";
import css from "./SidebarNotes.module.css"
import { Tag } from "@/types/note";


const tags: Tag[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];


const SidebarNotes = ()=>{

    return (  
    <div className={css.menuContainer}>
      <ul className={css.menuList}>
        <li className={css.menuItem}>
          <Link href={`/notes/filter/all`} className={css.menuLink}>All Notes</Link>
        </li>
          {tags.map((tag) => (
        <li key={tag} className={css.menuItem}>
            <Link href={`/notes/filter/${tag}`} className={css.menuLink}>{tag}</Link>
        </li>
       ))}
      </ul>
   </div>

    )
}

export default SidebarNotes;