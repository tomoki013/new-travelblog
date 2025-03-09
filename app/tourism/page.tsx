import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import getAllPosts from "@/lib/markdown"

const TourismPage = () => {
    const categories = [
        { id: 'all', name: 'すべて' },
        { id: 'sightseeing', name: '観光スポット' },
        { id: 'food', name: 'グルメ' },
        { id: 'accommodation', name: '宿泊施設' },
        { id: 'transportation', name: '交通情報' },
    ]

    // const regions = [
    //     {city: 'パリ', image: '/images/India/tajmahal.jpg'},
    //     {city: 'マドリード', image: '/images/India/tajmahal.jpg'},
    //     {city: 'バンコク', image: '/images/Thai/wat-arun-3.jpg'},
    //     {city: 'デリー', image: '/images/India/tajmahal.jpg'},
    // ]

    const posts = getAllPosts('tourism');

    return (
        <div className="container py-12">
            <div className="mb-12 text-center">
                <h1 className="mb-4 text-4xl font-bold">観光情報</h1>
                <p className="mx-auto max-w-2xl text-muted-foreground">日本各地の観光スポット、グルメ、宿泊施設、交通情報など、旅行計画に役立つ情報をお届けします。</p>
            </div>

            {/* Featured Regions */}
            {/* <section className="mb-16">
                <h2 className="mb-6 text-2xl font-bold">人気の観光地</h2>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                    {regions.map((region) => (
                        <Link key={region.city} href={`/tourism/region/${region.city.toLowerCase()}`}>
                            <div className="group relative h-32 overflow-hidden rounded-lg">
                                <Image
                                    src={region.image}
                                    alt={region.city}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    className="transition-transform duration-300 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/40 transition-opacity group-hover:bg-black/60" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-lg font-bold text-white">{region.city}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section> */}

            {/* Tourism Information Tabs */}
            <Tabs defaultValue="all" className="mb-10">
                <TabsList className="mb-8 grid w-full grid-cols-2 sm:grid-cols-5 h-auto">
                    {categories.map((category) => (
                        <TabsTrigger key={category.id} value={category.id}>
                            {category.name}
                        </TabsTrigger>
                    ))}
                </TabsList>

                <TabsContent value="all">
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {posts.map((post) => (
                            <TourismCard key={post.slug} info={post} />
                        ))}
                    </div>
                </TabsContent>

                {categories.slice(1).map((category) => (
                    <TabsContent key={category.id} value={category.id}>
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {posts
                                .filter((post) => post.category.includes(category.name))
                                .map((post) => (
                                    <TourismCard key={post.slug} info={post} />
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
    slug: string;
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
                    src={info.image}
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
                        href={`/tourism/${info.slug}`}
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
