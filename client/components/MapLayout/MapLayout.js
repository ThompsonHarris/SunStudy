import React from "react";
//connect
import { connect } from "react-redux";
//component
import Grid from "../Grid/grid";

class MapLayout extends React.Component {
  render() {
    return (
      <>
        {this.props.layoutDimensions.width > 0 ? (
          <Grid
            gridData={this.props.gridData}
            dimensions={this.props.layoutDimensions}
          />
        ) : null}
      </>
    );
  }
}

const mapStateToProps = ({ nav }) => ({
  layoutDimensions: nav.layoutDimensions,
  gridData: nav.Grid
});

export default connect(mapStateToProps)(MapLayout);
