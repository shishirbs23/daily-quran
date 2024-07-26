import { AppBar, Toolbar, Typography } from "@mui/material";

const Header = () => (
  <AppBar position="static" color="transparent">
    <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Daily Quran
      </Typography>
    </Toolbar>
  </AppBar>
);

export default Header;
