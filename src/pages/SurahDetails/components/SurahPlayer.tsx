import { RefObject } from "react";
import { VerseTiming } from "../../../core/models/AudioData";

type SurahPlayerProps = {
  audioRef: RefObject<HTMLAudioElement>;
  audioSrc: string;
  ayahIndex: number;
  verseTimings: VerseTiming[];
  stopTime: number | null;
  updateAyahIndex: (ayahIndex: number) => void;
  updateWordIndex: (wordIndex: number) => void;
  resetStoptime: () => void;
};

const SurahPlayer = ({
  audioRef,
  audioSrc,
  ayahIndex,
  verseTimings,
  stopTime,
  updateAyahIndex,
  updateWordIndex,
  resetStoptime,
}: SurahPlayerProps) => {
  const updateAyahIdx = (currentTime: number) => {
    const ayahIdx = verseTimings.findIndex((timing) => {
      const { segments } = timing;
      const totalSegments = segments.length;
      const startTime = segments[0][1];
      const endTime = segments[totalSegments - 1][2];
      return currentTime >= startTime && currentTime <= endTime;
    });
    ayahIdx >= 0 && updateAyahIndex(ayahIdx);
  };

  const updateWordIdx = (currentTime: number) => {
    const { segments } = verseTimings[ayahIndex];
    const wordIndex = segments.findIndex(
      (segment) => currentTime >= segment[1] && currentTime <= segment[2]
    );
    wordIndex >= 0 && updateWordIndex(wordIndex);
  };

  const handlePauseAudio = () => {
    if (
      audioRef.current &&
      stopTime !== null &&
      audioRef.current.currentTime >= stopTime
    ) {
      audioRef.current.pause();
      resetStoptime();
    }
  };

  const handleTimeUpdate = () => {
    let { currentTime } = audioRef.current as HTMLAudioElement;

    currentTime *= 1000;

    /* Finding Ayah Position to scroll */
    updateAyahIdx(currentTime);

    /* Finding Word Position to highlight */
    updateWordIdx(currentTime);

    /* Handle Audio Pause */
    handlePauseAudio();
  };

  return (
    <audio
      ref={audioRef}
      controls
      src={audioSrc}
      onTimeUpdate={handleTimeUpdate}
      onPause={() => updateWordIndex(-1)}
    ></audio>
  );
};

export default SurahPlayer;
