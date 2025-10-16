import { Metadata } from 'next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const FAQS = [
  {
    question: 'このサイトについて',
    answer:
      'このサイトは旅行ブログとして、様々な観光地を紹介しています。また、AIが旅行プランを作成する「AIトラベルプランナー」も搭載しています。',
  },
  {
    question: 'おすすめの旅行先は？',
    answer:
      'このブログではヨーロッパ、アジア、アフリカなど、世界中の様々な国や地域の旅行記を掲載しています。「デスティネーション」ページから、興味のある国を探してみてください。きっとあなたにぴったりの旅行先が見つかります。',
  },
  {
    question: '旅行の予算はどれくらい必要ですか？',
    answer:
      '予算は旅行先の物価、滞在期間、旅行のスタイル（バックパッカー、豪華旅行など）によって大きく異なります。各旅行記には、かかった費用を参考に記載している場合もありますので、ぜひご覧ください。AI旅行プランナーも予算に応じたプランを作成できます。',
  },
  {
    question: '海外旅行で気をつけるべきことは？',
    answer:
      '安全が第一です。外務省の海外安全情報を確認し、危険な地域には近づかないようにしましょう。また、スリや置き引きなどの軽犯罪にも注意が必要です。現地の文化や習慣を尊重することも大切です。',
  },
  {
    question: 'ブログに掲載されている写真は自由に使っていいですか？',
    answer:
      'サイト内のすべてのコンテンツ（文章、写真など）の著作権は当サイトの管理者に帰属します。無断転載・使用は固くお断りします。',
  },
  {
    question: 'このサイトで航空券やホテルの予約はできますか？',
    answer:
      '現在、予約サービスは提供しておりません。旅の計画に役立つ情報や旅行プランを提供しています。',
  },
  {
    question: 'ブログの更新頻度は？',
    answer:
      '不定期ですが、新しい旅行体験や役立つ情報を随時更新していきます。SNSで更新情報をお知らせしていますので、ぜひフォローしてください。',
  },
  {
    question: '掲載されている情報が古い場合はどうすればいいですか？',
    answer:
      '情報の正確性には万全を期していますが、万が一古い情報を見つけた場合は、お問い合わせフォームからご連絡いただけると幸いです。',
  },
  {
    question: 'AIトラベルプランナーは無料ですか？',
    answer: 'はい、完全に無料でご利用いただけます。',
  },
  {
    question: 'AIトラベルプランナーの使い方',
    answer:
      'メインメニューから「AIトラベルプランナー」にアクセスし、目的地、期間、興味などを入力すると、AIがあなただけの旅行プランを生成します。',
  },
  {
    question: 'AIが生成する旅行プランは信頼できますか？',
    answer:
      'AIが生成する旅行プランは膨大なデータに基づいており、役立つように設計されていますが、あくまで参考として、ご自身のニーズに合わせて調整することをおすすめします。',
  },
  {
    question: 'AI旅行プランナーはどのような情報に基づいてプランを作成しますか？',
    answer:
      'このブログに掲載されている旅行記の情報を主な知識ベースとしています。そのため、私が実際に訪れた場所や経験に基づいた、より実践的な提案が可能です。',
  },
  {
    question: 'プランの結果が期待と違う場合はどうすればいいですか？',
    answer:
      'AIへの指示（興味・関心など）をより具体的にすることで、結果が改善されることがあります。例えば、「美味しいものが食べたい」だけでなく「シーフードが美味しいレストランに行きたい」のように入力してみてください。何度か試すことで、より理想に近いプランが作成できます。',
  },
  {
    question: '生成されたプランを保存・共有できますか？',
    answer:
      'はい、プラン生成後に表示される「このプランを共有する」ボタンをクリックすると、プランが保存された特別なURLが生成されます。そのURLをコピーして、後から見返したり、友人と共有したりすることができます。',
  },
];

export const metadata: Metadata = {
  title: 'FAQ',
  alternates: {
    canonical: new URL('/faq', 'https://tomokichidiary.netlify.app'),
  },
};

const FaqPage = () => {
  return (
    <div className="container mx-auto max-w-4xl py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold tracking-tight">
            よくある質問
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default FaqPage;
