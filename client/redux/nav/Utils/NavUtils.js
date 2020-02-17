import { sunPos } from "../../../Utils/sunUtils";

const PI = 3.14159265358979323846;

//we have to pass in the Date and cords
export const modifyCord = (currentGrid, { x, y, sunPos }) => {
  if (currentGrid[y][x].object.blocking === false) {
    currentGrid[y][x].object.blocking = true;
    currentGrid[y][x].object.height = 1;
    currentGrid[y][x].object.shadow =
      currentGrid[y][x].object.height * (1 / Math.tan(sunPos.altitude));

    for (let i = currentGrid[y][x].object.shadow; i >= 0; i--) {
      const tempOffsetX = Math.sin((sunPos.azimuthDegree * PI) / 180) * i;
      const tempOffsetY = Math.cos((sunPos.azimuthDegree * PI) / 180) * i;
      const newshadowXCord = Math.ceil(tempOffsetX) + currentGrid[y][x].x;
      const newshadowYCord = Math.ceil(tempOffsetY) + currentGrid[y][x].y;
      if (
        currentGrid[newshadowYCord] &&
        currentGrid[newshadowYCord][newshadowXCord] &&
        sunPos.altitude > 0
      ) {
        currentGrid[newshadowYCord][newshadowXCord].inShadow = true;
      }
    }
  } else {
    currentGrid[y][x].object.height++;
    currentGrid[y][x].object.shadow =
      currentGrid[y][x].object.height * (1 / Math.tan(sunPos.altitude));
    //shadow
    for (let i = currentGrid[y][x].object.shadow; i >= 0; i--) {
      const tempOffsetX = Math.sin((sunPos.azimuthDegree * PI) / 180) * i;
      const tempOffsetY = Math.cos((sunPos.azimuthDegree * PI) / 180) * i;
      const newshadowXCord = Math.ceil(tempOffsetX) + currentGrid[y][x].x;
      const newshadowYCord = Math.ceil(tempOffsetY) + currentGrid[y][x].y;
      if (
        currentGrid[newshadowYCord] &&
        currentGrid[newshadowYCord][newshadowXCord] &&
        sunPos.altitude > 0
      ) {
        currentGrid[newshadowYCord][newshadowXCord].inShadow = true;
      }
    }
  }
  return currentGrid;
};

export const modifyOverCord = (currentGrid, { x, y, height, sunPos }) => {
  console.log(x);
  console.log(y);
  if (x && y) {
    currentGrid[y][x].object.blocking = true;
    currentGrid[y][x].object.height = height;
    currentGrid[y][x].object.shadow =
      currentGrid[y][x].object.height * (1 / Math.tan(sunPos.altitude));
    //shadow
    for (let i = currentGrid[y][x].object.shadow; i >= 0; i--) {
      const tempOffsetX = Math.sin((sunPos.azimuthDegree * PI) / 180) * i;
      const tempOffsetY = Math.cos((sunPos.azimuthDegree * PI) / 180) * i;
      const newshadowXCord = Math.ceil(tempOffsetX) + currentGrid[y][x].x;
      const newshadowYCord = Math.ceil(tempOffsetY) + currentGrid[y][x].y;
      if (
        currentGrid[newshadowYCord] &&
        currentGrid[newshadowYCord][newshadowXCord] &&
        sunPos.altitude > 0
      ) {
        currentGrid[newshadowYCord][newshadowXCord].inShadow = true;
      }
    }
  }
  return currentGrid;
};

export const renderedGrid = (currentGrid, { sunPos }) => {
  let flaggedBlocks = [];
  //reduces through the currentGrid and removes all shadowed elements
  const clearedGrid = Object.entries(currentGrid).reduce((acc, [key, val]) => {
    const tempOBJ = Object.entries(val).reduce((ack, [childKey, childVal]) => {
      if (childVal.object.blocking === true) {
        flaggedBlocks.push([childVal.x, childVal.y]);
      }
      if (childVal.inShadow === true) {
        ack[childKey] = { ...childVal, inShadow: false };
      } else {
        ack[childKey] = childVal;
      }

      return ack;
    }, {});
    acc[key] = tempOBJ;
    return acc;
  }, {});

  //Loops through all flaged objects and re-renders shadow
  for (let k = 0; k < flaggedBlocks.length; k++) {
    clearedGrid[flaggedBlocks[k][1]][flaggedBlocks[k][0]].object.shadow =
      clearedGrid[flaggedBlocks[k][1]][flaggedBlocks[k][0]].object.height *
      (1 / Math.tan(sunPos.altitude));

    for (
      let i =
        clearedGrid[flaggedBlocks[k][1]][flaggedBlocks[k][0]].object.shadow;
      i >= 0;
      i--
    ) {
      const tempOffsetX = Math.sin((sunPos.azimuthDegree * PI) / 180) * i;
      const tempOffsetY = Math.cos((sunPos.azimuthDegree * PI) / 180) * i;
      const newshadowXCord =
        Math.ceil(tempOffsetX) +
        clearedGrid[flaggedBlocks[k][1]][flaggedBlocks[k][0]].x;
      const newshadowYCord =
        Math.ceil(tempOffsetY) +
        clearedGrid[flaggedBlocks[k][1]][flaggedBlocks[k][0]].y;
      if (
        clearedGrid[newshadowYCord] &&
        clearedGrid[newshadowYCord][newshadowXCord] &&
        sunPos.altitude > 0
      ) {
        clearedGrid[newshadowYCord][newshadowXCord].inShadow = true;
      }
    }
  }
  return clearedGrid;
};
//range: {start: "2019-08", end: "2020-11"}
export const SamplesFromRange = ({ start, end }) => {
  const SampleDateArray = [];
  const startDate = start.split("-");
  const endDate = end.split("-");
  const startYear = parseInt(startDate[0]);
  const endYear = parseInt(endDate[0]);

  for (let i = startYear; i <= endYear; i++) {
    let endMonth = i != endYear ? 11 : parseInt(endDate[1]) - 1;
    let startMonth = i === startYear ? parseInt(startDate[1]) - 1 : 0;
    for (let j = startMonth; j <= endMonth; j = j > 12 ? j % 12 || 11 : j + 1) {
      let month = j + 1;
      let displayMonth = month < 10 ? "0" + month : month;
      for (let k = 1; k < 24; k++) {
        SampleDateArray.push([i, displayMonth, "15", k]);
      }
    }
  }
  return SampleDateArray;
};

