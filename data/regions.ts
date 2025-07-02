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
    // {
    //     city: 'イスタンブール',
    //     images: [
    //         '/images/Turkey/hagia-sophia.jpg',
    //         '/images/Turkey/blue-mosque.jpg',
    //         '/images/Turkey/grand-bazaar.jpg',
    //     ],
    //     country: 'トルコ',
    //     title: 'イスタンブール – 東西文化が交差する魅惑の都市',
    //     description: 'ともきちの旅行日記「イスタンブール」編。アヤソフィアやブルーモスクの壮大な建築、グランドバザールの活気に触れ、ボスポラス海峡のクルーズでアジアとヨーロッパを一度に体感。歴史と美食が詰まったこの街の魅力を余すことなくお届けします。',
    // },
    // {
    //     city: 'カッパドキア',
    //     images: [
    //         '/images/Turkey/cappadocia-balloons.jpg',
    //         '/images/Turkey/goreme-national-park.jpg',
    //         '/images/Turkey/cave-hotel.jpg',
    //     ],
    //     country: 'トルコ',
    //     title: 'カッパドキア – 奇岩と気球が織りなす幻想的な風景',
    //     description: 'ともきちの旅行日記「カッパドキア」ページへようこそ。妖精の煙突と呼ばれる奇岩群、神秘的な地下都市、そして空一面に広がる熱気球の絶景。洞窟ホテルでの特別な滞在など、まるで別世界に迷い込んだかのような体験記をご覧ください。',
    // },
    // {
    //     city: 'カイロ',
    //     images: [
    //         '/images/Egypt/egyptian-museum.jpg',
    //         '/images/Egypt/khan-el-khalili.jpg',
    //         '/images/Egypt/cairo-citadel.jpg',
    //     ],
    //     country: 'エジプト',
    //     title: 'カイロ – 古代と現代が共存するエネルギッシュな首都',
    //     description: 'ともきちの旅行日記「カイロ」編。ツタンカーメンの黄金のマスクが輝くエジプト考古学博物館、活気あふれるハン・ハリーリ市場でのショッピング。ナイル川のほとりで感じる、エジプトの歴史と人々のエネルギーをお伝えします。',
    // },
    // {
    //     city: 'ギザ',
    //     images: [
    //         '/images/Egypt/giza-pyramids.jpg',
    //         '/images/Egypt/sphinx.jpg',
    //         '/images/Egypt/camel-ride-giza.jpg',
    //     ],
    //     country: 'エジプト',
    //     title: 'ギザ – 古代の謎に迫る、圧巻のピラミッドとスフィンクス',
    //     description: 'ともきちの旅行日記「ギザ」ページ。誰もが一度は夢見る、ギザの三大ピラミッドとスフィンクスの前に立った感動をレポート。ラクダに乗って砂漠を散策し、古代ファラオたちの偉大な遺産に思いを馳せる、壮大な旅の記録です。',
    // },
    {
        city: 'アスワン',
        images: [
            '/images/Egypt/aswan-view.jpg',
            '/images/Egypt/krouma-camp.jpg',
            '/images/Egypt/aswan-morning-nile-view.jpg',
        ],
        country: 'エジプト',
        title: 'アスワン-ナイルの恵みとヌビア文化に癒される旅',
        description: 'ともきちの旅行日記「アスワン」編では、ゆったりと流れるナイル川のほとりの街の魅力を紹介します。ファルーカでのセーリング、フィラエ神殿の美しいレリーフ、そしてヌビアンビレッジのカラフルな家々。心安らぐエジプト南部の旅へご案内します。',
    },
    {
        city: 'アブシンベル',
        images: [
            '/images/Egypt/abusimbel-temple.jpg',
            '/images/Egypt/nefertari-temple.jpg',
            '/images/Egypt/inside-the-abusimbel-temple.jpg',
        ],
        country: 'エジプト',
        title: 'アブシンベル-砂漠に佇むラムセス2世の巨大神殿',
        description: 'ともきちの旅行日記「アブシンベル」ページ。ラムセス2世が自身の権威を示すために建造した、圧巻のアブ・シンベル神殿。年に2度だけ奥まで光が差し込む奇跡の設計など、古代エジプトの建築技術とロマンに満ちた神殿の謎に迫ります。',
    },
    // {
    //     city: 'アテネ',
    //     images: [
    //         '/images/Greece/acropolis.jpg',
    //         '/images/Greece/parthenon.jpg',
    //         '/images/Greece/plaka.jpg',
    //     ],
    //     country: 'ギリシャ',
    //     title: 'アテネ – 神話と哲学の故郷、西洋文明の源流を訪ねて',
    //     description: 'ともきちの旅行日記「アテネ」編。青い空に映えるパルテノン神殿、哲学者たちが議論を交わした古代アゴラ。歴史的な遺跡を巡りながら、プラカ地区の散策や美味しいギリシャ料理も満喫。神話の世界が息づく街の魅力をお届けします。',
    // },
    // {
    //     city: 'サントリーニ',
    //     images: [
    //         '/images/Greece/santorini-oia.jpg',
    //         '/images/Greece/blue-domes.jpg',
    //         '/images/Greece/santorini-sunset.jpg',
    //     ],
    //     country: 'ギリシャ',
    //     title: 'サントリーニ – エーゲ海に輝く白と青の絶景',
    //     description: 'ともきちの旅行日記「サントリーニ」ページへようこそ。断崖に連なる白壁の家々とブルードームの教会、そして世界一と称されるイアの夕日。ロマンチックな風景と美味しいシーフード、ワインを堪能する、夢のような島の滞在記です。',
    // },
]
