import React from "react";
//css
import "./DateSelector.css";
//React-Redux
import { connect } from "react-redux";
//actions
import {
  setHeatmapRange,
  renderHeatmap
} from "../../redux/nav/action/nav.actions";

class DateSelector extends React.Component {
  constructor() {
    super();
    this.state = {
      start: "",
      end: ""
    };
  }

  onChangeHandle = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onDispatchhandle = e => {
    e.preventDefault();
    this.props.setHeatmapRange(this.state);
    this.props.renderHeatmap(this.state);
  };

  render() {
    return (
      <>
        {this.props.layoutDimensions.width > 0 ? (
          <div className="daySelector">
            <form className="daySelector_form">
              <label className="daySelector_form_label">START:</label>
              <input
                className="daySelector_form_input"
                type="month"
                name="start"
                onChange={e => this.onChangeHandle(e)}
              />
              <label className="daySelector_form_label">END:</label>
              <input
                className="daySelector_form_input"
                type="month"
                name="end"
                onChange={e => this.onChangeHandle(e)}
              />
              <button
                className="daySelector_form_button"
                onClick={e => this.onDispatchhandle(e)}
              >
                Generate heatmap
              </button>
            </form>
          </div>
        ) : null}
      </>
    );
  }
}
const mapStateToProps = ({ nav }) => ({
  layoutDimensions: nav.layoutDimensions,
  LogNLat: nav.LogNLat.data,
  Grid: nav.Grid
});

const mapDispatchToState = dispatch => ({
  setHeatmapRange: data => dispatch(setHeatmapRange(data)),
  renderHeatmap: data => dispatch(renderHeatmap(data))
});

export default connect(mapStateToProps, mapDispatchToState)(DateSelector);
