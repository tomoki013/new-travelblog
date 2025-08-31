"use client";

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import { Topology, GeometryCollection } from "topojson-specification";
import { FeatureCollection, Geometry, GeoJsonProperties } from "geojson";

interface WorldTopology extends Topology {
  objects: {
    countries: GeometryCollection;
  };
}

const WorldMap = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const drawMap = async () => {
      // このwidth/heightはviewBoxのアスペクト比と投影の計算基準として使用します
      const width = 960;
      const height = 600;

      const svg = d3
        .select(svgRef.current)
        // ↓ 修正点: widthとheight属性を削除し、CSSでサイズを制御させます
        // .attr("width", width)
        // .attr("height", height)
        .attr("viewBox", `0 0 ${width} ${height}`)
        // ↓ 修正点: 親要素の幅いっぱいに広がり、高さは自動調整されるようにクラスを変更
        .attr("class", "w-full h-auto mx-auto");

      const projection = d3
        .geoMercator()
        .rotate([-163, 0])
        .scale(150)
        .translate([width / 2, height / 1.5]);

      const pathGenerator = d3.geoPath().projection(projection);

      svg.selectAll("*").remove();

      try {
        const world = (await d3.json("/world-110m.json")) as WorldTopology;

        const countries = topojson.feature(
          world,
          world.objects.countries
        ) as unknown as FeatureCollection<Geometry, GeoJsonProperties>;

        svg
          .append("g")
          .selectAll("path")
          .data(countries.features)
          .join("path")
          .attr("class", "stroke-secondary fill-muted")
          .attr("d", pathGenerator);
      } catch (error) {
        console.error("Error loading or drawing the map:", error);
      }
    };

    drawMap();
  }, []);

  return <svg ref={svgRef} />;
};

export default WorldMap;
