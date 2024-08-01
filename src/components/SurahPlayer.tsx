import { RefObject } from "react";

type SurahPlayerProps = {
  audioRef: RefObject<HTMLAudioElement>;
  audioSrc: string;
  segments: number[][];
  stopTime: number | null;
  updateWordIndex: (wordIndex: number) => void;
  resetStoptime: () => void;
};

const SurahPlayer = ({
  audioRef,
  audioSrc,
  segments,
  stopTime,
  updateWordIndex,
  resetStoptime,
}: SurahPlayerProps) => {
  const handleTimeUpdate = () => {
    let { currentTime } = audioRef.current as HTMLAudioElement;

    currentTime *= 1000;

    const wordIndex = segments.findIndex(
      (segment) => currentTime >= segment[1] && currentTime <= segment[2]
    );

    updateWordIndex(wordIndex);

    if (
      audioRef.current &&
      stopTime !== null &&
      audioRef.current.currentTime >= stopTime
    ) {
      audioRef.current.pause();
      resetStoptime();
    }
  };

  return (
    <audio
      ref={audioRef}
      controls
      src={audioSrc}
      onTimeUpdate={handleTimeUpdate}
    ></audio>
  );
};

export default SurahPlayer;
