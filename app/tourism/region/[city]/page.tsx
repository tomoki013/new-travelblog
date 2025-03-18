import getAllPosts from "@/lib/markdown";
import * as Elements from '@/app/components/elements/index';
import * as Sections from '@/app/components/sections/index';
import { regions } from "@/app/components/sections/regions/FeaturedRegions";

const RegionPage = async (props: { params: Promise<{ city: string }>}) => {
    const params = await props.params;
    const decodedCity = decodeURIComponent(params.city);
    const region = regions.find(region => region.city.toLowerCase() === decodedCity.toLowerCase());

    if (!region) {
        return <div className="flex items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">地域が見つかりません</h1>
        </div>;
    }

    const posts = getAllPosts('tourism');

    return (
        <div className="container py-12">

            <div className="mb-12 text-center">
                <h1 className="mb-4 text-4xl font-bold">{decodedCity}観光情報</h1>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {posts
                    .filter((post) => post.location.includes(decodedCity))
                    .map((post) => (
                        <Elements.PostCard key={post.slug} post={post} />
                    ))
                }
            </div>

            {/* Featured Regions */}
            <Sections.FeaturedRegions />

            <Elements.ListLink href="/tourism">
                観光情報一覧に戻る
            </Elements.ListLink>

        </div>
    );
}

export default RegionPage;
