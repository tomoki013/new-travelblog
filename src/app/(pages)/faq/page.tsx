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
    question: 'AIトラベルプランナーは無料ですか？',
    answer: 'はい、完全に無料でご利用いただけます。',
  },
  {
    question: '掲載されている情報が古い場合はどうすればいいですか？',
    answer:
      '情報の正確性には万全を期していますが、万が一古い情報を見つけた場合は、お問い合わせフォームからご連絡いただけると幸いです。',
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
