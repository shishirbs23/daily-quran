import { Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArchiveIcon from "@mui/icons-material/Archive";

import { Routes } from "../../routing/routes";
import { HeaderTitles } from "../constants/header-titles";

type BottomNavBarProps = {
  updateTitle: (title: string) => void;
};

const BottomNavBar = ({ updateTitle }: BottomNavBarProps) => {
  const [value, setValue] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    navigate(Routes.SURAHS);
  }, [navigate]);

  const handleBottomNavChange = (
    _event: React.SyntheticEvent<Element, Event>,
    newValue: number
  ) => {
    switch (newValue) {
      case 0: {
        navigate(Routes.SURAHS);
        updateTitle(HeaderTitles.SURAHS);
        break;
      }

      case 1: {
        navigate(Routes.JUZS);
        updateTitle(HeaderTitles.JUZS);
        break;
      }

      case 2: {
        navigate(Routes.QURAN);
        updateTitle(HeaderTitles.QURAN);
        break;
      }
    }

    setValue(newValue);
  };

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={handleBottomNavChange}
      >
        <BottomNavigationAction label="Surahs" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Juzs" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Quran" icon={<ArchiveIcon />} />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNavBar;
