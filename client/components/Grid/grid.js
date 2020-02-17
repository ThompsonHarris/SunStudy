import React from "react";
//styles
import "./Grid.css";
//React-Redux
import { connect } from "react-redux";
//actions
import {
  modCordinate,
  modOverCordinate
} from "../../redux/nav/action/nav.actions";

class Grid extends React.Component {
  constructor() {
    super();
    this.state = {
      mouseDown: false,
      selectedHeight: 0
    };
  }
  colorVal = value => {
    switch (true) {
      case value > 80:
        return "violet";
      case value > 80:
        return "darkpurple";
      case value > 70:
        return "mediumpurple";
      case value > 60:
        return "lightpurple";
      case value > 50:
        return "redpurple";
      case value > 40:
        return "darkred";
      case value > 30:
        return "mediumred";
      case value > 20:
        return "lightred";
      case value > 20:
        return "orangered";
      case value > 15:
        return "yelloworange";
      case value > 10:
        return "yellow";
      case value > 6:
        return "yellowgreen";
      case value < 5:
        return "lightgreen";
    }
  };

  onMouseDown = (e, height) => {
    this.setState({
      mouseDown: true,
      selectedHeight: height
    });
    console.log(this.state);
  };

  onMouseOver = e => {
    if (this.state.mouseDown === true) {
      this.props.modOverCordinate({
        x: event.target.getAttribute("x"),
        y: event.target.getAttribute("y"),
        height: this.state.selectedHeight,
        sunPos: this.props.sunPos
      });
    }
  };

  onMouseUp = e => {
    this.setState({
      mouseDown: false,
      selectedHeight: 0
    });
    console.log(this.state);
  };

  render() {
    return (
      <>
        {Object.entries(this.props.gridData)
          .reverse()
          .map(([key, value]) => {
            return (
              <div className="GridRow">
                {Object.entries(value).map(([key, val]) => {
                  return (
                    <div
                      className={`GridUnit 
                      ${val.object.blocking ? "GridBlock" : ""} 
                      ${
                        val.thermal > 0 && val.object.blocking === false
                          ? val.thermalPer > 0
                            ? `${this.colorVal(val.thermalPer)}`
                            : ""
                          : val.inShadow && val.object.blocking === false
                          ? "GridShadow"
                          : ""
                      }
                      ${this.props.sunPos.altitude < 0 ? "GridNight" : ""}
                    `}
                      x={val.x}
                      y={val.y}
                      onClick={e => {
                        this.props.modCordinate({
                          x: val.x,
                          y: val.y,
                          sunPos: this.props.sunPos
                        });
                        this.forceUpdate();
                      }}
                      onMouseDown={e => {
                        this.onMouseDown(e, val.object.height);
                        //console.log(event.target.getAttribute("x"));
                      }}
                      onMouseOver={e => {
                        this.onMouseOver(e);
                        //console.log(event.target.getAttribute("x"));
                      }}
                      onMouseUp={e => {
                        this.onMouseUp(e);
                        //console.log(event.target.getAttribute("x"));
                      }}
                    >
                      <span>
                        {val.object.blocking ? val.object.height : ""}'
                      </span>
                    </div>
                  );
                })}
              </div>
            );
          })}
      </>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  modCordinate: data => dispatch(modCordinate(data)),
  modOverCordinate: data => dispatch(modOverCordinate(data))
});

const mapStateToProps = ({ nav }) => ({
  Grid: nav.Grid,
  sunPos: nav.LogNLat.sunPos
});

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
