import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface TourismInfo {
    slug: string;
    title: string;
    excerpt: string;
    image: string;
    location: string;
    category: string;
}

const TourismCard = ({ info }: { info: TourismInfo }) => {
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

export default TourismCard;
