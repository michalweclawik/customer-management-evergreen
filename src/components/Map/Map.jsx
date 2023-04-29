import React from "react";
import { useEffect, useMemo, useState } from "react";
import { useLoadScript } from "@react-google-maps/api";

import "./Map.css";
import useGeoPosition from "../../hooks/useGeoPosition";
import ShowMap from "./ShowMap";

const Map = ({ address }) => {
  const [position, geoloading, geoerror] = useGeoPosition(
    process.env.REACT_APP_API_KEY,
    address
  );
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
  });
  console.log(position);
  if (!isLoaded) return <div>Loading...</div>;
  return <>{position != null && <ShowMap position={position} />}</>;
};

export default Map;
