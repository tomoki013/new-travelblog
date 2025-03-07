import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@radix-ui/react-select"
import { ArrowLeft, Bookmark, Calendar, Link, MapPin, Share2 } from "lucide-react"
import Image from "next/image"
import { notFound } from "next/navigation"

// This would normally come from a database or API
const posts = [
    {
      id: 1,
      title: '京都の紅葉シーズンを満喫する旅',
      content: `
        <p>古都京都で体験した美しい紅葉と歴史的な寺院巡りの記録。嵐山の竹林や金閣寺など、京都の秋の魅力を紹介します。</p>
        
        <h2>京都の紅葉の見頃</h2>
        <p>京都の紅葉は例年11月中旬から下旬にかけてが見頃です。特に北部の寺院から色づき始め、徐々に市街地へと広がっていきます。今回の旅では11月15日から3日間、京都に滞在しました。</p>
        
        <h2>嵐山の竹林と渡月橋</h2>
        <p>最初に訪れたのは嵐山エリア。竹林の小径は早朝に訪れることで、観光客が少ない静かな雰囲気を楽しむことができました。竹林を抜けると渡月橋があり、保津川と紅葉のコントラストが美しい景色を堪能できます。</p>
        
        <h2>金閣寺（鹿苑寺）</h2>
        <p>金閣寺は京都を代表する観光スポットの一つです。金箔で覆われた三層の楼閣が池に映り込む姿は、紅葉シーズンにはさらに美しさを増します。早めの時間帯に訪れることをおすすめします。</p>
        
        <h2>東福寺の紅葉</h2>
        <p>東福寺は京都屈指の紅葉の名所です。特に通天橋から見下ろす景色は圧巻で、赤や黄色に色づいた木々が谷を埋め尽くします。週末は非常に混雑するので、平日の訪問がおすすめです。</p>
        
        <h2>京都でのグルメ体験</h2>
        <p>京都滞在中は地元の食文化も楽しみました。湯豆腐、京懐石、抹茶スイーツなど、季節の食材を使った料理の数々は旅の大きな楽しみの一つでした。特に祇園エリアの老舗料亭での夕食は忘れられない思い出です。</p>
        
        <h2>まとめ</h2>
        <p>京都の紅葉シーズンは観光客で賑わいますが、その美しさは混雑を忘れさせてくれるほど素晴らしいものです。次回は少し早めの11月上旬か、遅めの12月初旬に訪れて、違った表情の京都を楽しみたいと思います。</p>
      `,
      image: 'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
      location: '京都府',
      date: '2023年11月15日',
      category: '国内旅行',
      author: '山田 花子',
      authorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
      tags: ['京都', '紅葉', '寺院', '日本文化'],
      relatedPosts: [3, 5, 8],
    },
    {
      id: 2,
      title: 'バリ島のビーチリゾートでリラックス',
      content: `
        <p>インドネシアのバリ島で過ごした贅沢なリゾート体験。美しいビーチ、現地の文化、おすすめのスパなどを紹介します。</p>
        
        <h2>バリ島について</h2>
        <p>バリ島はインドネシアに位置する人気のリゾート地です。美しいビーチ、独特の文化、豊かな自然環境が魅力で、世界中から観光客が訪れます。</p>
        
        <h2>滞在したリゾート</h2>
        <p>今回はウブド近郊の高級リゾートに5泊しました。プライベートプールつきのヴィラで、ジャングルの中に位置しながらも快適な滞在を楽しむことができました。</p>
        
        <h2>バリの文化体験</h2>
        <p>バリ島ではヒンドゥー教の影響を受けた独自の文化が発展しています。滞在中は伝統舞踊のケチャダンスを鑑賞したり、地元の寺院を訪れたりして文化に触れる機会を持ちました。</p>
        
        <h2>おすすめのビーチ</h2>
        <p>バリ島には数多くのビーチがありますが、特におすすめなのはクタビーチとヌサドゥアビーチです。クタビーチはサーフィンに適した波があり、ヌサドゥアは穏やかな海と白い砂浜が魅力です。</p>
        
        <h2>バリ料理の魅力</h2>
        <p>バリ料理はスパイシーで香り高いのが特徴です。ナシゴレン（炒飯）、ミーゴレン（焼きそば）、サテ（串焼き）などの定番料理から、バビグリン（子豚の丸焼き）などの特別料理まで様々な味を楽しみました。</p>
        
        <h2>まとめ</h2>
        <p>バリ島は自然、文化、食事、アクティビティのバランスが取れた素晴らしいリゾート地です。次回はもう少し長期滞在して、島の北部や東部など、まだ訪れていないエリアも探索してみたいと思います。</p>
      `,
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
      location: 'インドネシア',
      date: '2023年8月5日',
      category: '海外旅行',
      author: '佐藤 太郎',
      authorImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
      tags: ['バリ島', 'ビーチ', 'リゾート', 'インドネシア'],
      relatedPosts: [4, 6, 9],
    },
]

const DiaryPage = ({ params }: { params: { id:string } }) => {
    const postId = parseInt(params.id)
    const post = posts.find(p => p.id === postId)

    if (!post) {
        notFound()
    }

    const relatedPosts = posts.filter(p => post.relatedPosts.includes(p.id))

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

export default DiaryPage;
