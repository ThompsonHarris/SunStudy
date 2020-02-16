//we have to pass in the Date and cords
export const modifyCord = (currentGrid, { x, y, sunPos }) => {
  if (currentGrid[y][x].object.blocking === false) {
    currentGrid[y][x].object.blocking = true;
    currentGrid[y][x].object.height = 1;
    currentGrid[y][x].object.shadow =
      currentGrid[y][x].object.height * (1 / Math.tan(sunPos.altitude));

    for (let i = currentGrid[y][x].object.shadow; i >= 0; i--) {
      const tempOffsetX = Math.sin((sunPos.azimuthDegree * 3.1415) / 180) * i;
      const tempOffsetY = Math.cos((sunPos.azimuthDegree * 3.1415) / 180) * i;
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
      const tempOffsetX = Math.sin((sunPos.azimuthDegree * 3.1415) / 180) * i;
      const tempOffsetY = Math.cos((sunPos.azimuthDegree * 3.1415) / 180) * i;
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
  //reduce through the currentGrid and remove all shadowed elements (X)
  let flaggedBlocks = [];
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

  //flag all blocking cordinates and re-render their shadows based on sunPos
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
      const tempOffsetX = Math.sin((sunPos.azimuthDegree * 3.1415) / 180) * i;
      const tempOffsetY = Math.cos((sunPos.azimuthDegree * 3.1415) / 180) * i;
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
