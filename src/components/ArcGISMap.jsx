import React, { useEffect, useRef, useState } from "react";
import { loadModules } from "esri-loader";
import "./ArcGISMap.css";

const ArcGISMap = () => {
  const mapRef = useRef(null);
  const [distance, setDistance] = useState(null);
  const [view, setView] = useState(null);

  useEffect(() => {
    loadModules([
      "esri/Map",
      "esri/views/MapView",
      "esri/Graphic",
      "esri/geometry/Point",
      "esri/geometry/Polyline",
      "esri/geometry/geometryEngine",
    ])
      .then(([Map, MapView, Graphic, Point, Polyline, geometryEngine]) => {
        const map = new Map({
          basemap: "topo-vector",
        });

        const view = new MapView({
          container: mapRef.current,
          map: map,
          center: [-118.2437, 34.0522],
          zoom: 10,
        });

        setView(view);

        let point1, point2;

        view.on("click", (event) => {
          const point = new Point({
            longitude: event.mapPoint.longitude,
            latitude: event.mapPoint.latitude,
          });

          const graphic = new Graphic({
            geometry: point,
            symbol: {
              type: "simple-marker",
              color: [226, 119, 40],
              size: 8,
            },
          });

          view.graphics.add(graphic);

          if (!point1) {
            point1 = point;
          } else if (!point2) {
            point2 = point;

            const line = new Polyline({
              paths: [
                [
                  [point1.longitude, point1.latitude],
                  [point2.longitude, point2.latitude],
                ],
              ],
            });

            const lineGraphic = new Graphic({
              geometry: line,
              symbol: {
                type: "simple-line",
                color: [226, 119, 40],
                width: 2,
              },
            });

            view.graphics.add(lineGraphic);

            const geodesicDistance = geometryEngine.geodesicLength(
              line,
              "kilometers"
            );
            setDistance(geodesicDistance.toFixed(2));

            // Reset points for next measurement
            point1 = null;
            point2 = null;
          }
        });

        return () => {
          if (view) {
            view.destroy();
          }
        };
      })
      .catch((err) => console.error(err));
  }, []);

  const handleClearPoints = () => {
    if (view) {
      view.graphics.removeAll();
      setDistance(null);
    }
  };

  return (
    <div className="map-container">
      <div ref={mapRef} className="map"></div>
      <div className="controls">
        <button onClick={handleClearPoints}>Clear Points</button>
      </div>
      {distance && (
        <div className="distance-display">Distance: {distance} km</div>
      )}
    </div>
  );
};

export default ArcGISMap;
