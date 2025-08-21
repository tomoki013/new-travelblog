"use client"; // アニメーションのためClient Componentとします

import { motion, Variants } from "framer-motion";
import { Lightbulb, CheckCircle, FileText } from "lucide-react";

// Client Componentではmetadataオブジェクトを直接exportできないため、
// Headタグや、上位のレイアウトファイルで設定することを想定します。

// アニメーションのバリアント設定
const sectionVariant: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export default function Client() {
  return (
    <main>
      {/* ==================== Hero Section ==================== */}
      <section className="relative h-72 md:h-96 flex items-center justify-center text-foreground text-center">
        <div className="relative z-10 p-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            記事テーマ リクエストボックス
          </h1>
          <p className="text-md md:text-lg mt-4 max-w-2xl">
            あなたの「知りたい！」「見てみたい」を教えてください。
            <br />
            次の冒険のテーマになるかもしれません。
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {/* ==================== 挨拶・趣旨説明 ==================== */}
        <motion.section
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-4">このページについて</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            いつもブログを読んでくださりありがとうございます！
            <br />
            このブログを、もっと皆さんの役に立つ場所にしたいと思い、記事のテーマを募集するページを作りました。
            <br />
            あなたの素朴な疑問や知りたいことが、他の誰かの助けになるかもしれません。お気軽に投稿してくださいね。
          </p>
        </motion.section>

        {/* ==================== 募集テーマの例 ==================== */}
        <motion.section
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl font-bold text-center mb-8">
            例えば、こんなテーマを募集しています
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-gray-700">
            <div className="bg-gray-50 p-6 rounded-lg flex items-start gap-4">
              <Lightbulb className="text-amber-500 w-8 h-8 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold mb-1">素朴な疑問</h3>
                <p>
                  旅行計画に関する素朴な疑問（例：航空券の探し方、ホテルの選び方）
                </p>
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg flex items-start gap-4">
              <CheckCircle className="text-teal-500 w-8 h-8 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold mb-1">レビュー依頼</h3>
                <p>レビューしてほしい旅行グッズやカメラ機材</p>
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg flex items-start gap-4">
              <FileText className="text-blue-500 w-8 h-8 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold mb-1">深掘り解説</h3>
                <p>詳しく解説してほしい国や地域の歴史・文化</p>
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg flex items-start gap-4">
              <FileText className="text-purple-500 w-8 h-8 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold mb-1">体験談</h3>
                <p>僕の体験談（失敗談・成功談など）で聞いてみたいこと</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ==================== 過去に採用した記事 ==================== */}
        {/* <motion.section
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl font-bold text-center mb-8">
            あなたの声が記事になりました！
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {requestedPosts.map((post) => (
              <Link
                href={`/blog/${post.slug}`}
                key={post.slug}
                className="group"
              >
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    width={800}
                    height={600}
                    className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-lg font-bold mt-4 group-hover:text-teal-600">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-500">
                  （{post.requestedBy}のリクエストより）
                </p>
              </Link>
            ))}
          </div>
        </motion.section> */}

        {/* ==================== 投稿フォーム ==================== */}
        <motion.section
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl font-bold text-center mb-8">
            リクエストフォーム
          </h2>
          <div className="bg-gray-100 border-2 border-dashed border-gray-300 p-8 rounded-lg text-center">
            <div className="bg-gray-100 p-2 rounded-lg shadow-inner">
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSfpawRugp4nrxhGMR-YBEFHn3ZYqrVpP_sLXCteNneYh9higg/viewform?embedded=true"
                width="100%"
                height="520"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
              >
                読み込んでいます…
              </iframe>
            </div>
            <p className="text-gray-500 mt-2">
              皆さんの声をお待ちしております！
            </p>
          </div>
        </motion.section>

        {/* ==================== 注意事項 ==================== */}
        <motion.section
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-sm text-gray-600 bg-gray-50 p-6 rounded-lg"
        >
          <h3 className="text-lg font-bold mb-4 text-center">注意事項</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>
              いただいたテーマ全てを記事にできるわけではありません。ご了承ください。
            </li>
            <li>
              原則として、投稿への個別の返信は行っておりません。（採用時に連絡をご希望の方は、フォームにメールアドレスをご記入ください）
            </li>
            <li>
              採用させていただく際に、テーマの意図を汲み取り、表現を一部変更する場合があります。
            </li>
            <li>個人情報や、他人を傷つけるような内容はご遠慮ください。</li>
          </ul>
        </motion.section>

        {/* ==================== 締めのメッセージ ==================== */}
        <motion.section
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center"
        >
          <p className="text-xl font-semibold text-gray-800">
            あなたの声が、このブログの未来を作ります。
            <br />
            お気軽に投稿いただけると嬉しいです！
          </p>
        </motion.section>
      </div>
    </main>
  );
}
