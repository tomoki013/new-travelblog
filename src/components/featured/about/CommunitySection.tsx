"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { sectionVariants } from "@/components/animation";

const CommunitySection = () => {
  return (
    <motion.section
      className="py-20 md:py-28 bg-foreground text-background"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={sectionVariants}
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          一緒に旅をしませんか？ - Let&apos;s Journey Together
        </h2>
        <p className="text-lg mb-10">
          このブログは、読者の皆さんと一緒に作り上げていきたいと思っています。
          <br />
          SNSでの交流や、記事テーマの提案など、お気軽にご参加ください。
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <motion.div
            className="inline-block py-3 px-8 bg-transparent border-2 border-orange-400 text-orange-400 font-bold rounded-full transition-colors duration-300 hover:bg-orange-400 hover:text-gray-900"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href={`/social`}>SNSで繋がる</Link>
          </motion.div>
          <motion.div
            className="inline-block py-3 px-8 bg-transparent border-2 border-orange-400 text-orange-400 font-bold rounded-full transition-colors duration-300 hover:bg-orange-400 hover:text-gray-900"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href={`/request`}>記事テーマを提案する</Link>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default CommunitySection;
