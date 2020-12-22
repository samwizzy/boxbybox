import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import {
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
} from "@material-ui/core";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
  },
  title: {
    position: "relative",
    "&::before": {
      position: "absolute",
      left: 0,
      top: 40,
      height: 0,
      width: "50px",
      content: "''",
      borderTop: `2px solid ${theme.palette.secondary.light}`,
    },
  },
}));

const footerLinks = [
  {
    column: "About us",
    links: [
      { title: "Why Choose Us" },
      { title: "Our services" },
      { title: "Contact Us" },
      { title: "Terms & conditions" },
    ],
  },
  {
    column: "Business Hours",
    links: [
      { title: "Monday — Friday | 8:00am — 10pm" },
      { title: "Saturdays | 9:00am — 11pm" },
      { title: "Sundays | 8:00am — 9pm" },
    ],
  },
  {
    column: "Contact Us",
    links: [
      { title: "3A Idowu Martins, Victoria Island Lagos" },
      { title: "Call Us ~ 081078899008" },
      { title: "E-mail ~ info@keggo.com" },
    ],
  },
];

export default function Footer(props) {
  const classes = useStyles(props);

  return (
    <footer className={clsx("container mx-auto", classes.root)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <Grid container spacing={2} className="items-start">
          <Grid item xs={12} md={4}>
            <div className="mb-4">
              <img
                className="block img h-16 mb-4"
                src="/assets/logo.svg"
                alt="logo"
              />

              <Typography variant="subtitle2" className="text-gray-200">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus
                consectetur id facilisi sodales sollicitudin malesuada proin.
                Suscipit risus ut porttitor cursus consequat iaculis habitant
                enim.
              </Typography>
            </div>

            <div>
              <Typography variant="h6" className="text-gray-200">
                Sign up for newsletter
              </Typography>
              <Typography variant="subtitle2" className="text-gray-400">
                Get latest news & update
              </Typography>

              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-3 sm:col-span-2">
                  <div className="flex rounded-md shadow-sm mt-4">
                    <input
                      type="text"
                      name="company_website"
                      id="company_website"
                      className="focus:outline-none focus:border-blue-500 flex-1 block px-2 py-1 w-full rounded-none rounded-l-md sm:text-sm border-gray-50 outline-none border-solid"
                      placeholder="www.example.com"
                    />
                    <button className="inline-flex items-center px-3 rounded-r-md border-0 cursor-pointer border-blue-500 border-solid focus:outline-none bg-blue-500 text-gray-50 text-sm">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              {footerLinks.map((item, i) => (
                <Grid item xs={12} md key={i}>
                  <div className="box-border md:h-16 md:p-4 px-4">
                    {item.column === "Contact Us" && (
                      <div className="flex items-center space-x-2">
                        <a
                          className="text-gray-400"
                          href="https://www.facebook.com/BoxByBox/"
                        >
                          <FacebookIcon fontSize="small" />
                        </a>
                        <a
                          className="text-gray-400"
                          href="https://www.twitter.com/BoxByBox/"
                        >
                          <TwitterIcon fontSize="small" />
                        </a>
                        <a
                          className="text-gray-400"
                          href="https://www.instagram.com/BoxByBox/"
                        >
                          <InstagramIcon fontSize="small" />
                        </a>
                      </div>
                    )}
                  </div>
                  <List
                    dense
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                      <ListSubheader color="inherit" id="nested-list-subheader">
                        <div className={classes.title}>{item.column}</div>
                      </ListSubheader>
                    }
                    className={classes.root}
                  >
                    {item.links.map((link, a) => (
                      <ListItem key={a}>
                        <ListItemText primary={link.title} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </div>

      <div className="bg-gray-900 p-6">
        <Typography variant="subtitle2" className="text-gray-300 text-center">
          Copyright &copy; {new Date().getFullYear()} BoxByBox. All Rights
          Reserved.
        </Typography>
      </div>
    </footer>
  );
}
