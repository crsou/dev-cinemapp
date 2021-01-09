import React from "react";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import { BsHeart, BsHeartFill } from "react-icons/bs";

interface Properties {
  favorite: boolean;
  modal: boolean;
  toggle: () => void;
}

const useStyles = makeStyles((theme) => ({
  positioning1: {
    position: "absolute",
    zIndex: 2,
    bottom: 10,
    right: 7,
  },
  positioning2: {
    position: "absolute",
    zIndex: 2,
    bottom: 0,
    right: 0,
  },
}));

export default function FavoriteButton(properties: Properties) {
  const classes = useStyles();

  return (
    <IconButton
      className={properties.modal ? classes.positioning1 : classes.positioning2}
      onClick={properties.toggle}
    >
      {properties.favorite ? (
        <BsHeartFill color="#b71a51" />
      ) : (
        <BsHeart color="#fff" />
      )}
    </IconButton>
  );
}
