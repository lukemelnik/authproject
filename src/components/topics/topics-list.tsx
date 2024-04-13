import db from "@/db";
import paths from "@/paths";
import { Chip, Link } from "@nextui-org/react";
import React from "react";

export default async function TopicsList() {
  const topics = await db.topic.findMany();

  return (
    <div className="flex flex-row gap-2 flex-wrap">
      {topics.map((topic) => {
        return (
          <div key={topic.id}>
            <Link href={paths.topicShow(topic.slug)}>
              <Chip color="warning" variant="shadow">
                {topic.slug}
              </Chip>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
