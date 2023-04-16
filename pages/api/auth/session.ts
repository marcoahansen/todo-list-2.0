import { getServerSession } from "next-auth/next";

import { authOptions } from "./[...nextauth]";

export async function getSession() {
  return await getServerSession(authOptions);
}
