import { Divider, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import { PlayCircleFilledSharp } from "@mui/icons-material";
import { Verse } from "../core/models/Verse";

type VerseItemProps = {
  index: number;
  ayahIndex: number;
  wordIndex: number;
  verse: Verse;
  playFromSpecificTime: (index: number) => void;
};

const VerseItem = ({
  index,
  ayahIndex,
  wordIndex,
  verse,
  playFromSpecificTime,
}: VerseItemProps) => {
  const handlePlayHighlightSurah = (index: number) => {
    playFromSpecificTime(index);
  };

  return (
    <>
      <Grid
        container
        alignItems={"center"}
        justifyContent={"space-between"}
        columnSpacing={2}
        className="cursor-pointer my-10"
      >
        <Grid item lg={6}>
          <Typography>{verse.verse_key}</Typography>
          <Tooltip title="Play Ayah" arrow placement="top">
            <IconButton
              sx={{ padding: 0, marginTop: 1 }}
              onClick={() => handlePlayHighlightSurah(index)}
            >
              <PlayCircleFilledSharp />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item lg={6} sx={{ direction: "rtl" }}>
          {verse.words.map((word, idx) => (
            <Typography
              key={word.id}
              variant="h4"
              className={`inline line-clamp-6 ${
                word.char_type_name === "end" && "p-2"
              } ${index == ayahIndex && idx == wordIndex && "text-sky-400"}
                `}
            >
              {word.char_type_name === "end" && " - "} {word.text_uthmani}
            </Typography>
          ))}
        </Grid>
      </Grid>
      <Divider />
    </>
  );
};

export default VerseItem;
