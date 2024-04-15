/** @format */

import CommentCreateForm from "@/components/comments/comment-create-form";
import CommentList from "@/components/comments/comment-list";
import CommentShow from "@/components/comments/comment-show";
import PostShow from "@/components/posts/post-show";
import db from "@/db";
import { fetchCommentsByPostId } from "@/db/queries/comments";
import paths from "@/paths";
import Link from "next/link";
import React from "react";

export default async function PostShowPage({
  params,
}: {
  params: { postId: string; slug: string };
}) {
  return (
    <div className="space-y-3">
      <Link
        className="underline decoration-solid"
        href={paths.topicShow(params.slug)}
      >
        {"<"} Go back to <span className="font-bold">{params.slug}</span>
      </Link>
      <PostShow postId={params.postId} />
      <CommentCreateForm postId={params.postId} startOpen={true} />
      <CommentList fetchData={() => fetchCommentsByPostId(params.postId)} />
    </div>
  );
}
