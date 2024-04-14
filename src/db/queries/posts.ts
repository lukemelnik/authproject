import { Post } from "@prisma/client";
import db from "..";

type PostWithData = Post & {
  topic: { slug: string };
  user: { name: string | null };
  _count: { comments: number };
};

export function fetchPostsByTopicsSlug(slug: string): Promise<PostWithData[]> {
  return db.post.findMany({
    where: {
      topic: { slug },
    },
    include: {
      topic: { slug: true },
      user: { select: { name: true } },
      _count: { select: { comments: true } },
    },
  });
}
