import { AppBar, Toolbar, Typography } from "@mui/material";

type HeaderProps = {
  title: string;
};

const Header = ({ title }: HeaderProps) => (
  <AppBar position="static" color="transparent">
    <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Daily Quran
      </Typography>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        {title}
      </Typography>
    </Toolbar>
  </AppBar>
);

export default Header;
