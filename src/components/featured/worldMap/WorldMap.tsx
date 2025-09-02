"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import { Topology, GeometryCollection } from "topojson-specification";
import { FeatureCollection, Geometry, GeoJsonProperties } from "geojson";
import { LoadingAnimation } from "../LoadingAnimation/LoadingAnimation";

interface WorldTopology extends Topology {
  objects: {
    countries: GeometryCollection;
  };
}

// propsの型定義
interface WorldMapProps {
  highlightedRegions: string[];
  isClickable: boolean;
}

const WorldMap: React.FC<WorldMapProps> = ({
  highlightedRegions,
  isClickable,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const drawMap = async () => {
      const width = 960;
      const height = 600;

      const svg = d3
        .select(svgRef.current)
        .attr("viewBox", `0 0 ${width} ${height}`)
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
          .attr("d", pathGenerator)
          .attr("class", (d) => {
            const countryName = d.properties?.name.toLowerCase();
            const isHighlighted = highlightedRegions.includes(countryName);

            let classes = "stroke-secondary ";
            if (isHighlighted) {
              classes += "fill-primary stroke-primary-foreground";
              if (isClickable) {
                classes += " cursor-pointer hover:fill-secondary";
              }
            } else {
              classes += "fill-muted";
            }
            return classes;
          })
          .on("click", (event, d) => {
            if (!isClickable) return;

            const countryName = d.properties?.name.toLowerCase();
            const isHighlighted = highlightedRegions.includes(countryName);

            if (isHighlighted) {
              router.push(`/destination/${countryName}`);
            }
          });
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading or drawing the map:", error);
        setIsLoading(false);
      }
    };

    drawMap();
  }, [highlightedRegions, isClickable, router]);

  return (
    <div className="relative w-full h-auto mx-auto">
      {/* 1. ローディングアニメーション */}
      <div
        className={`
          absolute inset-0 flex items-center justify-center
          transition-opacity duration-500 ease-in-out
          ${isLoading ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
      >
        <LoadingAnimation variant="mapRoute" />
      </div>
      {/* 2. 世界地図SVG */}
      <svg
        ref={svgRef}
        className={`
          w-full h-full
          transition-opacity duration-500 ease-in-out
          ${isLoading ? "opacity-0" : "opacity-100"}
        `}
      />
    </div>
  );
};

export default WorldMap;
