import { Comment } from "@prisma/client";
import db from "..";
import { PostWithData } from "./posts";

export type CommentWithAuthor = Comment & {
  user: { name: string | null; image: string | null };
};
export function fetchCommentsByPostId(
  postId: string
): Promise<CommentWithAuthor[]> {
  return db.comment.findMany({
    where: {
      postId,
    },
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });
}

export function fetchTopPosts(): Promise<PostWithData[]> {
  return db.post.findMany({
    orderBy: [
      {
        comments: {
          _count: "desc",
        },
      },
    ],
    include: {
      topic: { select: { slug: true } },
      user: {
        select: {
          name: true,
          image: true,
        },
      },
      _count: { select: { comments: true } },
    },
    take: 5,
  });
}
