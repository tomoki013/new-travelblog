import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Home = () => {
	const featuredPosts = [
		{
			id: 1,
			title: 'kyoto',
			excerpt: 'kyoto',
			image: '/images/India/tajmahal.jpg',
			location: 'kyoto',
			date: '2021-03-16',
			category: 'asia',
		},
	]

	const tourismInfo = [
		{
			id: 1,
			title: 'kyoto',
			excerpt: 'kyoto',
			image: '/images/India/tajmahal.jpg',
			location: 'kyoto',
			date: '2021-03-16',
			category: 'asia',
		},
	]

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

			{/* Featured Posts */}
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
				<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
					{featuredPosts.map((post) => (
						<Card key={post.id} className="overflow-hidden transition-all hover:shadow-lg">
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
										href={`/diary/${post.id}`}
										className="text-sm font-medium text-primary hover:underline"
									>
										続きを読む
									</Link>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
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
					<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
						{tourismInfo.map((info) => (
							<Link key={info.id} href={`/tourism/${info.id}`}>
								<div className="group relative h-64 overflow-hidden rounded-lg">
									<Image
										src={info.image}
										alt={info.title}
										fill
										style={{ objectFit: 'cover' }}
										className="transition-transform duration-300 group-hover:scale-110"
									/>
									<div className="absolute inset-0 bg-gradient-to-tfrom-black/70 to-transparent" />
									<div className="absolute bottom-0 left-0 p-4 text-white">
										<Badge className="mb-2">{info.category}</Badge>
										<h3 className="text-lg font-bold">{info.title}</h3>
									</div>
								</div>
							</Link>
						))}
					</div>
				</div>
			</section>

			{/* Newsletter */}
			<section className="container py-16 mx-auto">
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
			</section>
		</div>
  	);
}

export default Home;
