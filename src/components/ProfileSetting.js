import React, { useRef } from "react";
import styled from "styled-components";
import image from "../media/image/login_logo.png";
import ImageSetting from "./ImageSetting";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";

const ProfileSetting = () => {
  const inputRef = useRef();
  const selectimage = () => {
    inputRef.current.click();
  };
  return (
    <Cover>
      <Image size="160" src={image} />
      {/* <Button
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        Toggle Menu Grow
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                  <MenuItem onClick={handleClose}>Logout</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper> */}
      {/* <ImageSetting/> */}
    </Cover>
  );
};

const Cover = styled.div`
  display: flex;
`;

const Image = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  border: 1px solid #2b61e1;
  box-shadow: 0px 3px 6px #00000029;
  background-position: center;
  background-image: url("${(props) => props.src}");
  background-size: cover;
  margin: 4px;
`;

export default ProfileSetting;
