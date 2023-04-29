import React from "react";
import { useEffect, useState } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";

const ShowMap = ({ position }) => {
  console.log(position.lat);
  const center = { lat: position.lat, lng: position.lng };
  return (
    <div>
      {center != null && (
        <GoogleMap
          zoom={10}
          center={center}
          mapContainerClassName="map-container"
        >
          <MarkerF key="random" position={center} />
        </GoogleMap>
      )}
    </div>
  );
};

export default ShowMap;
