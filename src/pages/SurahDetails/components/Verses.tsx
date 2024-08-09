import { Box } from "@mui/material";
import VerseItem from "./VerseItem";
import { Verse } from "../../../core/models/Verse";
import { RefObject } from "react";

type VersesProp = {
  verses: Verse[];
  verseRefs: RefObject<HTMLDivElement[]>;
  ayahIndex: number;
  wordIndex: number;
  playFromSpecificTime: (index: number, pauseSurah: boolean) => void;
};

const Verses = ({
  verses,
  verseRefs,
  ayahIndex,
  wordIndex,
  playFromSpecificTime,
}: VersesProp) => {
  return (
    <Box className="m-auto mt-20 w-10/12">
      {verses?.map((verse, index) => (
        <div
          key={verse.id}
          ref={(el) => {
            if (verseRefs.current) {
              verseRefs.current[index] = el as HTMLDivElement;
            }
          }}
        >
          <VerseItem
            index={index}
            ayahIndex={ayahIndex}
            wordIndex={wordIndex}
            verse={verse}
            playFromSpecificTime={playFromSpecificTime}
          />
        </div>
      ))}
    </Box>
  );
};

export default Verses;
