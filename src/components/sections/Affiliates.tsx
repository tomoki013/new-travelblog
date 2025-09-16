"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { sectionVariants, staggerContainer } from "../animation";
import { affiliates } from "@/constants/affiliates";

const Affiliates = () => {
  const appsToShow = affiliates.filter((aff) => aff.status === "ready");

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={sectionVariants}
      className="py-24 px-6 md:px-8 max-w-5xl mx-auto"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
            旅の予約におすすめのサイト・アプリ
          </h2>
          <p className="text-muted-foreground mt-2">
            旅行の準備がもっと楽しく、スムーズになる予約ツールを集めました。
          </p>
        </div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start"
          variants={staggerContainer()}
        >
          {appsToShow.map((app) => (
            <motion.div
              key={app.affiliateUrl}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={sectionVariants}
            >
              <Link
                href={app.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`block group ${
                  app.type === "banner" ? "md:col-span-2 lg:col-span-3" : "" // バナータイプは幅を広げる
                }`}
              >
                {app.type === "banner" ? (
                  // --- バナー表示 ---
                  <div className="bg-card rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 overflow-hidden">
                    <Image
                      src={app.image!}
                      alt={`${app.name} バナー`}
                      width={1200}
                      height={400}
                      className="w-full h-auto object-cover"
                    />
                    <div className="p-4">
                      <p className="text-muted-foreground">{app.description}</p>
                    </div>
                  </div>
                ) : (
                  // --- カード表示 ---
                  <div className="bg-card p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 h-full flex flex-col items-center text-center">
                    <div className="mb-4 h-12 w-12 flex items-center justify-center">
                      {app.image ? (
                        <Image
                          src={app.image}
                          alt={`${app.name} ロゴ`}
                          width={48}
                          height={48}
                          className="object-contain"
                        />
                      ) : (
                        app.icon
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {app.name}
                    </h3>
                    <p className="text-muted-foreground flex-grow">
                      {app.description}
                    </p>
                  </div>
                )}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Affiliates;
