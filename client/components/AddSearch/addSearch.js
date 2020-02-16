import React from "react";
//styles
import "./addSearch.css";
//Redux-React
import { connect } from "react-redux";
//actions
import { fetchLocStartAsync } from "../../redux/nav/action/nav.actions";

class AddSearch extends React.Component {
  constructor() {
    super();
    this.state = {
      address: ""
    };
  }

  onChangeHandle = e => {
    e.preventDefault();
    this.setState({
      address: e.target.value
    });
  };

  onCLickHandle = e => {
    e.preventDefault();
    if (this.state.address.length === 0) {
      alert("Please enter a location");
    } else {
      this.props.fetchLocStartAsync(this.state.address);
      this.setState({
        address: ""
      });
    }
  };

  render() {
    return (
      <div>
        <form className="addressInput">
          <label className="addressInput_label">Input Location</label>
          <input
            className="addressInput_input"
            type="text"
            value={this.state.address}
            placeholder="Input desired location"
            onChange={e => this.onChangeHandle(e)}
          />
          <button
            className="addressInput_button"
            type={"submit"}
            onClick={e => {
              this.onCLickHandle(e);
            }}
          >
            SEARCH
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ nav }) => ({
  LogNLat: nav.LogNLat
});

const mapDispatchToProps = dispatch => ({
  fetchLocStartAsync: data => dispatch(fetchLocStartAsync(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddSearch);
