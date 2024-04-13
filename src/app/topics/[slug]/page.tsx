/** @format */

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

  return <div>{topic.slug}</div>;
}
