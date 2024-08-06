export const intervalToMs = (interval: string): number => {
  switch (interval) {
    case "1min":
      return 60000;
    case "5min":
      return 300000;
    case "15min":
      return 900000;
    default:
      return 60000;
  }
};
