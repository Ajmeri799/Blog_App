import { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import Service from "../apwrite/config";

interface Post {
  $id: string;
  title: string;
  content: string;
  [key: string]: any;
}

interface Document {
  // $id: string;
  [key: string]: any;
}
function AllPosts(): React.ReactElement {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    Service.getPosts([]).then((response) => {
      if (response) {
        // Map the Document type to Post type
        const formattedPosts: Post[] = response.documents.map(
          (doc: Document) => ({
            $id: doc.$id,
            title: doc.title,
            content: doc.content,
            ...doc,
          })
        );
        setPosts(formattedPosts);
      }
    });
  }, []);
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
}

export default AllPosts;
