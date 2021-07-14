import React from "react";
import { Box, Typography, Menu, MenuItem, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { BadgeAvatar } from "./index";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { logout } from "../../store/utils/thunkCreators";
import { clearOnLogout } from "../../store/index";

const useStyles = makeStyles(() => ({
  root: {
    height: 44,
    marginTop: 23,
    marginLeft: 6,
    display: "flex",
    alignItems: "center",
  },
  subContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexGrow: 1,
  },
  username: {
    letterSpacing: -0.23,
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 17,
  },
  ellipsis: {
    color: "#95A7C4",
    opacity: 0.5,
  },
}));

const CurrentUser = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout(user.id));
    dispatch(clearOnLogout());
  };

  return (
    <Box className={classes.root}>
      <BadgeAvatar photoUrl={user.photoUrl} online={true} />
      <Box className={classes.subContainer}>
        <Typography className={classes.username}>{user.username}</Typography>
        <IconButton
          aria-label="more"
          aria-controls="user-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreHorizIcon classes={{ root: classes.ellipsis }} />
        </IconButton>
        <Menu
          id="user-menu"
          anchorEl={anchorEl}
          getContentAnchorEl={null}
          keepMounted
          open={open}
          onClose={handleClose}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default CurrentUser;
