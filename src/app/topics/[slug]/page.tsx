/** @format */

import db from "@/db";
import React from "react";

// MUST remember to make these async when fetching data
export default async function TopicShowPage() {
  const topics = await db.topic.findMany();

  if (!topics) return <div>There are no topics to display</div>;

  return (
    <div>
      topics show page
      <ul>
        {topics.map((topic) => {
          return <li key={topic.id}>{topic.slug}</li>;
        })}
      </ul>
    </div>
  );
}
