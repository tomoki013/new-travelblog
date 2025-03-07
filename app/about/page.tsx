import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Globe, MapPin, Users } from "lucide-react"
import Image from "next/image";
import Link from "next/link";

const AboutPage = () => {
    const features = [
        {
          icon: <MapPin className="h-8 w-8" />,
          title: '旅行記事',
          description: '日本全国と世界各地の旅行体験を詳しく紹介します。',
        },
        {
          icon: <Users className="h-8 w-8" />,
          title: 'コミュニティ',
          description: '旅行好きが集まり、情報交換できる場を提供します。',
        },
        {
          icon: <Camera className="h-8 w-8" />,
          title: '写真ギャラリー',
          description: '美しい風景や思い出の瞬間を写真で共有します。',
        },
        {
          icon: <Globe className="h-8 w-8" />,
          title: '観光情報',
          description: '役立つ観光スポット情報やローカルな情報を発信します。',
        },
    ]
    
    const team = [
        {
          name: '山田 太郎',
          role: '編集長',
          image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          description: '10年以上の旅行ライター経験を持ち、50カ国以上を訪問。',
        },
        {
          name: '佐藤 美咲',
          role: 'フォトグラファー',
          image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          description: 'プロフェッショナルフォトグラファーとして、世界中の絶景を撮影。',
        },
        {
          name: '田中 健一',
          role: '観光情報ライター',
          image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          description: '国内の隠れた名所を探求し、詳細な観光情報を提供。',
        },
    ]

    return (
        <div className="flex flex-col">

            {/* Hero Section */}
            <section className="relative h-[50vh] w-full">
                <div className="absolute inset-0">
                    <Image
                        src='/images/India/tajmahal.jpg'
                        alt=""
                        fill
                        style={{ objectFit: 'cover'}}
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40" />
                </div>
                <div className="container relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
                    <h1 className="mb-4 text-4xl font-bold sm:text-5xl">旅の記録と発見の物語</h1>
                    <p className="mb-6 max-w-2xl text-lg">私たちは、旅を通じて得られる新しい発見や感動を、より多くの人々と共有することを目指しています。</p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="container py-16">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="mb-4 text-3xl font-bold">私たちのミッション</h2>
                    <p className="mb-8 text0lg text-muted-foreground">旅行を通じて、人々の視野を広げ、異文化理解を深め、かけがえのない思い出作りのお手伝いをすることです。私たちは、詳細な旅行情報と美しい写真で、あなたの次の旅行のインスピレーションを提供します。</p>
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {features.map((feature) => (
                            <Card key={feature.title}>
                                <CardContent className="flex flex-col items-center p-6 text-center">
                                    <div className="mb-4 text-primary">{feature.icon}</div>
                                    <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
                                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="bg-muted py-16">
                <div className="container">
                    <h2 className="mb-12 text-center text-3xl font-bold">チームメンバー</h2>
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {team.map((member) => (
                            <Card key={member.name} className="overflow-hidden">
                                <div className="relative h-64 w-full">
                                    <Image
                                        src='/images/India/tajmahal.jpg'
                                        alt=""
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                                <CardContent className="p-6">
                                    <h3 className="mb-1 text-xl font-bold">{member.name}</h3>
                                    <p className="mb-3 text-sm text-primary">{member.role}</p>
                                    <p className="text-muted-foreground">{member.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="container py-16">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="mb-4 text-3xl font-bold">お問い合わせ</h2>
                    <p className="mb-8 text-lg text-muted-foreground">取材依頼、広告掲載、コラボレーションなど、お気軽にお問い合わせください。</p>
                    <Button asChild size='lg'>
                        <Link href='/contact' className="inline-flex items-center">
                            お問い合わせはこちら
                        </Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}

export default AboutPage;
