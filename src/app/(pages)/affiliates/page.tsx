// 参加しているアフィリエイトプログラムのリスト
// 新しいプログラムを追加する場合は、この配列に名前を追加するだけです。
const affiliatePrograms: string[] = [];

const Affiliates = () => {
  return (
    <div className="container py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:mx-8">
        <h1 className="mb-8 text-4xl font-bold">アフィリエイトポリシー</h1>
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <p>
            当サイトでは、商品やサービスを紹介する際にアフィリエイトプログラムを利用しています。
            読者の皆様に誠実な情報を提供するため、以下の方針を遵守することをお約束します。
          </p>

          <h2 className="mt-12 text-2xl font-bold">紹介に関する基本方針</h2>
          <ol>
            <li>
              <strong>実際に使用したものだけを紹介します</strong>
              <br />
              当サイトで紹介するすべての商品やサービスは、私自身が実際に購入し、一定期間使用したものです。エアレビュー（未使用でのレビュー）や、憶測に基づいた紹介は一切行いません。
            </li>
            <li>
              <strong>心から「良い」と感じたものだけを厳選します</strong>
              <br />
              私が実際に使用してみて、「これは本当に素晴らしい」「多くの人の役に立つはずだ」と心から感じたものだけを厳選して紹介します。報酬の多寡が紹介の基準になることはありません。
            </li>
            <li>
              <strong>正直な体験談を記載します</strong>
              <br />
              紹介記事では、必ず私自身の具体的な体験に基づいたメリット・デメリットを正直に記載します。皆様が商品やサービスを検討する上で、公平で役立つ判断材料となるような情報提供を心がけます。
            </li>
          </ol>

          <p>
            当サイトのレビューが、あなたの素晴らしい選択の一助となれば幸いです。
          </p>

          <h2 className="mt-12 text-2xl font-bold">
            参加アフィリエイトプログラム
          </h2>
          <p>
            当サイトは、以下のアフィリエイトプログラムに参加しています。
            これらのプログラムは、商品およびサービスを提供している企業との提携を可能にするためのものです。
          </p>
          <ul>
            {affiliatePrograms.map((program) => (
              <li key={program}>{program}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Affiliates;
