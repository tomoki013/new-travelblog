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

    return (
        <div className="container py-12">

            <div className="mb-12 text-center">
                <h1 className="mb-4 text-4xl font-bold">{decodedCity}観光情報</h1>
            </div>

            {/* Tourism Information */}
            <Sections.Posts type='tourism' filter='region' filterItem={decodedCity} />

            {/* Featured Regions */}
            <Sections.FeaturedRegions />

            <Elements.ListLink href="/tourism">
                観光情報一覧に戻る
            </Elements.ListLink>

        </div>
    );
}

export default RegionPage;
