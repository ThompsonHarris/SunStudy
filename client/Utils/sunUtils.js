//utils
import SunCalc from "suncalc2";

export const sunPos = (date, lat, lng) => {
  const sunPos = SunCalc.getPosition(date, lat, lng);
  const ActualSunPositionRad = sunPos.azimuth + 3.1415;
  const Altitude = sunPos.altitude;
  const azimuthDegree = () => {
    if ((ActualSunPositionRad + 3.1415) * (180 / 3.1415) > 360) {
      return ((ActualSunPositionRad + 3.1415) * (180 / 3.1415)) % 360;
    } else {
      return (ActualSunPositionRad + 3.1415) * (180 / 3.1415);
    }
  };
  return {
    azimuth: ActualSunPositionRad,
    altitude: Altitude,
    azimuthDegree: azimuthDegree()
  };
};
