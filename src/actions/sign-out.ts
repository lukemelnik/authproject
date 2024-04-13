"use server";

import * as auth from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signOut() {
  auth.signOut();
}
