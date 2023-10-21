const irf = new Intl.RelativeTimeFormat("es", {
  numeric: "auto",
  style: "short",
});

const DATE_UNITS = {
  day: 86400,
  hour: 3600,
  minute: 60,
};

const getTimeAgo = (dateArg: Date | string) => {
  const deltaSeconds = Math.round((Date.now() - new Date(dateArg).getTime()) / 1000);

  let timeAgo = "";
  for (const [unit, secondsInUnit] of Object.entries(DATE_UNITS)) {
    if (deltaSeconds >= secondsInUnit || unit === "minute") {
      const value = -Math.floor(deltaSeconds / secondsInUnit);
      timeAgo = irf.format(value, unit as Intl.RelativeTimeFormatUnit);
      break;
    }
  }
  return timeAgo;
};

export default getTimeAgo;
