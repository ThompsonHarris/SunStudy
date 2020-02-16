import React from "react";
//components
import AddSearch from "./components/AddSearch/addSearch";
import AddResult from "./components/AddResult/AddResult";
import SiteInput from "./components/SiteInput/SiteInput";
import MapLayout from "./components/MapLayout/MapLayout";
import Sun from "./components/Sun/Sun";
import DaySlider from "./components/DaySlider/DaySlider";
//css
import "./app.css";

class App extends React.Component {
  render() {
    return (
      <main>
        <div className="header">☀️ S U N S T U D Y ☀️</div>
        <AddSearch />
        <AddResult />
        <SiteInput />
        <MapLayout />
        <DaySlider />
      </main>
    );
  }
}

export default App;
