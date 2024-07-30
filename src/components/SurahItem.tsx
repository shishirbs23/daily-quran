import Grid from "@mui/material/Grid";
import { Surah } from "../core/models/Surah";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Routes } from "../routing/routes";

type SurahItemProps = {
  surah: Surah;
};

const SurahItem = ({ surah }: SurahItemProps) => {
  const navigate = useNavigate();

  const openSurahDetails = (surahId: number) =>
    navigate(`/${Routes.SURAHS}/${surahId}`);

  return (
    <Grid item xs={2} sm={4} md={4}>
      <Box
        className="bg-slate-800 text-white rounded text-center py-4 transition cursor-pointer"
        onClick={() => openSurahDetails(surah.id)}
      >
        <Typography>
          {surah.name_simple} ({surah.name_arabic})
        </Typography>
        <Typography variant="body2">{surah.translated_name.name}</Typography>
        <Typography variant="body2">
          Total Verses {surah.verses_count}
        </Typography>
      </Box>
    </Grid>
  );
};

export default SurahItem;
