import React from "react";
import { Card, CardActions, CardContent, CardMedia } from "@material-ui/core";

interface Properties {
  Title: string;
  Year: string;
  Poster: string;
  imdbID: string;
  children: React.ReactNode;
}

export default function MovieModal(properties: Properties) {
  return (
    <Card>
      <Card
        style={{
          position: "absolute",
          zIndex: 2,
          bottom: 0,
          width: "100%",
          opacity: 0.9,
        }}
      >
        <CardContent>
          {properties.Title} ({properties.Year})
        </CardContent>
        <CardActions>{properties.children}</CardActions>
      </Card>
      <CardMedia
        component="img"
        image={properties.Poster}
        title={properties.imdbID}
      ></CardMedia>
    </Card>
  );
}
