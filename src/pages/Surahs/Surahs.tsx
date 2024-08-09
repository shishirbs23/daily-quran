import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";

// Components
import SurahItem from "./components/SurahItem";

// APIs
import { SurahAPI } from "../../core/apis/SurahAPI";

// Models
import { Surah } from "../../core/models/Surah";

export default function Surahs() {
  const [surahs, setSurahs] = useState<Surah[]>([]);

  useEffect(() => {
    SurahAPI.getAllSurahs().then((surahs) => setSurahs(surahs));
  }, []);

  return (
    <Grid
      container
      spacing={{ xs: 2, md: 4 }}
      columns={{ xs: 1, sm: 8, md: 12, lg: 16 }}
    >
      {surahs.map((surah, index) => (
        <SurahItem key={index} index={index} surah={surah} />
      ))}
    </Grid>
  );
}
