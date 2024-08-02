import Grid from "@mui/material/Grid";
import { Box, Typography } from "@mui/material";

// Routing
import { useNavigate } from "react-router-dom";
import { Routes } from "../../../core/routing/routes";

// Models
import { Surah } from "../../../core/models/Surah";

type SurahItemProps = {
  index: number;
  surah: Surah;
};

const SurahItem = ({ index, surah }: SurahItemProps) => {
  const navigate = useNavigate();

  const openSurahDetails = (surahId: number) =>
    navigate(`/${Routes.SURAHS}/${surahId}`);

  return (
    <Grid item xs={2} sm={4} md={4}>
      <Box
        className="bg-slate-800 text-white rounded py-4 transition cursor-pointer"
        onClick={() => openSurahDetails(surah.id)}
      >
        <Grid container spacing={2} px={2}>
          <Grid item md={2} className="flex items-center">
            <div className="flex items-center justify-center bg-zinc-100 h-8 w-8 rounded-full text-black text-sm">
              {index + 1}
            </div>
          </Grid>
          <Grid item md={6}>
            <Typography variant="body2">{surah.name_simple}</Typography>
            <Typography className="py-1" variant="body2">
              {surah.translated_name.name}
            </Typography>
          </Grid>
          <Grid item md={4}>
            <Typography variant="body2" className="pt-1 text-center">
              {surah.name_arabic}
            </Typography>
            <Typography variant="body2" className="text-center">
              {surah.verses_count} Ayahs
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

export default SurahItem;
