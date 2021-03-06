import React from "react";
//React-redux
import { connect } from "react-redux";
//action
import { setLatLog, renderGrid } from "../../redux/nav/action/nav.actions";
//utils
import { sunPos } from "../../Utils/sunUtils";
//css
import "./DaySlider.css";

class DaySlider extends React.Component {
  onValueChange = e => {
    const name = this.props.LogNLat.name;
    const lat = this.props.LogNLat.data[0];
    const lng = this.props.LogNLat.data[1];
    const SunData = sunPos(new Date(2020, 2, 11, e.target.value), lat, lng);
    this.props.setLatLog({
      name: name,
      data: [lat, lng],
      sunPos: SunData
    });
    this.props.renderGrid({ sunPos: SunData });
  };

  render() {
    return (
      <>
        {this.props.layoutDimensions.width > 0 ? (
          <div className="daySlider">
            <form className="daySlider_form">
              <input
                className="daySlider_form_input"
                type="range"
                name="day"
                min="1"
                max="24"
                steps="24"
                value={this.props.LogNLat.sunPos.date.getHours()}
                onChange={e => {
                  this.onValueChange(e);
                }}
              />
            </form>
          </div>
        ) : null}
      </>
    );
  }
}

const mapStateToProps = ({ nav }) => ({
  LogNLat: nav.LogNLat,
  layoutDimensions: nav.layoutDimensions
});

const mapDispatchToProps = dispatch => ({
  setLatLog: data => dispatch(setLatLog(data)),
  renderGrid: data => dispatch(renderGrid(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(DaySlider);
