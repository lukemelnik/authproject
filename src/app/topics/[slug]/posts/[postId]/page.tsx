/** @format */

import PostShow from "@/components/posts/post-show";
import db from "@/db";
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
    </div>
  );
}
