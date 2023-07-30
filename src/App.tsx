import "./App.css";
import NavBar from "./components/NavBar";
import PostGrid from "./components/PostGrid";
import ProfileHeader from "./components/ProfileHeader";

function App() {
  return (
    <div className="bg-[#c9cccf] h-screen flex flex-col items-center justify-between max-w-lg mx-auto rounded-md">
      <header className="bg-gradient-to-b from-[#5A88AF] to-[#214E72] w-full flex flex-row justify-center py-2 items-center rounded-t-md">
        <h1 className="text-4xl text-white font-billabong">Retrogram</h1>
      </header>
      <div className="w-full px-3 flex flex-col h-full py-3 overflow-y-scroll">
        <ProfileHeader />
        <NavBar />
        <PostGrid />
      </div>
      {/* <footer className="bg-gradient-to-b from-[#5A5D5B] to-[#4A4B4A] w-full flex flex-row justify-center h-16 items-center rounded-b-md text-white">I am the footer</footer> */}
    </div>
  );
}

export default App;
