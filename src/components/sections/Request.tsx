"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const Request = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8 }}
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
        <Link href="/request" passHref>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block py-3 px-8 bg-secondary border-2 border-secondary text-background font-bold rounded-full transition-colors duration-300 hover:bg-background hover:text-secondary"
          >
            リクエストページへ
          </motion.div>
        </Link>
      </div>
    </motion.section>
  );
};

export default Request;