export const testDate = () => {
  console.log(new Date(2020, 2, 11, 20));
};

export const renderHeatmap = (currentGrid, { start, end }, [lat, lng]) => {
  const SampleDateArray = SamplesFromRange({ start, end });
  let flaggedBlocks = [];

  //reduces through the currentGrid and removes all shadowed elements
  const clearedforHeat = Object.entries(currentGrid).reduce(
    (acc, [key, val]) => {
      const tempOBJ = Object.entries(val).reduce(
        (ack, [childKey, childVal]) => {
          if (childVal.object.blocking === true) {
            flaggedBlocks.push([childVal.x, childVal.y]);
          }
          if (childVal.inShadow === true) {
            ack[childKey] = { ...childVal, inShadow: false };
          } else {
            ack[childKey] = childVal;
          }

          return ack;
        },
        {}
      );
      acc[key] = tempOBJ;
      return acc;
    },
    {}
  );
  //Clean grid and array of cordinate objects
  for (let s = 0; s < SampleDateArray.length; s++) {
    //Calc sunPos
    const sunData = sunPos(
      new Date(
        SampleDateArray[s][0],
        SampleDateArray[s][1],
        SampleDateArray[s][2],
        SampleDateArray[s][3]
      ),
      lat,
      lng
    );

    //render Grid
    for (let k = 0; k < flaggedBlocks.length; k++) {
      clearedforHeat[flaggedBlocks[k][1]][flaggedBlocks[k][0]].object.shadow =
        clearedforHeat[flaggedBlocks[k][1]][flaggedBlocks[k][0]].object.height *
        (1 / Math.tan(sunData.altitude));

      for (
        let i =
          clearedforHeat[flaggedBlocks[k][1]][flaggedBlocks[k][0]].object
            .shadow;
        i >= 0;
        i--
      ) {
        const tempOffsetX = Math.sin((sunData.azimuthDegree * PI) / 180) * i;
        const tempOffsetY = Math.cos((sunData.azimuthDegree * PI) / 180) * i;
        const newshadowXCord =
          Math.ceil(tempOffsetX) +
          clearedforHeat[flaggedBlocks[k][1]][flaggedBlocks[k][0]].x;
        const newshadowYCord =
          Math.ceil(tempOffsetY) +
          clearedforHeat[flaggedBlocks[k][1]][flaggedBlocks[k][0]].y;
        if (
          clearedforHeat[newshadowYCord] &&
          clearedforHeat[newshadowYCord][newshadowXCord] &&
          sunData.altitude > 0
        ) {
          clearedforHeat[newshadowYCord][newshadowXCord].thermal += 1;
        }
      }
    }
  }
  let largestTotal = 0;
  Object.entries(clearedforHeat).reduce((acc, [key, val]) => {
    const tempOBJ = Object.entries(val).reduce((ack, [childKey, childVal]) => {
      if (childVal.thermal > largestTotal) {
        largestTotal = childVal.thermal;
      }
      ack[childKey] = childVal;

      return ack;
    }, {});
    acc[key] = tempOBJ;
    return acc;
  }, {});
  const thermalGridWithPercentage = Object.entries(clearedforHeat).reduce(
    (acc, [key, val]) => {
      const tempOBJ = Object.entries(val).reduce(
        (ack, [childKey, childVal]) => {
          let thermalPer = Math.ceil((childVal.thermal / largestTotal) * 100);
          ack[childKey] = { ...childVal, thermalPer: thermalPer };

          return ack;
        },
        {}
      );
      acc[key] = tempOBJ;
      return acc;
    },
    {}
  );
  return thermalGridWithPercentage;
};
