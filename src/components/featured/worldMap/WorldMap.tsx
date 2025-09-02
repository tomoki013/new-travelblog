"use client";

import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useRouter } from "next/navigation";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import { Topology, GeometryCollection } from "topojson-specification";
import { FeatureCollection, Geometry, GeoJsonProperties } from "geojson";
import { LoadingAnimation } from "../LoadingAnimation/LoadingAnimation";
import { ContinentData } from "@/types/types";

interface WorldTopology extends Topology {
  objects: {
    countries: GeometryCollection;
  };
}

// propsの型定義
interface WorldMapProps {
  highlightedRegions: string[];
  isClickable: boolean;
  isTooltip?: boolean;
  regionData?: ContinentData[];
  isZoomable?: boolean;
}

export interface WorldMapHandle {
  resetZoom: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
}

const WorldMap = forwardRef<WorldMapHandle, WorldMapProps>(
  (
    {
      highlightedRegions,
      isClickable,
      isTooltip = false,
      regionData = [],
      isZoomable = false,
    },
    ref
  ) => {
    const svgRef = useRef<SVGSVGElement | null>(null);
    const zoomRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(
      null
    );
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showZoomHint, setShowZoomHint] = useState(false);
    const [currentZoom, setCurrentZoom] = useState(1);
    const router = useRouter();

    useImperativeHandle(ref, () => ({
      resetZoom: () => {
        if (svgRef.current && zoomRef.current) {
          const svg = d3.select(svgRef.current);
          svg
            .transition()
            .duration(750)
            .call(zoomRef.current.transform, d3.zoomIdentity);
        }
      },
      zoomIn: () => {
        if (svgRef.current && zoomRef.current) {
          const svg = d3.select(svgRef.current);
          zoomRef.current.scaleBy(svg.transition().duration(750), 1.5);
        }
      },
      zoomOut: () => {
        if (svgRef.current && zoomRef.current) {
          const svg = d3.select(svgRef.current);
          zoomRef.current.scaleBy(svg.transition().duration(750), 0.5);
        }
      },
    }));

    useEffect(() => {
      if (!isZoomable || isLoading) return;

      const currentRef = containerRef.current;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setShowZoomHint(true);
            const timer = setTimeout(() => {
              setShowZoomHint(false);
            }, 3000); // 3秒後に非表示

            // 一度表示したら監視をやめる
            if (currentRef) {
              observer.unobserve(currentRef);
            }
            // クリーンアップ関数を返す
            return () => clearTimeout(timer);
          }
        },
        { threshold: 0.1 } // 10%表示されたらトリガー
      );

      if (currentRef) {
        observer.observe(currentRef);
      }

      return () => {
        if (currentRef) {
          observer.unobserve(currentRef);
        }
      };
    }, [isZoomable, isLoading]);

    useEffect(() => {
      const drawMap = async () => {
        if (!svgRef.current) {
          return;
        }
        const width = 960;
        const height = 600;

        const svg = d3
          .select(svgRef.current)
          .attr("viewBox", `0 0 ${width} ${height}`)
          .attr("class", "w-full h-auto mx-auto");

        // Clear previous SVG content
        svg.selectAll("*").remove();
        const g = svg.append("g");

        const projection = d3
          .geoMercator()
          .rotate([-163, 0])
          .scale(150)
          .translate([width / 2, height / 1.5]);

        const pathGenerator = d3.geoPath().projection(projection);

        // Tooltip setup
        const tooltip = d3
          .select("body")
          .append("div")
          .attr("class", "tooltip")
          .style("opacity", 0);

        try {
          const world = (await d3.json("/world-110m.json")) as WorldTopology;
          const countries = topojson.feature(
            world,
            world.objects.countries
          ) as unknown as FeatureCollection<Geometry, GeoJsonProperties>;

          g.selectAll("path")
            .data(countries.features)
            .join("path")
            .attr("d", pathGenerator)
            .attr("class", (d) => {
              const countryName = d.properties?.name.toLowerCase();
              const isHighlighted = highlightedRegions.includes(countryName);

              let classes = "stroke-secondary transition-colors duration-200 ";
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
            })
            .on("mouseover", (event, d) => {
              if (!isTooltip) return;
              const countryName = d.properties?.name.toLowerCase();
              const isHighlighted = highlightedRegions.includes(countryName);

              if (isHighlighted) {
                const allCountries = regionData.flatMap(
                  (continent) => continent.countries
                );
                const countryData = allCountries.find(
                  (c) => c.slug === countryName
                );

                if (countryData) {
                  tooltip.transition().duration(200).style("opacity", 0.9);
                  tooltip
                    .html(
                      `<strong>${countryData.name}</strong><br/><img src="${countryData.imageURL}" alt="${countryData.name}" class="tooltip-image"/>`
                    )
                    .style("left", event.pageX + 15 + "px")
                    .style("top", event.pageY - 28 + "px");
                }
              }
            })
            .on("mousemove", (event) => {
              if (!isTooltip) return;
              tooltip
                .style("left", event.pageX + 15 + "px")
                .style("top", event.pageY - 28 + "px");
            })
            .on("mouseout", () => {
              if (!isTooltip) return;
              tooltip.transition().duration(500).style("opacity", 0);
            });

          // Zoom setup
          if (isZoomable) {
            const zoom = d3
              .zoom<SVGSVGElement, unknown>()
              .scaleExtent([1, 8])
              .on("zoom", (event) => {
                g.attr("transform", event.transform.toString());
                setCurrentZoom(event.transform.k);
              });
            zoomRef.current = zoom;
            svg.call(zoomRef.current);
          }

          setIsLoading(false);
        } catch (error) {
          console.error("Error loading or drawing the map:", error);
          setIsLoading(false);
        }
      };

      drawMap();

      // Cleanup tooltip on component unmount
      return () => {
        d3.select(".tooltip").remove();
      };
    }, [
      highlightedRegions,
      isClickable,
      isTooltip,
      isZoomable,
      regionData,
      router,
    ]);

    return (
      <div ref={containerRef} className="relative w-full h-auto mx-auto">
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
        {/* 3. Zoom hint message */}
        {isZoomable && (
          <div
            className={`
            absolute top-4 left-1/2 -translate-x-1/2
            bg-background/80 text-foreground py-2 px-4 rounded-md shadow-lg
            transition-opacity duration-500 ease-in-out
            ${showZoomHint ? "opacity-100" : "opacity-0 pointer-events-none"}
          `}
          >
            <p className="text-sm">スクロールやピンチで拡大できます</p>
          </div>
        )}
        {/* 4. Zoom level indicator */}
        {isZoomable && !isLoading && (
          <div
            className="
            absolute bottom-4 left-4
            bg-background/80 text-foreground py-1 px-3 rounded-md shadow-lg
            pointer-events-none
          "
          >
            <p className="text-sm font-semibold">x{currentZoom.toFixed(1)}</p>
          </div>
        )}
      </div>
    );
  }
);

WorldMap.displayName = "WorldMap";
export default WorldMap;
