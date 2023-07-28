import "./App.css";
import ProfileHeader from "./components/ProfileHeader";

function App() {
  return (
    <div className="bg-[#c9cccf] h-screen flex flex-col items-center justify-between max-w-lg mx-auto rounded-md">
      <header className="bg-[#305f87] w-full flex flex-row justify-center h-16 items-center rounded-t-md">
        <h1 className="text-3xl text-white">RETROGRAM</h1>
      </header>
      <div className="feed w-full px-3">
        <ProfileHeader />
      </div>
      <footer className="bg-[#41474c] w-full flex flex-row justify-center h-16 items-center rounded-b-md text-white">I am the footer</footer>
    </div>
  );
}

export default App;
