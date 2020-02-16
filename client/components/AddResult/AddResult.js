import React from "react";
//styles
import "./AddResult.css";
//Redux-React
import { connect } from "react-redux";
//action
import { setLatLog, clearLatLog } from "../../redux/nav/action/nav.actions";
//utils
import { sunPos } from "../../Utils/sunUtils";

class AddResult extends React.Component {
  //new Date(2020, 2, 11, 15) - date hardcoded in click handle below

  onCLickHandle = (title, { lat, lng }) => {
    this.props.setLatLog({
      name: title,
      data: [lat, lng],
      sunPos: sunPos(new Date(2020, 2, 11, 15), lat, lng)
    });
  };

  showResults = () => {
    if (this.props.locationData.length > 1) {
      return this.props.locationData.map(({ formatted, geometry }) => {
        return (
          <div
            className="addressResult_Option"
            onClick={e => this.onCLickHandle(formatted, geometry)}
          >
            ➡️ {formatted}
          </div>
        );
      });
    }
  };

  onClearHandle = e => {
    e.preventDefault();
    this.props.clearLatLog();
  };

  render() {
    return (
      <>
        {this.props.LogNLat.data.length > 0 ? (
          <div className="addressSelected">
            <div className="addressSelected_title">location selected</div>
            <div className="addressSelected_location">
              {this.props.LogNLat.name}
            </div>
            <button
              className="addressSelected_button"
              type={"submit"}
              onClick={e => {
                this.onClearHandle(e);
              }}
            >
              CLEAR
            </button>
          </div>
        ) : (
          <div className="addressResult">{this.showResults()}</div>
        )}
      </>
    );
  }
}

const mapStateToProps = ({ nav }) => ({
  locationData: nav.LocationData,
  LogNLat: nav.LogNLat
});

const mapDispatchToProps = dispatch => ({
  setLatLog: data => dispatch(setLatLog(data)),
  clearLatLog: () => dispatch(clearLatLog())
});

export default connect(mapStateToProps, mapDispatchToProps)(AddResult);
