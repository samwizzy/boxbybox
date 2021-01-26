import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardMedia, CardContent, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const services = [
  {
    title: "Rent",
    description:
      "BBB survey hit higher, there are property applications with our features and quality properties.",
  },
  {
    title: "BBB Offers",
    description:
      "BBB survey hit higher, there are property applications with our features and quality properties.",
  },
  {
    title: "BBB IPO",
    description:
      "BBB survey hit higher, there are property applications with our features and quality properties.",
  },
  {
    title: "BBB Auctionable",
    description:
      "BBB survey hit higher, there are property applications with our features and quality properties.",
  },
];

export function Services(props) {
  const classes = useStyles(props);

  return (
    <div id="services" className="">
      <div className="lg:text-center">
        <h5 className="text-gray-400 text-sm tracking-wide mt-4 font-normal">
          Explore features
        </h5>
        <h2 className="text-gray-800 font-extrabold">Services You Need</h2>
      </div>

      <dl className="bg-white mt-10 grid grid-cols-1 gap-3 md:grid-cols-4 md:gap-x-6">
        {services.map((service, i) => (
          <div className="flex" key={i}>
            <Card className={clsx(classes.card, "flex-1")} variant="outlined">
              <CardMedia
                classes={{
                  root:
                    "h-16 w-16 border bg-indigo-900 rounded-full mx-auto mt-2",
                }}
                image=".."
                title="demo"
              />
              <CardContent className="text-center">
                <h3 className="mb-1 text-lg text-gray-800">{service.title}</h3>

                <Typography variant="subtitle2" color="textPrimary">
                  {service.description}
                </Typography>
              </CardContent>
            </Card>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default Services;
