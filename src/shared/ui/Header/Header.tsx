import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Routes } from "@src/shared/enums/AppRoutes";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Конвертор валют
        </Typography>
        <IconButton component={Link} to={Routes.MAIN} color="inherit">
          Главная
        </IconButton>
        <IconButton component={Link} to={Routes.ADDITIONAL} color="inherit">
          Таблица
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
