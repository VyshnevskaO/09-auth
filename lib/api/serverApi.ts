import { cookies } from "next/headers";
import { nextServer } from "./api";
import { User } from "@/types/user";

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};

export const getServerMe = async () => {
  const cookieData = await cookies();
  const { data } = await nextServer<User>(`/users/me`, {
    headers: { Cookie: cookieData.toString() },
  });
  return data;
};
