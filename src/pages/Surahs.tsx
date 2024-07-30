import { useEffect, useState } from "react";
import { SurahAPI } from "../core/apis/SurahAPI";
import { Surah } from "../core/models/Surah";
import Grid from "@mui/material/Grid";
import SurahItem from "../components/SurahItem";

export default function Surahs() {
  const [surahs, setSurahs] = useState<Surah[]>([]);

  useEffect(() => {
    SurahAPI.getAllSurahs().then((surahs) => setSurahs(surahs));
  }, []);

  return (
    <Grid
      sx={{ padding: 4, paddingBottom: 12 }}
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 1, sm: 8, md: 12, lg: 16 }}
    >
      {surahs.map((surah, index) => (
        <SurahItem key={index} surah={surah} />
      ))}
    </Grid>
  );
}
