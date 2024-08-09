import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

// Core Components
import Header from "../components/Header";
import BottomNavBar from "../components/BottomNav";

import { HeaderTitles } from "../constants/header-titles";

const Layout = () => {
  const [currentTitle, setCurrentTitle] = useState<string>(HeaderTitles.SURAHS);

  const updateTitle = (newTitle: string) => {
    setCurrentTitle(newTitle);
  };

  return (
    <>
      <Header title={currentTitle} />
      <Box sx={{ padding: 4, paddingBottom: 12 }}>
        <Outlet />
      </Box>
      <BottomNavBar updateTitle={updateTitle} />
    </>
  );
};

export default Layout;
