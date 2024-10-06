import React, { useEffect, useState } from "react";
import appwriteService from "../apwrite/config";
import { Container, PostCard } from "../components";

interface Post {
  $id: string;
  title: string;
  content: string;
}

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    appwriteService.getPosts().then((response: any) => {
      if (response && response.documents) {
        setPosts(response.documents);
      }
    });
  }, []);
  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Login to read posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard featuredImage={""} {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Home;
