export interface regionProps {
    city: string;
    images: string[];
    country: string;
    title: string;
    description: string;
}

export const regions: regionProps[] = [
    {
        city: 'パリ',
        images: [
            '/images/France/eiffel-tower-and-sunset.jpg',
            '/images/France/grand-palais.jpg',
            '/images/France/louvre-museum1.jpg',
            '/images/France/mona-lisa.jpg',
            '/images/France/the-hall-of-mirrors.jpg',
        ],
        country: 'フランス',
        title: 'パリ–フランスの魅力が詰まった観光情報',
        description: 'ともきちの旅行日記「パリ」ページでは、エッフェル塔、ルーブル美術館、セーヌ川クルーズなど、パリならではの人気観光スポットやグルメ情報、交通手段、宿泊施設の詳細を分かりやすくご紹介。次の旅先選びのヒントが満載です。',
    },
    {
        city: 'マドリード',
        images: [
            '/images/Spain/plaza-de-mayor.jpg',
            '/images/Spain/las-ventas-bullring.jpg',
            '/images/Spain/prado-museum.jpg',
            '/images/Spain/san-miguel-market.jpg',
        ],
        country: 'スペイン',
        title: 'マドリード–スペインの情熱あふれる観光情報',
        description: 'ともきちの旅行日記「マドリード」ページでは、スペインの首都マドリードならではの歴史や文化、グルメ、観光スポットなどの情報を詳しくご紹介。美術館や歴史的建造物、散策ルート、地元グルメのおすすめ情報など、次の旅先選びのヒントが満載です。',
    },
    {
        city: 'バルセロナ',
        images: [
            '/images/Spain/sagrada-familia.jpg',
            '/images/Spain/casa-mira.jpg',
            '/images/Spain/casa-batllo.jpg',
            "/images/Spain/la-pallaresa's-churos-con-chocolatte.jpg",
        ],
        country: 'スペイン',
        title: 'バルセロナ–ガウディ建築と地中海の魅力',
        description: 'ともきちの旅行日記「バルセロナ」ページでは、サグラダ・ファミリアやグエル公園などのガウディ建築、美しいビーチ、豊かな食文化など、バルセロナの魅力を詳しくご紹介。次の旅先選びの参考にぜひご覧ください。',
    },
    {
        city: 'トレド',
        images: [
            '/images/Spain/toledo-view.jpg',
            '/images/Spain/toledo-night-view.jpg',
            '/images/Spain/toledo-monument.jpg',
            '/images/Spain/toledo-streetscape2.jpg',
        ],
        country: 'スペイン',
        title: 'トレド–スペインの歴史薫る古都の魅力',
        description: 'ともきちの旅行日記「トレド」ページでは、スペインの古都トレドの魅力を詳しくご紹介。カテドラルやアルカサルなどの歴史的建造物、旧市街の散策スポット、地元のグルメ情報など、次の旅先選びに役立つ情報が満載です。',
    },
    {
        city: 'バンコク',
        images: [
            '/images/Thai/wat-arun-3.jpg',
            '/images/Thai/wat-arun-4.jpg',
            '/images/Thai/wat-pho-1.jpg',
            '/images/Thai/thai-streetscape.jpg',
        ],
        country: 'タイ',
        title: 'バンコク–タイの魅力溢れる観光情報',
        description: 'ともきちの旅行日記「バンコク」ページでは、ワット・プラケオ、ワット・ポー、ワット・アルンなどの三大寺院をはじめ、BTSやMRTを利用した効率的な移動方法、地元グルメ、宿泊施設情報など、バンコク観光に役立つ情報を詳しくご紹介。次の旅の計画にぜひお役立てください。',
    },
    {
        city: 'デリー',
        images: [
            '/images/India/indian-gate-1.jpg',
            '/images/India/lotus-temple.jpg',
            '/images/India/indian-gate-2.jpg',
        ],
        country: 'インド',
        title: 'デリー–インドの歴史と文化が息づく首都',
        description: 'ともきちの旅行日記「デリー」ページでは、インドの首都デリーの魅力を詳しくご紹介。レッドフォートやクトゥブ・ミナールなどの世界遺産、活気あふれるバザール、豊かな食文化など、デリーならではの観光スポットや体験をお届けします。次の旅先選びの参考にぜひご覧ください。',
    },
    {
        city: 'アグラ',
        images: [
            '/images/India/tajmahal.jpg',
            '/images/India/tajmahal2.jpg',
        ],
        country: 'インド',
        title: 'アグラ–タージ・マハルと歴史的遺産の街',
        description: 'ともきちの旅行日記「アグラ」ページでは、世界遺産タージ・マハルやアグラ城塞、ファテープル・シークリーなど、ムガル帝国の栄華を今に伝えるアグラの観光スポットを詳しくご紹介。次の旅先選びの参考にぜひご覧ください。',
    },
    {
        city: 'ジャイプル',
        images: [
            '/images/India/pink-city-1.jpg',
            '/images/India/amber-palace-1.jpg',
            '/images/India/train-view-1.jpg',
        ],
        country: 'インド',
        title: 'ジャイプール–ピンクシティの魅力と観光情報',
        description: 'ともきちの旅行日記「ジャイプール」ページでは、アンベール城、ハワー・マハル、シティ・パレスなどの歴史的建造物や、地元のグルメスポット、文化体験など、ジャイプールの魅力を詳しくご紹介。次の旅先選びの参考にぜひご覧ください。',
    },
    {
        city: 'バラナシ',
        images: [
            '/images/India/festival-2.jpg',
            '/images/India/ganga-2.jpg',
            '/images/India/varanasi-alley-1.jpg',
            '/images/India/lassi-1.jpg',
        ],
        country: 'インド',
        title: 'バラナシ–ガンジス川とヒンドゥー教の聖地を巡る旅',
        description: 'ともきちの旅行日記「バラナシ」ページでは、インドの聖地バラナシの魅力を詳しくご紹介。ガンジス川沿いのガートでの沐浴風景や、ダシャーシュワメード・ガートでのガンガー・アールティー、マニカルニカー・ガートでの火葬場の様子など、バラナシならではの文化や風習をお伝えします。また、サールナートやカシー・ヴィシュワナート寺院などの観光スポット、地元のグルメ情報も掲載。次の旅先選びの参考にぜひご覧ください。',
    },
    {
        city: 'ブリュッセル',
        images: [
            '/images/Belgium/galeries-royales-saint-hubert.jpg',
            '/images/Belgium/grand-place.jpg',
            '/images/Belgium/saints-michel-et-gudule.jpg',
        ],
        country: 'ベルギー',
        title: 'ブリュッセル–ベルギーの首都で味わう歴史と美食の旅',
        description: 'ともきちの旅行日記「ブリュッセル」ページでは、グランプラスや小便小僧などの歴史的名所から、アトミウムや王宮といった近代的な見どころまで、ブリュッセルの多彩な魅力を紹介。美食の都として知られるベルギー料理やチョコレート、ワッフルも堪能できます。次の旅のインスピレーションをぜひご覧ください。',
    },
]
