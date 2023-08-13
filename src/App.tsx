import { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import PostGrid from "./components/PostGrid";
import ProfileHeader from "./components/ProfileHeader";
import NavButtonEnum from "./helpers/enums/NavButtonEnum";
import PostList from "./components/PostList";
import posts from "./posts.json";
import React from "react";
import { FixedSizeList } from "react-window";

function App() {
  const [selectedButton, setSelectedButton] = useState<number>(
    NavButtonEnum.Grid
  );
  const [listScrollIdx, setListScrollIdx] = useState<number | null>(null);

  const listRef: React.LegacyRef<FixedSizeList<any>> | undefined = React.createRef();

  const scrollToPost = (postIdx: number) => {
    setSelectedButton(NavButtonEnum.List);
    setListScrollIdx(postIdx);
  };

  useEffect(() => {
    
    if (listRef && listRef.current && listScrollIdx) {
      listRef?.current?.scrollToItem(listScrollIdx, "start");
    }
  }, [listRef, listScrollIdx]);

  const sortedPosts = posts.sort((x, y) => {
    return y.date_posted - x.date_posted;
  });

  return (
    <div className="bg-[#c9cccf] h-screen flex flex-col items-center justify-between max-w-[420px] mx-auto">
      <header className="bg-gradient-to-b from-[#5A88AF] to-[#214E72] w-full flex flex-row justify-center py-2 items-center">
        <h1 className="text-4xl text-white font-billabong">Retrogram</h1>
      </header>
      <div
        className="flex flex-col w-full h-full px-3 py-3 overflow-y-auto"
        id="post-list"
      >
        {selectedButton === NavButtonEnum.Grid && (
          <ProfileHeader postCount={posts.length} />
        )}
        <NavBar
          selectedButton={selectedButton}
          setSelectedButton={setSelectedButton}
        />
        {selectedButton === NavButtonEnum.Grid ? (
          <PostGrid
            posts={sortedPosts}
            setSelectedButton={setSelectedButton}
            scrollToPost={scrollToPost}
          />
        ) : (
          <PostList posts={sortedPosts} listRef={listRef} />
        )}
      </div>
      {/* <footer className="bg-gradient-to-b from-[#5A5D5B] to-[#4A4B4A] w-full flex flex-row justify-center h-16 items-center rounded-b-md text-white">I am the footer</footer> */}
    </div>
  );
}

export default App;
