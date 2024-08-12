import { PlayCircle } from "@mui/icons-material";
import { Box, Button } from "@mui/material";

type PlaySurahButtonProps = {
  getSurahAudioData: (index: number, pauseSurah: boolean) => void;
};

const PlaySurahButton = ({ getSurahAudioData }: PlaySurahButtonProps) => {
  return (
    <Box className="flex justify-center my-4">
      <Button
        sx={{ textTransform: "capitalize" }}
        variant="contained"
        startIcon={<PlayCircle />}
        disableElevation
        onClick={() => getSurahAudioData(0, false)}
      >
        Play Full Surah
      </Button>
    </Box>
  );
};

export default PlaySurahButton;
