import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { members } from "@/lib/member";
import Image from "next/image";
import Link from "next/link";

const personalPage = () => {
    return (
        <div className="container py-12">
            <div className="text-center">
                <h1 className="mb-4 text-4xl font-bold">著者一覧</h1>
                <p className="mx-auto max-w-2xl text-muted-foreground">本ブログの著者一覧</p>
            </div>

            <section className="py-16">
                <div className="container">
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 p-4">
                        {members.map((member) => (
                            <Link href={`/personal/${member.name}`} key={member.name} className="group hover:shadow-lg">
                                <Card className="overflow-hidden">
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
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    )
}

export default personalPage;
