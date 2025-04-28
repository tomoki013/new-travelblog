import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Globe, MapPin, Users } from "lucide-react"
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { members } from "@/lib/member";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
    title: 'ともきちの旅行日記｜About-旅の記録と発見の物語',
    description: 'ともきちの旅行日記「About」ページでは、旅の感動や発見を共有するミッションについてご紹介。私たちは、詳細な旅行記事、美しい写真、実用的な観光情報を通じて、あなたの次の冒険のインスピレーションを提供します。取材依頼やコラボレーションもお気軽にどうぞ。',
}

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
                            <Card key={feature.title} className="overflow-hidden shadow-md transition-transform duration-300 hover:scale-105">
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
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 p-4">
                        {members.map((member) => (
                            <Card key={member.name} className="overflow-hidden">
                                <div className="relative h-64 w-full">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                                <CardContent className="p-6">
                                    <h3 className="mb-1 text-xl font-bold">{member.name}</h3>
                                    <Badge className="mb-3">{member.role}</Badge>
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
