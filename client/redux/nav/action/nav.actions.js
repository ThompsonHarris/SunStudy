import { NavTypes } from "../types/nav.types";
import axios from "axios";

const OC_API_KEY = "8733bf887718419abc95cc920a1f6743";

export const setLatLog = data => ({
  type: NavTypes.SET_LOG_LAT,
  payload: data
});

export const clearLatLog = () => ({
  type: NavTypes.CLEAR_LOG_LAT
});

export const setDims = data => ({
  type: NavTypes.SET_DIMS,
  payload: data
});

export const setGrid = data => ({
  type: NavTypes.SET_GRID,
  payload: data
});

export const renderGrid = data => ({
  type: NavTypes.RENDER_GRID,
  payload: data
});

export const modCordinate = data => ({
  type: NavTypes.MOD_CORD,
  payload: data
});

export const fetchLocStart = () => ({
  type: NavTypes.FETCH_LOCATION_START
});

export const fetchLocSuccess = data => ({
  type: NavTypes.FETCH_LOCATION_SUCCESS,
  payload: data
});

export const fetchLocFailure = error => ({
  type: NavTypes.FETCH_LOCATION_FAILURE,
  payload: error
});

//THUNKS

export const fetchLocStartAsync = locationStr => {
  return dispatch => {
    dispatch(fetchLocStart());
    return axios
      .get(
        `https://api.opencagedata.com/geocode/v1/json?q=${locationStr}&key=${OC_API_KEY}`
      )
      .then(data => {
        dispatch(fetchLocSuccess(data.data.results));
      })
      .catch(e => {
        dispatch(fetchLocFailure(e));
      });
  };
};
