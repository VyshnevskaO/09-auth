import { getServerMe } from "@/lib/api/serverApi";
import css from "./ProfilePage.module.css";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const user = await getServerMe();

  return {
    title: user.username + "- NoteHub Profile",
    description: user.username + "private profile page on NoteHub.",
    openGraph: {
      title: user.username + "- NoteHub Profile",
      description: user.username + "private profile page on NoteHub.",
      url: `https://notehub.com/profile/`,
      images: [
        {
          url: user.photoUrl
            ? user.photoUrl
            : "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "User avatar",
        },
      ],
    },
  };
}

const Profile = async () => {
  const user = await getServerMe();

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link className={css.editProfileButton} href="/profile/edit">
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={
              user.photoUrl
                ? user.photoUrl
                : "https://ac.goit.global/fullstack/react/default-avatar.jpg"
            }
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user.username ? user.username : "unnamed"}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
};

export default Profile;
