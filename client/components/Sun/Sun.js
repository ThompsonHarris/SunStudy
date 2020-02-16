import React from "react";
//utils
import SunCalc from "suncalc2";
import Konva from "konva";
import { Stage, Layer, Rect, Text, Circle, Line } from "react-konva";
//css
import "./sun.css";
//React-Redux
import { connect } from "react-redux";

class Sun extends React.Component {
  //Required Variables
  pi = Math.PI;
  heightOfObject = 6.5;
  sunPos = SunCalc.getPosition(
    new Date(2020, 2, 11, 14),
    25.7742658,
    -80.1936589
  );
  //altitude = this.sunPos.altitude * (180 / this.pi);
  //ShadowDirection = this.sunPos.azimuth * (180 / this.pi);
  //ActualSunPositionDegree = (this.sunPos.azimuth + this.pi) * (180 / this.pi);
  //ShadowDegree = (this.ActualSunPositionRad + this.pi) * (180 / this.pi);
  ActualSunPositionRad = this.sunPos.azimuth + this.pi;
  shadow = this.heightOfObject * (1 / Math.tan(this.sunPos.altitude)); //in radians
  shadowPosDegree = () => {
    if ((this.ActualSunPositionRad + this.pi) * (180 / this.pi) > 360) {
      return ((this.ActualSunPositionRad + this.pi) * (180 / this.pi)) % 360;
    } else {
      return (this.ActualSunPositionRad + this.pi) * (180 / this.pi);
    }
  };
  //Shadow offset from origin point
  offsetX = Math.sin((this.shadowPosDegree() * Math.PI) / 180) * 1000;
  offsetY = Math.cos((this.shadowPosDegree() * Math.PI) / 180) * 1000;

  render() {
    // console.log("azimuth:", this.ActualSunPositionRad);
    // console.log("altitude:", this.sunPos.altitude);
    // console.log("shadow:", this.shadow);
    // console.log("offsetY:", this.offsetY);
    // console.log("offsetX:", this.offsetX);
    // console.log("offsetY:", this.offsetY);
    return (
      <Stage
        className="stage"
        width={1000}
        height={100}
        scaleY={-1}
        offsetY={100}
      >
        <Layer>
          <Line
            x="100"
            y="10"
            points={[0, 0, this.offsetX, this.offsetY]}
            stroke="red"
            strokeWidth={2}
          />
        </Layer>
      </Stage>
    );
  }
}

const mapStateToProps = ({ nav }) => ({
  LogNLat: nav.LogNLat
});

export default connect(mapStateToProps)(Sun);
