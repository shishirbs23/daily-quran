import { Divider, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import { PlayCircleFilledSharp } from "@mui/icons-material";

import { Verse } from "../core/models/Verse";
import { AudioFile } from "../core/models/AudioData";

type VerseItemProps = {
  index: number;
  verse: Verse;
  audioFile: AudioFile | undefined;
  playFromSpecificTime: (index: number) => void;
};

const VerseItem = ({
  index,
  verse,
  audioFile,
  playFromSpecificTime,
}: VerseItemProps) => {
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
          {audioFile && (
            <Tooltip title="Play Ayah" arrow placement="top">
              <IconButton
                sx={{ padding: 0, marginTop: 1 }}
                onClick={() => playFromSpecificTime(index)}
              >
                <PlayCircleFilledSharp />
              </IconButton>
            </Tooltip>
          )}
        </Grid>
        <Grid item lg={6} className="text-right">
          {verse.words.map((word) => (
            <Typography
              key={word.id}
              variant="h4"
              className={`inline line-clamp-6 ${
                word.char_type_name === "end" && "p-2"
              }`}
            >
              {word.text_uthmani} {word.char_type_name === "end" && " - "}
            </Typography>
          ))}
        </Grid>
      </Grid>
      <Divider />
    </>
  );
};

export default VerseItem;
