import { Box, capitalize, Typography } from "@mui/material";
import { Surah } from "../../../core/models/Surah";

type SurahDataProps = {
  surah: Surah;
};

const SurahData = ({ surah }: SurahDataProps) => {
  return (
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
  );
};

export default SurahData;
