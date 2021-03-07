import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { AppButton } from "../../../common/components";
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    backgroundColor: "#F08019",
    color: "#fff",
  },
  card: {
    "& .MuiCardContent-root": {
      padding: theme.spacing(2, 0),
    },
    "& .MuiCardContent-root:last-child": {
      paddingBottom: theme.spacing(5),
    },
    "& .MuiListItem-gutters": {
      paddingLeft: theme.spacing(3),
    },
  },
}));

const menus = [
  { name: "Profile", path: "" },
  { name: "Properties", path: "properties" },
  { name: "Wallet", path: "wallet" },
  { name: "Upload Property", path: "upload-property" },
  { name: "Live Bids", path: "bids" },
  { name: "Notifications", path: "notifications" },
  { name: "Logout", path: "logout" },
];

function ProfileSidebar(props) {
  const classes = useStyles(props);

  return (
    <Fragment>
      <Card>
        <CardContent>
          <div className="flex flex-col items-center space-y-4 py-4">
            <Avatar className={classes.avatar}>AJ</Avatar>
            <h3 className="font-normal text-gray-800">Akintola Jacobs</h3>
          </div>
        </CardContent>
      </Card>
      <div className="flex items-center justify-between space-x-1 my-4">
        <AppButton
          variant="contained"
          color="secondary"
          size="large"
          component={Link}
          to="/properties"
        >
          Buy a Property
        </AppButton>
        <AppButton
          variant="contained"
          color="secondary"
          size="large"
          component={Link}
          to="/properties"
        >
          Rent a Property
        </AppButton>
      </div>
      <Card className={classes.card}>
        <CardContent>
          <div>
            <List component="nav" aria-label="main profile menus">
              {menus.map((menu, i) => (
                <ListItem
                  key={i}
                  button
                  divider
                  component={Link}
                  to={`/profile/${menu.path}`}
                >
                  <ListItemText primary={menu.name} disableTypography />
                </ListItem>
              ))}
            </List>
          </div>
        </CardContent>
      </Card>
    </Fragment>
  );
}

export default ProfileSidebar;
