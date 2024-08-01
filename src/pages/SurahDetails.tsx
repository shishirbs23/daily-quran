import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { SurahAPI } from "../core/apis/SurahAPI";
import { Box, capitalize, Typography } from "@mui/material";
import { Surah } from "../core/models/Surah";
import { SurahInfo } from "../core/models/SurahInfo";
import { VerseAPI } from "../core/apis/VerseAPI";
import { VerseData } from "../core/models/VerseData";
import { Pagination } from "../core/models/Pagination";
import { Verse } from "../core/models/Verse";
import VerseItem from "../components/VerseItem";
import { ReciterAPI } from "../core/apis/ReciterAPI";
import { AudioData, AudioFile } from "../core/models/AudioData";
import SurahPlayer from "../components/SurahPlayer";

const SurahDetails = () => {
  const [surah, setSurah] = useState<Surah>();
  const [surahInfo, setSurahInfo] = useState<SurahInfo>();
  const [verses, setVerses] = useState<Verse[]>();
  const [pagination, setPagination] = useState<Pagination>();
  const [audioFile, setAudioFile] = useState<AudioFile>();
  const [audioSrc, setAudioSrc] = useState<string>("");
  const [stopTime, setStopTime] = useState<number | null>(null);
  const [ayahIndex, setAyahIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState<number>(0);

  const { surahId } = useParams();

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
  }, []);

  const playFromSpecificTime = (index: number) => {
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
        setStopTime(toTime / 1000);
      }, 0);
    }
  };

  const updateWordIndex = (wordIndex: number) => setWordIndex(wordIndex);

  const resetStoptime = () => setStopTime(0);

  return (
    <Box className="text-slate-700">
      <Box className="text-center">
        <Typography sx={{ fontWeight: 700, fontSize: 20 }}>
          {surah?.name_simple} ({surah?.name_arabic})
        </Typography>
        <Typography className="py-1 text-xs">
          {surah?.translated_name.name}
        </Typography>
        <Typography>Total Verses: {surah?.verses_count}</Typography>
        <Typography className="pt-1 text-lg">
          Revelation Place: {capitalize(surah?.revelation_place ?? "")}
        </Typography>
      </Box>
      <Box className="m-auto mt-20 w-10/12">
        {verses?.map((verse, index) => (
          <VerseItem
            key={verse.id}
            index={index}
            ayahIndex={ayahIndex}
            wordIndex={wordIndex}
            verse={verse}
            playFromSpecificTime={playFromSpecificTime}
          />
        ))}
      </Box>
      {/*  <div
        className="pt-6"
        dangerouslySetInnerHTML={{ __html: surahInfo?.text ?? "" }}
      ></div> */}
      {ayahIndex != null && (
        <SurahPlayer
          audioRef={audioRef}
          audioSrc={audioSrc}
          segments={audioFile?.verse_timings[ayahIndex].segments ?? []}
          stopTime={stopTime}
          updateWordIndex={updateWordIndex}
          resetStoptime={resetStoptime}
        />
      )}
    </Box>
  );
};

export default SurahDetails;
