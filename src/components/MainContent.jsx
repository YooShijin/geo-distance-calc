import React from "react";
import ArcGISMap from "./ArcGISMap";
import "./MainContent.css";

const MainContent = () => {
  return (
    <main className="content">
      <section id="map" className="map-section">
        <div className="card">
          <h2>Measure Geodesic Distance on the Map</h2>
          <ArcGISMap />
        </div>
      </section>

      <section id="about" className="about-section">
        <h2>About This Tool</h2>
        <p>
          This web app helps you measure the geodesic distance between two
          points on an ArcGIS map. Simply click two points on the map to
          calculate the distance.
        </p>
      </section>
    </main>
  );
};

export default MainContent;
