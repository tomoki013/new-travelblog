"use client";

import { motion } from "framer-motion";
import { sectionVariants } from "@/components/common/animation";

const AboutJourneySection = () => {
  return (
    <motion.section
      className="py-20 md:py-28"
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
    >
      <div className="max-w-4xl mx-auto px-6 text-foreground">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 ">
          この旅について - About this Journey
        </h2>
        <p className="text-base md:text-lg leading-relaxed text-center">
          「次の冒険は、どこへ？」 <br />
          ふと、そんな言葉が頭に浮かんだ時、新しい旅が始まります。このブログは、私自身が旅の計画を立てる時のワクワク感や、現地で出会った息をのむような絶景、そして旅先での小さな発見を共有するために始めました。読者の皆さんの冒険心を刺激し、次の旅への一歩を踏み出すきっかけになれたら、これ以上嬉しいことはありません。
        </p>
      </div>
    </motion.section>
  );
};

export default AboutJourneySection;
