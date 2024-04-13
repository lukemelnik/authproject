/** @format */

import PostCreateForm from "@/components/posts/post-create-form";
import TopicCreateForm from "@/components/topics/topic-create-form";
import db from "@/db";
import React from "react";

// MUST remember to make these async when fetching data
export default async function TopicShowPage({
  params,
}: {
  params: { slug: string };
}) {
  const topic = await db.topic.findUnique({
    where: {
      slug: params.slug,
    },
  });
  if (!topic) {
    throw new Error("Topic not found!");
  }

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-2xl font-bold mb-2">{params.slug}</h1>
      </div>
      <div>
        <PostCreateForm slug={params.slug} />
      </div>
    </div>
  );
}
