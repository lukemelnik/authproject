import db from "@/db";
import paths from "@/paths";
import { Chip, Link } from "@nextui-org/react";
import React from "react";

export default async function TopicsList() {
  const topics = await db.topic.findMany();

  return (
    <div>
      <ul>
        {topics.map((topic) => {
          return (
            <Link key={topic.id} href={paths.topicShow(topic.slug)}>
              <Chip color="warning" variant="shadow">
                {topic.slug}
              </Chip>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
