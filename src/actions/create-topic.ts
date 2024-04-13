"use server";

import { z } from "zod";

const createTopicSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/^[a-z-]+$/, {
      message: "Must be lowercase letters or dashes without spaces",
    }),
  description: z.string().min(10),
});

type CreateTopicFormState = {
  errors: {
    name?: string;
    description?: string;
  };
};

export async function createTopic(
  formState: CreateTopicFormState,
  Formdata: FormData
): Promise<CreateTopicFormState> {
  const result = createTopicSchema.safeParse({
    name: Formdata.get("name"),
    description: Formdata.get("description"),
  });

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }
  return { errors: {} };
}

//revalidate the home page after creating a topic
