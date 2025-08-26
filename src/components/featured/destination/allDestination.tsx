"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { sectionVariants } from "@/components/animation";
import { AllDestinationProps } from "@/types/types";

interface PageProps extends AllDestinationProps {
  className: string;
  countryStyle?: string;
}

const AllDestination = ({ regionData, className, countryStyle }: PageProps) => {
  return (
    <motion.section variants={sectionVariants}>
      <div className={`${className}`}>
        {regionData.map((continent) => (
          <div key={continent.slug}>
            <h3 className={`text-2xl font-bold pb-2 mb-4 ${countryStyle}`}>
              {continent.name}
            </h3>
            <ul className="space-y-2">
              {continent.countries.map((country) => (
                <li key={country.slug}>
                  <Link
                    href={`/destination/${country.slug}`}
                    className="font-semibold text-foreground hover:text-secondary"
                  >
                    ・{country.name}
                  </Link>
                  {country.children && country.children.length > 0 && (
                    <ul className="ml-6 mt-1 space-y-1">
                      {country.children.map((city) => (
                        <li key={city.slug}>
                          <Link
                            href={`/destination/${city.slug}`}
                            className="text-foreground hover:text-secondary"
                          >
                            - {city.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default AllDestination;
