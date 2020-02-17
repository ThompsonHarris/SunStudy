//utils
import SunCalc from "suncalc2";

const PI = 3.14159265358979323846;

export const sunPos = (date, lat, lng) => {
  const sunPos = SunCalc.getPosition(date, lat, lng);
  const ActualSunPositionRad = sunPos.azimuth + PI;
  const Altitude = sunPos.altitude;
  const azimuthDegree = () => {
    return ((ActualSunPositionRad + PI) * (180 / PI)) % 360;
  };
  return {
    azimuth: ActualSunPositionRad,
    altitude: Altitude,
    azimuthDegree: azimuthDegree(),
    date: date
  };
};
