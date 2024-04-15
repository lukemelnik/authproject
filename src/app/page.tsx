import PostList from "@/components/posts/post-list";
import TopicCreateForm from "@/components/topics/topic-create-form";
import TopicsList from "@/components/topics/topics-list";
import { fetchTopPosts } from "@/db/queries/comments";
import { Divider } from "@nextui-org/react";

export default async function Home() {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-xl m-2">Top Posts</h1>
        <PostList fetchData={fetchTopPosts} />
      </div>
      <div className="border shadow py-3 px-2 rounded">
        <TopicCreateForm />
        <Divider className="my-2" />
        <h3 className="text-lg font-bold">Topics</h3>
        <TopicsList />
      </div>
    </div>
  );
}
