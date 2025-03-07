import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Badge, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const TourismPage = () => {
    const categories = [
        { id: 'all', name: 'すべて' },
        { id: 'sightseeing', name: '観光スポット' },
        { id: 'food', name: 'グルメ' },
        { id: 'accommodation', name: '宿泊施設' },
        { id: 'transportation', name: '交通情報' },
      ]
    
      const tourismInfo = [
        {
          id: 1,
          title: '東京の穴場スポット10選',
          excerpt: '観光客が少ない東京の隠れた名所を紹介。地元の人に人気のスポットで本当の東京を体験しよう。',
          image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          location: '東京',
          category: '観光スポット',
        },
        {
          id: 2,
          title: '沖縄のビーチリゾートガイド',
          excerpt: '沖縄本島と離島のおすすめビーチリゾートを徹底解説。透明度抜群の海でのアクティビティや周辺施設情報も。',
          image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          location: '沖縄',
          category: '観光スポット',
        },
        {
          id: 3,
          title: '京都の季節別おすすめ観光スポット',
          excerpt: '春夏秋冬、それぞれの季節で楽しめる京都の名所を紹介。季節ごとの見どころやイベント情報も満載。',
          image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          location: '京都',
          category: '観光スポット',
        },
        {
          id: 4,
          title: '日本の温泉ランキングTOP10',
          excerpt: '日本全国の人気温泉地をランキング形式で紹介。泉質や効能、周辺の観光情報など、温泉旅行の計画に役立つ情報が満載。',
          image: 'https://images.unsplash.com/photo-1545079968-1feb76d2775c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          location: '全国',
          category: '宿泊施設',
        },
        {
          id: 5,
          title: '東京のミシュラン星付きレストラン特集',
          excerpt: '東京都内のミシュラン星付きレストランを紹介。和食からフレンチ、イタリアンまで、特別な日のディナーにおすすめ。',
          image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          location: '東京',
          category: 'グルメ',
        },
        {
          id: 6,
          title: '大阪の人気グルメスポット',
          excerpt: '食い倒れの街・大阪で絶対に外せないグルメスポットを紹介。たこ焼きやお好み焼きから地元民おすすめの名店まで。',
          image: 'https://images.unsplash.com/photo-1617196701537-7329482cc9fe?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          location: '大阪',
          category: 'グルメ',
        },
        {
          id: 7,
          title: '日本の高級旅館ガイド',
          excerpt: '日本全国の厳選された高級旅館を紹介。一度は泊まってみたい贅沢な空間と極上のおもてなしを体験できる宿をピックアップ。',
          image: 'https://images.unsplash.com/photo-1601331294738-1a6f4b071f7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          location: '全国',
          category: '宿泊施設',
        },
        {
          id: 8,
          title: '東京から日帰りで行ける観光スポット',
          excerpt: '東京から電車で2時間以内で行ける日帰り観光スポットを紹介。箱根、鎌倉、日光など、週末の小旅行におすすめ。',
          image: 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          location: '関東',
          category: '観光スポット',
        },
        {
          id: 9,
          title: '日本の交通系ICカード完全ガイド',
          excerpt: 'Suica、PASMO、ICOCAなど、日本の交通系ICカードの使い方や違い、エリアごとの対応状況を解説。旅行前に知っておきたい情報。',
          image: 'https://images.unsplash.com/photo-1524046960467-17f4477acd6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          location: '全国',
          category: '交通情報',
        },
    ]

    return (
        <div className="container py-12">
            <div className="mb-12 text-center">
                <h1 className="mb-4 text-4xl font-bold">観光情報</h1>
                <p className="mx-auto max-w-2xl text-muted-foreground">日本各地の観光スポット、グルメ、宿泊施設、交通情報など、旅行計画に役立つ情報をお届けします。</p>
            </div>

            {/* Featured Regions */}
            <section className="mb-16">
                <h2 className="mb-6 text-2xl font-bold">人気の観光地</h2>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                    {['東京', '京都', '沖縄', '大阪', '北海道', '福岡'].map((region) => (
                        <Link key={region} href={`/tourism/region/${region.toLowerCase()}`}>
                            <div className="group relative h-32 overflow-hidden rounded-lg">
                                <Image
                                    src={'/imges/India/tajimahal/jpg'}
                                    alt={region}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    className="transition-transform duration-300 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/40 transition-opacity group-hover:bg-black/60" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-lg font-bold text-white">{region}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Tourism Information Tabs */}
            <Tabs defaultValue="all" className="mb-10">
                <TabsList className="mb-8 grid w-full grid-cols-2 sm:grid-cols-5">
                    {categories.map((category) => (
                        <TabsTrigger key={category.id} value={category.id}>
                            {category.name}
                        </TabsTrigger>
                    ))}
                </TabsList>

                <TabsContent value="all">
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {tourismInfo.map((info) => (
                            <TourismCard key={info.id} info={info} />
                        ))}
                    </div>
                </TabsContent>

                {categories.slice(1).map((category) => (
                    <TabsContent key={category.id} value={category.id}>
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {tourismInfo
                                .filter((info) => info.category === category.name)
                                .map((info) => (
                                    <TourismCard key={info.id} info={info} />
                                ))}
                        </div>
                    </TabsContent>
                ))}
            </Tabs>

            {/* Travel Tips */}
            <section className="mt-16 rounded-xl bg-muted p-8">
                <h2 className="mb-6 text-2xl font-bold">旅行のヒント</h2>
                <div className="grid gap-6 md:grid-cols-3">
                    <div className="rounded-lg bg-background p-6 shadow-sm">
                        <h3 className="mb-3 text-lg font-bold">ベストシーズン</h3>
                        <p className="text-sm text-muted-foreground">日本は四季がはっきりとしており、季節ごとに異なる魅力があります。桜の季節（3月下旬~4月）と紅葉の季節（10月下旬~11月）は特に人気です。</p>
                    </div>
                    <div className="rounded-lg bg-background p-6 shadow-sm">
                        <h3 className="mb-3 text-lg font-bold">交通手段</h3>
                        <p className="text-sm text-muted-foreground">日本の公共交通機関は非常に発達しています。長距離移動には新幹線、都市内の移動には地下鉄やバスが便利です。JR PASSは外国人旅行者におすすめです。</p>
                    </div>
                    <div className="rounded-lg bg-background p-6 shadow-sm">
                        <h3 className="mb-3 text-lg font-bold">旅行予算</h3>
                        <p className="text-sm text-muted-foreground">日本旅行の予算は、宿泊施設や食事のグレードによって大きく変わります。一般的に、1日当たり10,000円~30,000円程度を見込んでおくといいでしょう。</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

interface TourismInfo {
    id: number;
    title: string;
    excerpt: string;
    image: string;
    location: string;
    category: string;
}

function TourismCard({ info }: { info: TourismInfo }) {
    return (
        <Card className="overflow-hidden transition-all hover:shadow-lg">
            <div className="relative h-48 w-full">
                <Image
                    src={'/images/India/tajimahal.jpg'}
                    alt={info.title}
                    fill
                    style={{ objectFit: 'cover' }}
                />
            </div>
            <CardContent className="p-6">
                <div className="mb-3">
                    <Badge>{info.category}</Badge>
                </div>
                <h3 className="mb-2 text-xl font-bold">{info.title}</h3>
                <p className="mb-4 text-sm text-muted-foreground">{info.excerpt}</p>
                <div className="flex items-center justify-between">
                    <span className="flex items-center text-xs text-muted-foreground">
                        <MapPin className="mr-1 h-3 w-3" />
                        {info.location}
                    </span>
                    <Link
                        href={`/tourism/${info.id}`}
                        className="flex items-center text-sm font-medium text-primary hover:underline"
                    >
                        詳細を見る
                        <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}

export default TourismPage;
