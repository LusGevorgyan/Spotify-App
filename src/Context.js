import { createContext, useState } from "react";

export const MusicContext = createContext();

export const ContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [likedMusic, setLikedMusic] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [resultOffset, setResultOffset] = useState(0);
  const [message, setMessage] = useState([]);
  
  return (
    <MusicContext.Provider
      value={{
        isLoading,
        setIsLoading,
        likedMusic,
        setLikedMusic,
        resultOffset,
        setResultOffset,
        tracks,
        setTracks,
        message,
        setMessage
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};
