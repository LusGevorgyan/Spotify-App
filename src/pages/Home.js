import { useContext } from "react";
import { MusicContext } from "../Context";
import Card from "../components/Card";

function Home() {
    const musicContext = useContext(MusicContext);
    const isLoading = musicContext.isLoading;
    const setResultOffset = musicContext.setResultOffset;
    const fetchMusicData = musicContext.fetchMusicData;
    const resultOffset = musicContext.resultOffset;
    const message = musicContext.message;
    const tracks = musicContext.tracks
    
    return (
        <div>
            <div className="row">
                <div className="col-12 py-5 text-center">
                    <h1>Welcome to LusiFy</h1>
                    <p>Search and create your favorite playlists!</p>
                </div>
            </div>

            <div className={`row ${isLoading ? "" : "d-none"}`}>
                <div className="col-12 py-5 text-center">
                    <div
                        className="spinner-border"
                        style={{ width: "3rem", height: "3rem" }}
                        role="status"
                    >
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>

            <div className="row">
                {tracks.map((element) => {
                    return <Card key={element.id} element={element} />;
                })}
            </div>
            <div className="row" hidden={tracks.length === 0}>
                <div className="col">
                    <button
                        onClick={() => {
                            setResultOffset((previous) => previous - 20);
                            fetchMusicData();
                        }}
                        className="btn btn-outline-success w-100"
                        disabled={resultOffset === 0}
                    >
                        Previous Next Page: {resultOffset / 20}
                    </button>
                </div>
                <div className="col">
                    <button
                        onClick={() => {
                            setResultOffset((previous) => previous + 20);
                            fetchMusicData();
                        }}
                        className="btn btn-outline-success w-100"
                    >
                        Next Page: {resultOffset / 20 + 2}
                    </button>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <h4 className="text-center text-danger py-2">{message}</h4>
                </div>
            </div>
        </div>
    );
}

export default Home;
