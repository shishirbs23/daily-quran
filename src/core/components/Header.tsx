import { AppBar, Toolbar, Typography } from "@mui/material";

type HeaderProps = {
  title: string;
};

const Header = ({ title }: HeaderProps) => (
  <AppBar position="static" color="transparent">
    <Toolbar>
      <Typography
        variant="h6"
        component="div"
        className="text-slate-700 text-center w-full"
      >
        {title}
      </Typography>
    </Toolbar>
  </AppBar>
);

export default Header;
