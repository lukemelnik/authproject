/** @format */

import PostShow from "@/components/posts/post-show";
import db from "@/db";
import React from "react";

export default async function PostShowPage({
  params,
}: {
  params: { postId: string; slug: string };
}) {
  return <PostShow postId={params.postId} />;
}
