import Link from "next/link";
import { motion } from "framer-motion";
import { sectionVariants } from "@/components/animation";
import { ContinentData } from "@/types/types";

export interface AllDestinationProps {
  regionsData: ContinentData[];
}

const AllDestination = ({ regionsData }: AllDestinationProps) => {
  return (
    <motion.section variants={sectionVariants}>
      <h2 className="text-3xl font-bold text-center mb-12">
        すべての旅行先一覧
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {regionsData.map((continent) => (
          <div key={continent.slug}>
            <h3 className="text-2xl font-bold border-b-2 border-secondary pb-2 mb-4">
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
