import { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import PostGrid from "./components/PostGrid";
import ProfileHeader from "./components/ProfileHeader";
import NavButtonEnum from "./helpers/enums/NavButtonEnum";
import PostList from "./components/PostList";
import scrollTo from "./helpers/functions/scrollTo";
import posts from "./posts.json";

function App() {
  const [selectedButton, setSelectedButton] = useState<number>(NavButtonEnum.Grid);
  const [listScrollId, setListScrollId] = useState<string | null>(null);

  const scrollToPost = (postId: string) => {
    setSelectedButton(NavButtonEnum.List);
    setListScrollId(postId);
  }

  useEffect(() => {
    if (listScrollId) {
      const postList = document.getElementById('post-list');
      const post = document.getElementById(listScrollId);

      if (!postList || !post) return;
      console.log(post.offsetTop);
      scrollTo(postList, post.offsetTop - 100, 600);
      setListScrollId(null);
    }
  }, [listScrollId]);

  const sortedPosts = posts.sort((x, y) => {return y.date_posted - x.date_posted});

  return (
    <div className="bg-[#c9cccf] h-screen flex flex-col items-center justify-between max-w-lg mx-auto">
      <header className="bg-gradient-to-b from-[#5A88AF] to-[#214E72] w-full flex flex-row justify-center py-2 items-center">
        <h1 className="text-4xl text-white font-billabong">Retrogram</h1>
      </header>
      <div className="flex flex-col w-full h-full px-3 py-3 overflow-y-scroll" id="post-list">
        <ProfileHeader postCount={posts.length} />
        <NavBar selectedButton={selectedButton} setSelectedButton={setSelectedButton} />
        {selectedButton === NavButtonEnum.Grid ? <PostGrid posts={sortedPosts} setSelectedButton={setSelectedButton} scrollToPost={scrollToPost} /> : <PostList posts={sortedPosts} />}
      </div>
      {/* <footer className="bg-gradient-to-b from-[#5A5D5B] to-[#4A4B4A] w-full flex flex-row justify-center h-16 items-center rounded-b-md text-white">I am the footer</footer> */}
    </div>
  );
}

export default App;
