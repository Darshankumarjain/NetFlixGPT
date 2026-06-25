import useMovieTreser from "../hooks/useMovieTreser";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const VideoBackground = ({ movieId, onNoVideo }) => {
  const treserVideo = useSelector((store) => store.movies?.treserVideo);

  useMovieTreser(movieId);

  useEffect(() => {
    if (treserVideo === null) {
      onNoVideo?.(); // ← call AFTER render, not during
    }
  }, [treserVideo]);

  if (!treserVideo?.key) return null;

  return (
    <div className="w-screen">
      <iframe
        className="w-screen aspect-video"
        src={`https://www.youtube.com/embed/${treserVideo.key}?autoplay=1&mute=1&loop=1&playlist=${treserVideo.key}`}
        title="YouTube video player"
        allow="autoplay"
      ></iframe>
    </div>
  );
};

export default VideoBackground;
