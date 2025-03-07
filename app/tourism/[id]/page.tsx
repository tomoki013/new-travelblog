import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@radix-ui/react-select"
import { ArrowLeft, Bookmark, Calendar, Link, MapPin, Share2 } from "lucide-react"
import Image from "next/image"
import { notFound } from "next/navigation"

// This would normally come from a database or API
const tourismInfo = [
    {
      id: 1,
      title: '東京の穴場スポット10選',
      content: `
        <p>観光客が少ない東京の隠れた名所を紹介。地元の人に人気のスポットで本当の東京を体験しよう。</p>
        
        <h2>1. 谷中銀座商店街</h2>
        <p>下町の雰囲気が残る谷中銀座商店街は、昔ながらの日本の商店街の魅力を感じられる場所です。猫好きにはたまらない「谷中猫」の像や、夕焼けだんだんと呼ばれる階段からの眺めも人気です。</p>
        
        <h2>2. 神楽坂</h2>
        <p>石畳の路地と古い建物が残る神楽坂は、フランス文化の影響も受けた独特の雰囲気があります。小さなレストランやカフェ、雑貨店が並び、散策するだけでも楽しめます。</p>
        
        <h2>3. 等々力渓谷</h2>
        <p>都会の中にある自然の宝庫、等々力渓谷。東京23区内とは思えない豊かな自然環境が広がり、マイナスイオンを感じながらハイキングを楽しめます。</p>
        
        <h2>4. 清澄白河エリア</h2>
        <p>近年アートとコーヒーの街として注目を集める清澄白河。古い倉庫をリノベーションしたカフェやギャラリーが点在し、深川江戸資料館では江戸時代の街並みを再現しています。</p>
        
        <h2>5. 旧岩崎邸庭園</h2>
        <p>三菱財閥の創始者・岩崎弥太郎の邸宅跡である旧岩崎邸庭園は、和洋折衷の建築様式が特徴的。都心にありながら静かな時間を過ごせる隠れた名所です。</p>
        
        <h2>6. 向島百花園</h2>
        <p>江戸時代から続く日本最古の花園の一つ、向島百花園。四季折々の花が楽しめ、特に春の桜と秋の紅葉の時期は美しい景色を堪能できます。</p>
        
        <h2>7. 根津神社</h2>
        <p>文京区にある根津神社は、鮮やかな朱色の鳥居が連なる様子が京都の伏見稲荷を思わせます。毎年4月には躑躅（つつじ）祭りが開催され、約3000株のつつじが咲き誇ります。</p>
        
        <h2>8. 大人の秘密基地「森ビル デジタルアートミュージアム：エプソン チームラボ ボーダレス」</h2>
        <p>お台場にあるデジタルアートミュージアムは、最新テクノロジーを駆使した没入型アート体験ができる場所。インスタ映えスポットとしても人気です。</p>
        
        <h2>9. 代官山蔦屋書店</h2>
        <p>単なる書店ではなく、ライフスタイルを提案する場として人気の代官山蔦屋書店。カフェを併設し、ゆったりと本を選んだり読んだりできる空間が魅力です。</p>
        
        <h2>10. 浜離宮恩賜庭園</h2>
        <p>東京湾に面した浜離宮恩賜庭園は、高層ビル群を背景に江戸時代の庭園が広がるという不思議な光景が見られます。水上バスの発着場もあり、隅田川クルーズと組み合わせるのもおすすめです。</p>
      `,
      image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
      location: '東京',
      category: '観光スポット',
      author: '鈴木 一郎',
      authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
      tags: ['東京', '穴場', '観光', 'ローカル'],
      relatedInfo: [3, 5, 8],
      date: '2023-10-01',
      spots: [
        {
          name: '谷中銀座商店街',
          address: '東京都台東区谷中3丁目'
        }
      ]
    }
]

const TourismPage = ({ params }: { params: { id:string } }) => {
    const postId = parseInt(params.id)
    const post = tourismInfo.find(p => p.id === postId)

    if (!post) {
        notFound()
    }

    const relatedPosts = tourismInfo.filter(p => post.relatedInfo.includes(p.id))

    return (
        <div className="container py-12">
            <div className="mb-8">
                <Link
                    href="/diary"
                    className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    旅行日記一覧に戻る
                </Link>
            </div>

            <div className="grid gap-10 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <article>
                        <div className="mb-6">
                            <Badge className="mb-3">{post.category}</Badge>
                            <h1 className="mb-4 text-3xl font-bold sm:text-4xl">{post.title}</h1>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center">
                                    <Calendar className="mr-1 h-4 w-4" />
                                    {post.date}
                                </div>
                                <div className="flex items-center">
                                    <MapPin className="mr-1 h-4 w-4" />
                                    {post.location}
                                </div>
                            </div>
                        </div>

                        <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-lg">
                            <Image
                                src='/images/India/tajimahal.jpg'
                                alt={post.title}
                                fill
                                style={{ objectFit: 'cover' }}
                                priority
                            />
                        </div>

                        <div className="prose prose-lg max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: post.content}} />

                        <div className="mt-8 flex flex-wrap gap-2">
                            {post.tags.map((tag) => (
                                <Badge key={tag} variant='outline'>
                                    #{tag}
                                </Badge>
                            ))}
                        </div>

                        <Separator className="my-8" />

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="relative mr-4 h-10 w-10 overflow-hidden rounded-full">
                                    <Image
                                        src='/images/India/tajimahal.jpg'
                                        alt={post.author}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                                <div>
                                    <p className="text-sm font-medium">{post.author}</p>
                                    <p className="text-xs text-muted-foreground">旅行ブロガー</p>
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <Button variant='outline' size='icon'>
                                    <Share2 className="h-4 w-4" />
                                    <span className="sr-only">シェア</span>
                                </Button>
                                <Button variant='outline' size='icon'>
                                    <Bookmark className="h-4 w-4" />
                                    <span className="sr-only">保存</span>
                                </Button>
                            </div>
                        </div>
                    </article>
                </div>

                <div>
                    <div className="sticky top-20 space-y-8">
                        <div className="rounded-lg border bg-card p-6">
                            <h3 className="mb-4 text-lg font-medium">関連する記事</h3>
                            <div className="space-y-4">
                                {relatedPosts.map((relatedPost) => (
                                    <div key={relatedPost.id} className="flex gap-3">
                                        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                                            <Image
                                                src='/images/India/tajimahal.jpg'
                                                alt={relatedPost.title}
                                                fill
                                                style={{ objectFit: 'cover' }}
                                            />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium">
                                                <Link href={`/diary/${relatedPost.id}`} className="hover:underline">
                                                    {relatedPost.title}
                                                </Link>
                                            </h4>
                                            <p className="text-xs text-muted-foreground">{relatedPost.date}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-lg border bg-card p-6">
                            <h3 className="mb-4 text-lg font-medium">人気のタグ</h3>
                            <div className="flex flex-wrap gap-2">
                                {['京都', '東京', '沖縄', 'ビーチ', '温泉', 'グルメ', '自然', '寺院', '海外', 'リゾート'].map((tag) => (
                                    <Badge key={tag} variant='secondary'>
                                        #{tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TourismPage;
