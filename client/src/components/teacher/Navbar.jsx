import React from "react";

import { Link, withRouter } from "react-router-dom";
import {
  Drawer,
  MenuList,
  MenuItem,
  makeStyles,
  Typography,
  IconButton
} from "@material-ui/core";

import MenuIcon from '@material-ui/icons/MenuOutlined';

const MENU_BACKGROUND = "#8ef5f0";
const MENU_ITEM_HOVER = "white";

const useStyles = makeStyles(theme => ({
  root: {
    position: "absolute",
    zIndex: "1"
  },
  drawer: {
    width: 240,
    backgroundColor: MENU_BACKGROUND
  },
  menuHeader: {
    paddingLeft: 10
  },
  menuItem: {
    "&:hover": {
      background: MENU_ITEM_HOVER
    }
  }
}));

const Navbar = props => {
  const [state, setState] = React.useState({
    displayMenu: false
  });

  const classes = useStyles();

  const prefix = "/" + props.teacherId + "/teacher";

  const menu = (
    <MenuList className={classes.menuWrapper}>
      <MenuList>
        <Typography variant="h6" className={classes.menuHeader}>
          Class
        </Typography>
        <MenuItem
          component={Link}
          to={{ pathname: prefix.concat("/class-roster") }}
        >
          Class Roster
        </MenuItem>
        <MenuItem
          component={Link}
          to={{ pathname: prefix.concat("/assignments") }}
        >
          Assignments
        </MenuItem>
        <MenuItem component={Link} to={{ pathname: prefix.concat("/grades") }}>
          Grades
        </MenuItem>
      </MenuList>

      <MenuList>
        <Typography variant="h6" className={classes.menuHeader}>
          Media
        </Typography>
        <MenuItem
          component={Link}
          to={{ pathname: prefix.concat("/announcements") }}
        >
          Announcements
        </MenuItem>
        <MenuItem
          component={Link}
          to={{ pathname: prefix.concat("/notifications") }}
        >
          Notifications
        </MenuItem>
        <MenuItem component={Link} to={{ pathname: prefix.concat("/contact") }}>
          Messages
        </MenuItem>
      </MenuList>

      <MenuList>
        <Typography variant="h6" className={classes.menuHeader}>
          Files
        </Typography>
        <MenuItem
          component={Link}
          to={{ pathname: prefix.concat("/resources") }}
        >
          Resources
        </MenuItem>
        <MenuItem
          component={Link}
          to={{ pathname: prefix.concat("/documents") }}
        >
          Documents
        </MenuItem>
      </MenuList>
    </MenuList>
  );

  const toggleMenu = open => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ displayMenu: open });
  };

  return (
    <div className={classes.root}>
      <IconButton onClick={toggleMenu(true)} style={{ marginTop: "5px"}}>
        <MenuIcon fontSize="large" />
      </IconButton>
      <Drawer
        open={state.displayMenu}
        onClose={toggleMenu(false)}
        classes={{ paper: classes.drawer }}
      >
        {menu}
      </Drawer>
    </div>
  );
};

export default withRouter(Navbar);
