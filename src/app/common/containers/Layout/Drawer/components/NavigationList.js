import React from "react";
import { Link } from "react-router-dom";
import {
  Divider,
  Icon,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";

const pages = [
  { name: "Home", path: "/", icon: "home" },
  { name: "Listing", path: "/properties", icon: "list" },
  { name: "News", path: "/news", icon: "announcement" },
  { name: "About", path: "/about", icon: "info" },
  { name: "Contact", path: "/contacts", icon: "contacts" },
  { name: "Live Bids", path: "/live-bids", icon: "business" },
];

const authPages = [
  { name: "Profile", path: "/profile", icon: "person" },
  { name: "Logout", path: "/logout", icon: "exit_to_app" },
];

export default function NavigationList(props) {
  const { user, handleOpen } = props;

  return (
    <div>
      <List>
        {pages.map((page, index) => (
          <ListItem button key={page.name} component={Link} to={page.path}>
            <ListItemIcon>
              <Icon>{page.icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={page.name} />
          </ListItem>
        ))}
      </List>
      <Divider />
      {user.role ? (
        <List>
          {authPages.map((page, index) => (
            <ListItem button key={page.name} component={Link} to={page.path}>
              <ListItemIcon>
                <Icon>{page.icon}</Icon>
              </ListItemIcon>
              <ListItemText primary={page.name} />
            </ListItem>
          ))}
        </List>
      ) : (
        <List>
          <ListItem button onClick={handleOpen}>
            <ListItemIcon>
              <Icon>lock_open</Icon>
            </ListItemIcon>
            <ListItemText primary="Login or Register" />
          </ListItem>
        </List>
      )}
    </div>
  );
}
