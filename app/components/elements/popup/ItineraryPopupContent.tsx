import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, CircleDollarSign } from "lucide-react";
import CostBreakdown from "../../sections/itinerary/CostBreakdown";
import { Post } from "@/types/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type CostBreakdownType = { [key: string]: number };
type SummaryType = string | undefined;

type SidebarProps = {
    post: Post & { costs?: CostBreakdownType; summary?: SummaryType };
};

const ItineraryPopupContent = ({ post }: SidebarProps) => (
    <div className="sticky top-16 space-y-8 lg:col-span-1 mb-4">
        <Card>
            <CardHeader>
                <CardTitle>{post.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
            <div className="flex items-center text-sm">
                <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground" />
                <strong>期間:</strong>
                <span className="ml-2">{post.dates.join(' ～ ')}</span>
            </div>
            <div className="flex items-center text-sm">
                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                <strong>場所:</strong>
                <span className="ml-2">{Array.isArray(post.location) ? post.location.join(', ') : post.location}</span>
            </div>
            <div className="flex items-center text-sm">
                <CircleDollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                <strong>総費用:</strong>
                <span className="ml-2 font-bold">{post.budget?.toLocaleString()}円</span>
            </div>
            {post.tags && (
                <div className="flex flex-wrap gap-2 pt-2">
                {post.tags.map(tag => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
                </div>
            )}
            </CardContent>
        </Card>
        {post.costs && <CostBreakdown costs={post.costs} />}
        <Button asChild className="w-full">
            <Link href={`/${post.type}/${post.slug}`}>この記事を見る</Link>
        </Button>
    </div>
);

export default ItineraryPopupContent;
