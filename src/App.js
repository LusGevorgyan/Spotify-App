import "./App.css";
import { useContext, useEffect, useState } from "react";
import CreatePlaylist from "./components/CreatePlaylist";
import { initializePlaylist } from "./initialize";
import Navbar from "./components/Navbar";
import { MusicContext } from "./Context";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";

function App() {
  const [keyword, setKeyword] = useState("");
  const [token, setToken] = useState(null);

  const musicContext = useContext(MusicContext);
  const setIsLoading = musicContext.setIsLoading;
  const setLikedMusic = musicContext.setLikedMusic;
  const resultOffset = musicContext.resultOffset;
  const setResultOffset = musicContext.setResultOffset;
  const setTracks = musicContext.setTracks
  const setMessage = musicContext.setMessage

  const fetchMusicData = async () => {
    setTracks([]);
    window.scrollTo(0, 0);
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${keyword}&type=track&offset=${resultOffset}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch music data");
      }

      const jsonData = await response.json();

      setTracks(jsonData.tracks.items);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setResultOffset(0);
      fetchMusicData();
    }
  };

  useEffect(() => {
    initializePlaylist();

    const fetchToken = async () => {
      try {
        const response = await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: "grant_type=client_credentials&client_id=a77073181b7d48eb90003e3bb94ff88a&client_secret=68790982a0554d1a83427e061e371507",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch token");
        }

        const jsonData = await response.json();
        setToken(jsonData.access_token);
      } catch (error) {
        setMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchToken();
    setLikedMusic(JSON.parse(localStorage.getItem("likedMusic")));
  }, [setIsLoading, setLikedMusic]);

  return (
    <>
      <Navbar
        keyword={keyword}
        setKeyword={setKeyword}
        handleKeyPress={handleKeyPress}
        fetchMusicData={fetchMusicData}
      />

      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/playlist" element={<CreatePlaylist />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
