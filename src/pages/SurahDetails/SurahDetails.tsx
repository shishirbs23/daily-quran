import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

// Components
import SurahData from "./components/SurahData";
import PlaySurahButton from "./components/PlaySurahButton";
import Verses from "./components/Verses";
import SurahPlayer from "./components/SurahPlayer";
import SurahDataInfo from "./components/SurahDataInfo";

// Models
import { AudioData, AudioFile } from "../../core/models/AudioData";
import { Surah } from "../../core/models/Surah";
import { SurahInfo } from "../../core/models/SurahInfo";
import { VerseData } from "../../core/models/VerseData";
import { Pagination } from "../../core/models/Pagination";
import { Verse } from "../../core/models/Verse";

// APIs
import { SurahAPI } from "../../core/apis/SurahAPI";
import { VerseAPI } from "../../core/apis/VerseAPI";
import { ReciterAPI } from "../../core/apis/ReciterAPI";

const SurahDetails = () => {
  const [surah, setSurah] = useState<Surah>();
  const [surahInfo, setSurahInfo] = useState<SurahInfo>();
  const [verses, setVerses] = useState<Verse[]>();
  const [pagination, setPagination] = useState<Pagination>();
  const [audioFile, setAudioFile] = useState<AudioFile>();
  const [audioSrc, setAudioSrc] = useState<string>("");
  const [stopTime, setStopTime] = useState<number | null>(null);
  const [ayahIndex, setAyahIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState<number>(-1);

  const { surahId } = useParams();

  const verseRefs = useRef<HTMLDivElement[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (surahId) {
      SurahAPI.getSurah(+surahId).then((surah) => setSurah(surah));
      SurahAPI.getSurahInfo(+surahId).then((surahInfo) =>
        setSurahInfo(surahInfo)
      );
      VerseAPI.getBySurah(+surahId).then((verseData: VerseData) => {
        const { verses, pagination } = verseData;
        setVerses(verses);
        setPagination(pagination);
      });
      ReciterAPI.getAllReciters().then((res) => console.log(res));
      ReciterAPI.getSurahAudioData(+surahId, 7).then((audioData: AudioData) => {
        audioData.audio_files[0]?.verse_timings.map((timing) => {
          timing.segments = timing.segments.filter(
            (segment) => segment.length === 3
          );
          return timing;
        });
        setAudioFile(audioData.audio_files[0]);
      });
    }
  }, [surahId]);

  const playFromSpecificTime = (index: number, pauseSurah: boolean) => {
    setAyahIndex(index);

    const totalSegments: number =
      audioFile?.verse_timings[index].segments.length ?? 0;

    let fromTime = audioFile?.verse_timings[index].segments[0][1];
    fromTime = fromTime === 0 ? 1 : fromTime;

    const toTime =
      audioFile?.verse_timings[index].segments[totalSegments - 1][2];

    if (audioRef.current && fromTime && toTime) {
      !audioSrc && setAudioSrc(audioFile?.audio_url);

      audioRef.current.currentTime = fromTime / 1000;

      setTimeout(() => {
        audioRef.current && audioRef.current.play();

        if (pauseSurah) {
          setStopTime(toTime / 1000);
        }
      }, 0);
    }
  };

  const scrollToTop = (index: number) => {
    verseRefs.current[index] &&
      (verseRefs.current[index] as HTMLDivElement).scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  const updateAyahIndex = (ayahIndex: number) => {
    setAyahIndex(ayahIndex);
    scrollToTop(ayahIndex);
  };

  const updateWordIndex = (wordIndex: number) => setWordIndex(wordIndex);

  const resetStoptime = () => setStopTime(null);

  return (
    <Box className="text-slate-700">
      {surah && <SurahData surah={surah} />}

      <PlaySurahButton playFromSpecificTime={playFromSpecificTime} />

      <Verses
        verses={verses || []}
        verseRefs={verseRefs}
        ayahIndex={ayahIndex}
        wordIndex={wordIndex}
        playFromSpecificTime={playFromSpecificTime}
      />

      {surahInfo && <SurahDataInfo surahInfo={surahInfo} />}

      {ayahIndex != null && (
        <SurahPlayer
          audioRef={audioRef}
          audioSrc={audioSrc}
          ayahIndex={ayahIndex}
          verseTimings={audioFile?.verse_timings ?? []}
          stopTime={stopTime}
          updateAyahIndex={updateAyahIndex}
          updateWordIndex={updateWordIndex}
          resetStoptime={resetStoptime}
        />
      )}
    </Box>
  );
};

export default SurahDetails;
