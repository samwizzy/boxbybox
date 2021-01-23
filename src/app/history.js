import { createBrowserHistory } from "history";

// You can configure your router history
const history = createBrowserHistory({});

// Get the current location.
// const location = history.location;

// Listen for changes to the current location.
history.listen((location, action) => {
  //Do your logic here and dispatch if needed
  if (location.pathname === "/logout") {
    // Do something here
    console.log("you can now call your logout action");
  }
});

export default history;
