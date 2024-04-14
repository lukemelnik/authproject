/** @format */

import db from "@/db";
import React from "react";

export default async function PostShowPage({
  params,
}: {
  params: { postId: string; slug: string };
}) {
  const post = await db.post.findUnique({
    where: {
      id: params.postId,
    },
  });

  if (!post) {
    throw new Error("Post not found");
  }
  return (
    <div>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  );
}
