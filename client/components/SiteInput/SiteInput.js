import React from "react";
//styles
import "./SiteInput.css";
//React-Redux
import { connect } from "react-redux";
//actions
import { setDims, setGrid } from "../../redux/nav/action/nav.actions";

class SiteInput extends React.Component {
  constructor() {
    super();
    this.state = {
      width: 0,
      height: 0
    };
  }

  onHandleChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitDimesions = e => {
    e.preventDefault();
    this.props.setDims(this.state);
    this.props.setGrid(
      this.createGridArray(this.state.width, this.state.height)
    );
  };

  createGridArray = (width, height) => {
    const GridArray = {};
    for (let i = Number(height); i >= 1; i--) {
      GridArray[i] = {};
      for (let j = 1; j <= width; j++) {
        GridArray[i][j] = {
          x: j,
          y: i,
          object: { blocking: false, height: 0, shadow: 0 },
          inShadow: false
        };
      }
    }
    return GridArray;
  };

  render() {
    return (
      <>
        {this.props.LogNLat ? (
          <div className="siteInput">
            <form className="siteInput_form">
              <label className="siteInput_form_label">Width</label>
              <input
                className="siteInput_form_input"
                type="number"
                name="width"
                value={this.state.width}
                placeHolder="Enter width"
                onChange={e => this.onHandleChange(e)}
              ></input>
              <label className="siteInput_form_label">Height</label>
              <input
                className="siteInput_form_input"
                type="number"
                name="height"
                value={this.state.height}
                placeHolder="Enter height"
                onChange={e => this.onHandleChange(e)}
              ></input>
              <button
                className="siteInput_form_button"
                onClick={e => this.submitDimesions(e)}
              >
                Submit dimensions!
              </button>
            </form>
          </div>
        ) : null}
      </>
    );
  }
}

const mapStateToProps = ({ nav }) => ({
  LogNLat: nav.LogNLat.name
});

const mapDispatchToProps = dispatch => ({
  setDims: data => dispatch(setDims(data)),
  setGrid: data => dispatch(setGrid(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(SiteInput);
