"use client";

import { motion } from "framer-motion";
import { sectionVariants } from "../common/animation";
import Button from "../common/Button";

const Request = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={sectionVariants}
      className="bg-background text-foreground py-12 md:py-16"
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          このブログを、一緒に作りませんか？
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          記事のテーマを募集するリクエストページができました。
          あなたの声が、次の記事になるかもしれません。
        </p>
        <Button href={`/request`}>リクエストページへ</Button>
      </div>
    </motion.section>
  );
};

export default Request;
