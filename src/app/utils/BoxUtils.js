class BoxUtils {
  static compare(x, y) {
    if (x.title < y.title) return -1;
    if (x.title > y.title) return 1;
    return 0;
  }

  static generateRoutesFromConfigs(configs) {
    let allRoutes = [];
    configs.forEach((config) => {
      allRoutes = [...allRoutes, ...config.routes];
    });
    return allRoutes;
  }
}

export default BoxUtils;
