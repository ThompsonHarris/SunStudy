import React from "react";
//styles
import "./Grid.css";
//React-Redux
import { connect } from "react-redux";
//actions
import { modCordinate } from "../../redux/nav/action/nav.actions";

class Grid extends React.Component {
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
                      className={`GridUnit ${
                        val.object.blocking ? "GridBlock" : ""
                      } ${val.inShadow ? "GridShadow" : ""}`}
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
                    >
                      <span>
                        {val.object.blocking ? val.object.height : ""}
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
  modCordinate: data => dispatch(modCordinate(data))
});

const mapStateToProps = ({ nav }) => ({
  Grid: nav.Grid,
  sunPos: nav.LogNLat.sunPos
});

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
