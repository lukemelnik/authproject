"use server";

import { auth } from "@/auth";
import db from "@/db";
import paths from "@/paths";
import { Post } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const createPostSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
});

type CreatePostFormState = {
  errors: {
    title?: string[];
    content?: string[];
    _form?: string[]; // for any errors to do with auth or db
  };
};

export async function createPost(
  slug: string,
  FormState: CreatePostFormState,
  FormData: FormData
): Promise<CreatePostFormState> {
  const result = createPostSchema.safeParse({
    title: FormData.get("title"),
    content: FormData.get("content"),
  });

  const session = await auth();

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  if (!session || !session.user) {
    return { errors: { _form: ["You must be logged in to add a post"] } };
  }

  const topic = await db.topic.findUnique({
    where: {
      slug,
    },
  });

  if (!topic) {
    return { errors: { _form: ["Topic not found"] } };
  }

  let post: Post; // have to initialize this constant here otherwise its scoped to the try/catch
  try {
    post = await db.post.create({
      // CRITICAL THAT YOU AWAIT THIS OR IT WON'T GRAB THE EXTRA INFO (ID ETC. FROM THE DB)
      data: {
        title: result.data.title,
        content: result.data.content,
        userId: session.user.id,
        topicId: topic.id,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return { errors: { _form: [error.message] } };
    } else {
      return { errors: { _form: ["Dangit Larry something went wrong at HQ"] } };
    }
  }
  revalidatePath(paths.topicShow(slug));
  redirect(paths.postShow(slug, post.id));
  return { errors: {} };
}

// revalidate the topic show page
