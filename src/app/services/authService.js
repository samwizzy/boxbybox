import axios from "axios";
import BoxUtils from "../utils/BoxUtils";

class authService extends BoxUtils.EventEmitter {
  init() {
    this.setInterceptors();
    this.handleAuthentication();
  }

  setInterceptors = () => {
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        return new Promise((resolve, reject) => {
          if (
            err.response &&
            err.response.status === 401 &&
            err.config &&
            !err.config.__isRetryRequest
          ) {
            // if you ever get an unauthorized response, logout the user
            this.emit("onAutoLogout", "Invalid access_token");
            this.setSession(null, null);
            console.log(
              "You are getting this inside Interceptor and because you got a 401 unauthorized error"
            );
          }
          throw err;
        });
      }
    );
  };

  handleAuthentication = () => {
    let token = this.getAccessToken();

    if (!token) {
      return;
    }

    if (this.isAuthTokenValid(token)) {
      this.setSession(token);
      this.emit("onAutoLogin", true);
    } else {
      this.setSession(null, null);
      this.emit("onAutoLogout", "access_token expired");
    }
  };

  createUser = (data) => {
    return new Promise((resolve, reject) => {
      axios.post("/users", data).then((response) => {
        if (response.status === 201) {
          resolve(response.data);
        } else {
          reject(response.data.message);
        }
      });
    });
  };

  customOnUploadProgress(ev) {
    // console.log("customOnUploadProgress", ev);
  }

  signInWithEmailAndPassword = (email, password, platformType = "WEB") => {
    return new Promise((resolve, reject) => {
      const data = { email, password, platformType };
      axios
        .post("/login", data, {
          onUploadProgress: this.customOnUploadProgress,
        })
        .then((response) => {
          if (response.data.token && response.status === 202) {
            this.setSession(response.data.token);
            this.getUserData(response.data.token).then((user) => {
              if (user.data) {
                resolve(user.data);
              } else {
                reject(user.error);
              }
            });
          } else {
            reject(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error.toJSON(), "catch login error");
          error.message && reject(error.toJSON());
        });
    });
  };

  signInWithToken = () => {
    return new Promise((resolve, reject) => {
      let token = this.getAccessToken();
      if (token) {
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + this.getAccessToken();
      }

      axios.get("/auth/users").then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        } else {
          reject(response.data.message);
        }
      });
    });
  };

  getUserData = (token) => {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;

    return new Promise((resolve, reject) => {
      return axios.get("/auth/users").then((response) => {
        if (response.status === 200) {
          resolve({ data: response.data });
        } else {
          reject({ error: response.data.message });
        }
      });
    });
  };

  setSession = (token) => {
    if (token) {
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    } else {
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  logout = () => {
    return new Promise((resolve, reject) => {
      // axios.post("/auth/logout").then((response) => {
      //   if (response.data) {
      //     this.setSession(null);
      //     resolve(response.data);
      //   } else {
      //     reject(response.data.error);
      //   }
      // });
      this.setSession(null);
      resolve({ message: "You have logged out successfully" });
    });
  };

  isAuthTokenValid = (token) => {
    if (!token) {
      // console.warn('access token expired');
      return false;
    } else {
      return true;
    }
  };

  getAccessToken = () => {
    return window.localStorage.getItem("token");
  };
}

const instance = new authService();

export default instance;
