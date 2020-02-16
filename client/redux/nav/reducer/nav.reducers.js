import { NavTypes } from "../types/nav.types";
//utils
import { modifyCord, renderedGrid } from "../Utils/NavUtils";

const INITIAL_STATE = {
  isFetching: false,
  LogNLat: {
    name: "",
    data: []
  },
  LocationData: [
    {
      formatted: ""
    }
  ],
  errorMessage: {},
  layoutDimensions: { width: 0, height: 0 },
  Grid: []
};

export const navReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NavTypes.SET_LOG_LAT:
      return {
        ...state,
        LogNLat: action.payload
      };
    case NavTypes.CLEAR_LOG_LAT:
      return {
        ...state,
        LogNLat: {
          name: "",
          data: []
        },
        LocationData: [
          {
            formatted: ""
          }
        ]
      };
    case NavTypes.SET_DIMS:
      return {
        ...state,
        layoutDimensions: action.payload
      };
    case NavTypes.SET_GRID:
      return {
        ...state,
        Grid: action.payload
      };
    case NavTypes.RENDER_GRID:
      return {
        ...state,
        Grid: renderedGrid(state.Grid, action.payload)
      };
    case NavTypes.MOD_CORD:
      return {
        ...state,
        Grid: modifyCord(state.Grid, action.payload)
      };
    case NavTypes.FETCH_LOCATION_START:
      return {
        ...state,
        isFetching: true
      };
    case NavTypes.FETCH_LOCATION_SUCCESS:
      return {
        ...state,
        isFetching: false,
        LocationData: action.payload
      };
    case NavTypes.FETCH_LOCATION_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload
      };
    default:
      return state;
  }
};
