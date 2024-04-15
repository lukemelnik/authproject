/** @format */

import CommentCreateForm from "@/components/comments/comment-create-form";
import CommentList from "@/components/comments/comment-list";
import CommentShow from "@/components/comments/comment-show";
import PostShow from "@/components/posts/post-show";
import db from "@/db";
import { fetchCommentsByPostId } from "@/db/queries/comments";
import paths from "@/paths";
import Link from "next/link";
import React, { Suspense } from "react";

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
      <Suspense fallback={<PostShowLoader />}>
        <PostShow postId={params.postId} />
      </Suspense>
      <CommentCreateForm postId={params.postId} startOpen={true} />
      <CommentList fetchData={() => fetchCommentsByPostId(params.postId)} />
    </div>
  );
}

function PostShowLoader() {
  return (
    <div className="p-2">
      <div className="bg-gray-500 w-20 h-10 mb-2 rounded animate-pulse"></div>
      <div className="bg-gray-500 w-full h-16 mb-2 rounded animate-pulse"></div>
    </div>
  );
}
