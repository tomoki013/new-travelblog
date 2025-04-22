'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Calculator, Calendar, Camera, Clock, Compass, MapPin, Receipt } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import * as Elements from "@/app/components/elements/index";

interface Post {
    slug: string;
    image: string;
    title: string;
    category: string;
    date: string;
    excerpt: string;
    location: string;
}

const Home = () => {
    const [diaryPosts, setDiaryPosts] = useState<Post[]>([]);
    const [tourismPosts, setTourismPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true); // ローディング状態を管理

    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true); // ローディング開始
            const diaryResponse = await fetch('/api/posts?type=diary');
            const tourismResponse = await fetch('/api/posts?type=tourism');
            const diaryData = await diaryResponse.json();
            const tourismData = await tourismResponse.json();
            setDiaryPosts(diaryData.posts);
            setTourismPosts(tourismData.posts);
            setIsLoading(false); // ローディング終了
        };

        fetchPosts();
    }, []);

    return (
        <div className="flex flex-col">
            
            {/* ヒーローセクション */}
            <section className="relative h-[70vh] w-full">
                <div className="absolute inset-0">
                    <Image
                        src="/images/India/tajmahal.jpg"
                        alt=""
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40" />
                </div>
                <div className="container relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
                    <h1 className="mb-4 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
                        旅の記録と発見の物語
                    </h1>
                    <p className="mb-8 max-w-2xl text-lg sm:text-xl">
                        日本と世界の美しい風景、文化、食べ物を通じて、新しい旅の発見をお届けします
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button asChild size="lg">
                            <Link href='/diary'>旅行日記を読む</Link>
                        </Button>
                        <Button asChild variant='outline' size="lg" className="bg-transparent text-white hover:bg-white hover:text-black">
                            <Link href='/tourism'>観光情報を見る</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Roulette Hero Section */}
            <section className="relative overflow-hidden bg-muted py-16 p-2">
                <div className="container relative z-10">
                    <div className="grid items-center gap-8 lg:grid-cols-2 p-2">
                        <div>
                            <Badge className="mb-4">New Feature</Badge>
                            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
                                次の旅行先が決まらない？<br />
                                旅行先ルーレットで運命の場所を見つけよう！
                            </h2>
                            <p className="mb-6 text-lg text-muted-foreground">
                                行き先に迷ったら、ルーレットを回して運命の旅行先を見つけましょう。
                                選ばれた場所に関連する情報や記事もご紹介します。思いがけない発見があるかもしれません。
                            </p>
                            <Button asChild size="lg">
                                <Link href="/roulette" className="inline-flex items-center">
                                    <Compass className="mr-2 h-5 w-5" />
                                    ルーレットを回す
                                </Link>
                            </Button>
                        </div>
                        <div className="relative">
                            <div className="relative aspect-square max-w-md overflow-hidden rounded-full border-8 border-primary/20">
                                <Image
                                    src="/images/France/eiffel-tower-4.jpg"
                                    alt="エッフェル塔と夕陽"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                    <div className="text-center text-white">
                                        <Compass className="mb-4 h-16 w-16" />
                                        <p className="text-xl font-bold">どこへ行く？</p>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute -right-4 -top-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                <span className="text-sm font-bold">NEW!</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Diary Posts */}
            <section className="container py-16 p-2">
                <div className="mb-10 flex items-center justify-between">
                    <h2 className="text-3xl font-bold">最新の旅行日記</h2>
                    <Link
                        href='/diary'
                        className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary"
                    >
                        すべての記事を見る
                        <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                </div>
                {isLoading ? ( // ローディング中はスピナーを表示
                    <Elements.LoadingAnimation />
                ) : (
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {diaryPosts.slice(0, 3).map((post) => (
                            <Card key={post.slug} className="overflow-hidden transition-all hover:shadow-lg">
                                <div className="relative h-48 w-full">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                                <CardContent className="p-6">
                                    <div className="mb-3 flex items-center justify-between">
                                        <Badge variant='outline'>{post.category}</Badge>
                                        <span className="flex items-center text-xs text-muted-foreground">
                                            <Calendar className="mr-1 h-3 w-3" />
                                            {post.date}
                                        </span>
                                    </div>
                                    <h3 className="mb-2 text-xl font-bold">{post.title}</h3>
                                    <p className="mb-2 text-sm text-muted-foreground">{post.excerpt}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="flex items-center text-xs text-muted-foreground">
                                            <MapPin className="mr-1 h-3 w-3" />
                                            {post.location}
                                        </span>
                                        <Link
                                            href={`/diary/${post.slug}`}
                                            className="text-sm font-medium text-primary hover:underline"
                                        >
                                            続きを読む
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </section>

            {/* Tourism Information */}
            <section className="bg-muted py-16 p-2">
                <div className="container">
                    <div className="mb-10 flex items-center justify-between">
                        <h2 className="text-3xl font-bold">観光情報</h2>
                        <Link
                            href='/tourism'
                            className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary"
                        >
                            すべての記事を見る
                            <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                    </div>
                    {isLoading ? ( // ローディング中はスピナーを表示
                        <Elements.LoadingAnimation />
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {tourismPosts.slice(0, 8).map((info) => (
                                <Link key={info.slug} href={`/tourism/${info.slug}`}>
                                    <div className="group relative h-64 overflow-hidden rounded-lg">
                                        <Image
                                            src={info.image}
                                            alt={info.title}
                                            fill
                                            style={{ objectFit: 'cover' }}
                                            className="transition-transform duration-300 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                        <div className="absolute bottom-0 left-0 p-4 text-white">
                                            <Badge className="mb-2">{info.category}</Badge>
                                            <h3 className="text-lg font-bold">{info.title}</h3>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Photo Gallery Hero Section */}
            <section className="relative overflow-hidden py-16">
                <div className="container relative z-10">
                    <div className="grid items-center gap-8 lg:grid-cols-2">
                        <div>
                            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
                                美しい瞬間を写真で共有
                            </h2>
                            <p className="mb-6 text-lg text-muted-foreground">
                                旅先で出会った絶景や思い出の風景を写真ギャラリーでご覧いただけます。
                                日本各地の四季折々の表情や、世界の絶景をお楽しみください。
                            </p>
                            <Button asChild size="lg">
                                <Link href="/gallery" className="inline-flex items-center">
                                    <Camera className="mr-2 h-5 w-5" />
                                    ギャラリーを見る
                                </Link>
                            </Button>
                        </div>
                        <div className="grid gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="relative aspect-square overflow-hidden rounded-lg">
                                    <Image
                                        src="/images/India/tajmahal.jpg"
                                        alt="タージマハル"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                                <div className="relative aspect-square overflow-hidden rounded-lg">
                                    <Image
                                        src="/images/Spain/toledo-view-1.jpg"
                                        alt="トレド旧市街の景色"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            </div>
                            <div className="relative aspect-video overflow-hidden rounded-lg">
                                <Image
                                    src="/images/France/eiffel-tower-4.jpg"
                                    alt="夕陽とエッフェル塔"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* World Clock Hero Section */}
            <section className="relative overflow-hidden bg-muted py-16">
                <div className="container relative z-10">
                    <div className="grid items-center gap-8 lg:grid-cols-2">
                        <div className="lg:order-2">
                            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
                                世界の時刻を一目で確認
                            </h2>
                            <p className="mb-6 text-lg text-muted-foreground">
                                海外旅行の計画や、海外の友人との連絡に便利な世界時計。
                                主要都市の現地時刻をリアルタイムで確認できます。
                            </p>
                            <Button asChild size="lg">
                                <Link href="/clock" className="inline-flex items-center">
                                    <Clock className="mr-2 h-5 w-5" />
                                    世界時計を見る
                                </Link>
                            </Button>
                        </div>
                        <div className="grid gap-4 lg:order-1">
                            <div className="grid grid-cols-2 gap-4">
                                <Card className="p-4">
                                    <h3 className="mb-2 text-sm font-medium">東京</h3>
                                    <p className="text-2xl font-bold">21:00</p>
                                </Card>
                                <Card className="p-4">
                                    <h3 className="mb-2 text-sm font-medium">ニューヨーク</h3>
                                    <p className="text-2xl font-bold">07:00</p>
                                </Card>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <Card className="p-4">
                                    <h3 className="mb-2 text-sm font-medium">ロンドン</h3>
                                    <p className="text-2xl font-bold">12:00</p>
                                </Card>
                                <Card className="p-4">
                                    <h3 className="mb-2 text-sm font-medium">シドニー</h3>
                                    <p className="text-2xl font-bold">23:00</p>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Travel Tools Hero Section */}
            <section className="relative overflow-hidden py-16">
                <div className="container relative z-10">
                    <h2 className="mb-8 text-center text-3xl font-bold sm:text-4xl">
                        旅行に便利な計算ツール
                    </h2>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        <Card className="overflow-hidden">
                            <Link href="/calculator/expense">
                                <div className="p-6">
                                    <Calculator className="mb-4 h-8 w-8 text-primary" />
                                    <h3 className="mb-2 text-xl font-bold">旅費計算</h3>
                                    <p className="mb-4 text-sm text-muted-foreground">
                                        グループ旅行の費用を簡単に割り勘計算。カテゴリー別に管理して、公平な費用分担を実現します。
                                    </p>
                                    <span className="text-sm font-medium text-primary">
                                        計算ツールを使う
                                        <ArrowRight className="ml-1 inline-block h-4 w-4" />
                                    </span>
                                </div>
                            </Link>
                        </Card>
                        {/* <Card className="overflow-hidden">
                            <Link href="/calculator/currency">
                                <div className="p-6">
                                    <DollarSign className="mb-4 h-8 w-8 text-primary" />
                                    <h3 className="mb-2 text-xl font-bold">為替計算</h3>
                                    <p className="mb-4 text-sm text-muted-foreground">
                                        主要通貨間の為替レートを簡単に計算。旅行前の予算計画や、現地での支出管理に便利です。
                                    </p>
                                    <span className="text-sm font-medium text-primary">
                                        計算ツールを使う
                                        <ArrowRight className="ml-1 inline-block h-4 w-4" />
                                    </span>
                                </div>
                            </Link>
                        </Card> */}
                        <Card className="overflow-hidden">
                            <Link href="/calculator/tax">
                                <div className="p-6">
                                    <Receipt className="mb-4 h-8 w-8 text-primary" />
                                    <h3 className="mb-2 text-xl font-bold">税金計算</h3>
                                    <p className="mb-4 text-sm text-muted-foreground">
                                        商品やサービスの税込価格を簡単に計算。異なる税率にも対応し、正確な支払額を把握できます。
                                    </p>
                                    <span className="text-sm font-medium text-primary">
                                        計算ツールを使う
                                        <ArrowRight className="ml-1 inline-block h-4 w-4" />
                                    </span>
                                </div>
                            </Link>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            {/* <section className="container py-16 mx-auto">
                <div className="rounded-xl bg-primary p-8 text-primary-foreground sm:p-12">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="mb-4 text-3xl font-bold">旅の最新情報をお届けします</h2>
                        <p className="mb-6">
                            メールマガジンに登録して、最新の旅行記事や観光情報、お得な旅行情報を受け取りましょう。
                        </p>
                        <form className="flex flex-col gap-3 sm:flex-row">
                            <input
                                type="email"
                                placeholder="メールアドレスを入力"
                                className="flex-1 p-3 rounded-md border border-primary-foreground/20 bg-transparent px-4 py-2 text-primary-foreground placeholder:text-primary-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary-foreground/20"
                                required
                            />
                            <Button variant='secondary'>登録する</Button>
                        </form>
                    </div>
                </div>
            </section> */}

        </div>
    );
}

export default Home;
