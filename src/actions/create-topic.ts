"use server";

import { auth } from "@/auth";
import db from "@/db";
import { z } from "zod";
import { Topic } from ".prisma/client";
import { redirect } from "next/navigation";
import paths from "@/paths";

const createTopicSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/^[a-z-]+$/, {
      message: "Must be lowercase letters or dashes without spaces",
    }),
  description: z.string().min(10),
});

interface CreateTopicFormState {
  errors: {
    name?: string[];
    description?: string[];
    _form?: string[];
  };
}

export async function createTopic(
  formState: CreateTopicFormState,
  Formdata: FormData
): Promise<CreateTopicFormState> {
  const result = createTopicSchema.safeParse({
    name: Formdata.get("name"),
    description: Formdata.get("description"),
  });
  const session = await auth();

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  if (!session) {
    return { errors: { _form: ["You must be signed in to create a topic"] } };
  }

  let topic: Topic;
  try {
    topic = await db.topic.create({
      data: { slug: result.data.name, description: result.data.description },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { errors: { _form: [error.message] } };
    } else {
      return { errors: { _form: ["Uh oh, something went wrong"] } };
    }
  }
  redirect(paths.topicShow(topic.slug));
  return { errors: {} };
}
