import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

// Components
import SurahData from "./components/SurahData";
import PlaySurahButton from "./components/PlaySurahButton";
import Verses from "./components/Verses";
import SurahPlayer from "./components/SurahPlayer";
import SurahDataInfo from "./components/SurahDataInfo";
import ReciterDropdown from "./components/ReciterDropdown";

// Models
import { AudioData, AudioFile } from "../../core/models/AudioData";
import { Surah } from "../../core/models/Surah";
import { SurahInfo } from "../../core/models/SurahInfo";
import { VerseData } from "../../core/models/VerseData";
import { Pagination } from "../../core/models/Pagination";
import { Verse } from "../../core/models/Verse";
import { Reciter } from "../../core/models/Reciter";

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
  const [reciters, setReciters] = useState<Reciter[]>();
  const [reciterId, setReciterId] = useState<string>();

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
      ReciterAPI.getAllReciters().then((reciters: Reciter[]) => {
        setReciters(reciters);
        setReciterId(reciters[0].id.toString());
      });
    }
  }, [surahId]);

  const getSurahAudioData = async (index: number, pauseSurah: boolean) => {
    if (surahId && reciterId) {
      await ReciterAPI.getSurahAudioData(+surahId, +reciterId).then(
        (audioData: AudioData) => {
          audioData.audio_files[0]?.verse_timings.map((timing) => {
            timing.segments = timing.segments.filter(
              (segment) => segment.length === 3
            );
            return timing;
          });
          setAudioFile(audioData.audio_files[0]);
          playFromSpecificTime(index, pauseSurah);
        }
      );
    }
  };

  const playFromSpecificTime = async (index: number, pauseSurah: boolean) => {
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

  const updateReciterId = (reciterId: string) => setReciterId(reciterId);

  const updateAyahIndex = (ayahIndex: number) => {
    setAyahIndex(ayahIndex);
    scrollToTop(ayahIndex);
  };

  const updateWordIndex = (wordIndex: number) => setWordIndex(wordIndex);

  const resetStoptime = () => setStopTime(null);

  return (
    <Box className="text-slate-700">
      {surah && <SurahData surah={surah} />}

      <PlaySurahButton getSurahAudioData={getSurahAudioData} />

      {reciters?.length && (
        <ReciterDropdown
          reciters={reciters}
          updateReciterId={updateReciterId}
        />
      )}

      <Verses
        verses={verses || []}
        verseRefs={verseRefs}
        ayahIndex={ayahIndex}
        wordIndex={wordIndex}
        getSurahAudioData={getSurahAudioData}
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
