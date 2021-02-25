import React from "react";
import Slider from "react-slick";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
    padding: theme.spacing(4),
    color: "#333",
    background: "#f5f5f5",
  },
  slider: {
    "& .slick-slide img": {
      border: "5px solid #fff",
      display: "block",
      margin: "auto",
      width: "350px",
    },
    "& .slick-slide .image": {
      padding: "10px",
    },
    "& .slick-slide img.slick-loading": {
      border: 0,
    },
    "& .slick-thumb": {
      bottom: "-45px",
    },
    "& .slick-thumb li": {
      width: "60px",
      height: "45px",
    },
    "& .slick-thumb li img": {
      filter: "grayscale(100%)",
    },
    "& .slick-thumb li.slick-active img": {
      filter: "grayscale(0%)",
    },
    "& button::before": {
      color: theme.palette.primary.main,
    },
  },
}));

export default function Thumbnail({ images }) {
  const classes = useStyles();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  if (!images) {
    return (
      <div>
        <p>No images are available</p>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <Slider {...settings} className={classes.slider}>
        {images.map((image, i) => (
          <div key={i}>
            <img src={image.imageUrl} alt="" />
          </div>
        ))}
      </Slider>
    </div>
  );
}
