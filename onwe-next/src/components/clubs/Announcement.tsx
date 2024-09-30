import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import CreatePost from "./CreatePost";
import { PostsProps } from "@/types/type";
import DialogBox from "../post_component/Dialog_component/DialogBox";
import { useDispatch } from "react-redux";
import { setPost } from "@/lib/features/posts/postSlice";
import { useSignIn } from "@/hooks/useSignIn";
import { NewPost } from "./NewPost";
import PostAvatar from "../post_component/PostAvatar";
import PostImage from "../post_component/PostImage";

// const Announcement = ({ posts, club }: { posts: PostsProps[], club: string, isAdmin: boolean }) => {
const Announcement = ({ club }: { club: string }) => {
  const { getToken, getUsername } = useSignIn();
  const [createActive, setCreateActive] = useState(false);
  const [isAdmin, setisAdmin] = useState(false);
  const [posts, setPosts] = useState<PostsProps[]>([]);
  const username = getUsername();
  const postRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  useEffect(() => {
    if (posts.length > 0) {
      // Find the latest post by ID
      const latestPostId = Math.max(...posts.map(post => post.id));
      const latestPostRef = postRefs.current[latestPostId];

      if (latestPostRef) {
        latestPostRef.scrollIntoView();
      }
    }
  }, [posts]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token =getToken();
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/clubs/${club}/announcement`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "69420",
            },
          }
        );
        setPosts(response.data.posts);
        setisAdmin(response.data.isAdmin);
        
      } catch (err: any) {
        console.log(err);
        setPosts([]);
      }
    };

    fetchData();
  }, [club]);

  const dispatch = useDispatch();
  const handleClick = (post: PostsProps) => {
    dispatch(setPost(post));
  };

  const handleCreateClick = () => {
    setCreateActive(true);
  };

  const handleCloseClick = () => {
    setCreateActive(false);
  };

  return (
    <div className="flex gap-20 flex-col bg-white grow min-h-full  pt-24 pl-10 pr-10 pb-24">
    <div className="flex flex-col-reverse gap-3">
      {posts.map((post) => {
          let cnm = "";
          if (post.username === username) {
            cnm = "flex-row-reverse";
          }

          return (
            <div
              key={post.id}
              ref={(el: HTMLDivElement | null) => { postRefs.current[post.id] = el; }} // Correctly assigning ref
              className="w-full h-full"
            >
              <div className={`${cnm} flex`}>
                <div
                  onClick={() => handleClick(post)}
                  className="grow max-w-60 sm:max-w-96 max-h-full rounded-xl p-2 bg-white border shadow"
                >
                  <div className="flex items-center gap-1 mt-4 mb-1">
                    <PostAvatar imageUrl={post?.avatar} />
                    <h1 className="font-semibold m-2 text-base">
                      {post.username}
                    </h1>
                  </div>
                  <div className=" pb-2 ">
                    <PostImage
                    fill="cover"
                      images={post?.media}
                      className="w-full relative h-64 overflow-hidden"
                    />
                  </div>
                  <p className="m-2 ml-0 mt-[5px] p-2 w-[25vw] font-medium text-base rounded pl-2 whitespace-wrap break-all ">
                    {post.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      {isAdmin && (
        <div className="fixed sm:bottom-0 bottom-16 bg-white pb-4">
        <div className="bg-white">
          <NewPost tab="announcement" clubName={club} setDone={setCreateActive} />
        </div>
      </div>
      )}
      {/* {createActive && (
        <CreatePost
        category="announcement"
        clubName={club}
        onClose={handleCloseClick}
        />
      )} */}
      {/* need to keep check if isAdmin is true or not */}
      
        </div>
    </div>
  );
};

export default Announcement;
