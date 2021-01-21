class EventEmitter {
  constructor() {
    this.events = {};
  }

  _getEventListByName(eventName) {
    if (typeof this.events[eventName] === "undefined") {
      this.events[eventName] = new Set();
    }
    return this.events[eventName];
  }

  on(eventName, fn) {
    this._getEventListByName(eventName).add(fn);
  }

  once(eventName, fn) {
    const self = this;

    const onceFn = function (...args) {
      self.removeListener(eventName, onceFn);
      fn.apply(self, args);
    };
    this.on(eventName, onceFn);
  }

  emit(eventName, ...args) {
    this._getEventListByName(eventName).forEach(
      function (fn) {
        fn.apply(this, args);
      }.bind(this)
    );
  }

  removeListener(eventName, fn) {
    this._getEventListByName(eventName).delete(fn);
  }
}

class BoxUtils {
  static compare(x, y) {
    if (x.title < y.title) return -1;
    if (x.title > y.title) return 1;
    return 0;
  }

  static formatCurrency = (value, code = "NGN", locale = "en-NG") => {
    if (!code) code = "NGN";
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: code,
    }).format(Number(value));
  };

  static toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
    });
  }

  static setRoutes(config) {
    let routes = [...config.routes];

    if (config.auth) {
      routes = routes.map((route) => {
        let auth = config.auth ? [...config.auth] : null;
        auth = route.auth ? [...auth, ...route.auth] : auth;
        return {
          ...route,
          auth,
        };
      });
    }

    return [...routes];
  }

  static generateRoutesFromConfigs(configs) {
    let allRoutes = [];
    configs.forEach((config) => {
      // allRoutes = [...allRoutes, ...config.routes];
      allRoutes = [...allRoutes, ...this.setRoutes(config)];
    });
    return allRoutes;
  }

  static hasPermission(authArr, userRole) {
    /**
     * If auth array is not defined
     * Pass and allow
     */
    if (authArr === null || authArr === undefined) {
      // console.info("auth is null || undefined:", authArr);
      return true;
    } else if (authArr.length === 0) {
      /**
       * if auth array is empty means,
       * allow only user role is guest (null or empty[])
       */
      // console.info("auth is empty[]:", authArr);
      return !userRole || userRole.length === 0;
    } else {
      /**
       * Check if user has grants
       */
      // console.info("auth arr:", authArr);
      /*
        Check if user role is array,
        */
      if (userRole && Array.isArray(userRole)) {
        return authArr.some((r) => userRole.indexOf(r) >= 0);
      }

      /*
        Check if user role is string,
        */
      return authArr.includes(userRole);
    }
  }

  static EventEmitter = EventEmitter;
}

export default BoxUtils;
