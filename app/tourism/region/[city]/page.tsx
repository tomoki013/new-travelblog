import * as Elements from '@/app/components/elements/index';
import * as Sections from '@/app/components/sections/index';
import { regions } from '@/data/regions';
import { Metadata } from 'next';

export async function generateMetadata(props: { params: Promise<{ city: string }>}): Promise<Metadata> {
    const params = await props.params;
    const decodedCity = await decodeURIComponent(params.city);

    const metadata = regions.find(region => region.city.toLowerCase() === decodedCity.toLowerCase());

    if (metadata) {
        return {
            title: metadata.title,
            description: metadata.description,
            openGraph: {
                title: metadata.title,
                description: metadata.description,
                images: [
                    {
                        url: metadata.images[0] || '/favicon.ico',
                        width: 1200,
                        height: 630,
                        alt: metadata.title,
                    },
                ],
            },
            twitter: {
                title: metadata.title,
                description: metadata.description,
                images: [metadata.images[0] || '/favicon.ico'],
            },
        };
    }

    return {
        title: '地域情報',
        description: '指定された地域の観光情報が見つかりませんでした。',
    };
}

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
        <div>
            <div className="relative h-[70vh] w-full mb-2">
                <Elements.Slide
                    showControls={false}
                    showIndicators={false}
                    imageType={decodedCity}
                />
                <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
                    <h1 className="mb-4 text-4xl font-bold font-serif tracking-wide drop-shadow-lg">
                        {decodedCity}観光情報
                    </h1>
                </div>
            </div>
            <div className='container py-12'>
                {/* Tourism Information */}
                <Sections.Posts
                    apiFetchType='tourism'
                    specificFilterType='region'
                    specificFilterValue={decodedCity}
                    tabsGridColsClass='sm:grid-cols-2 md:grid-cols-6'
                />
                {/* Featured Regions */}
                <Sections.FeaturedRegions />
                <Elements.ListLink href="/tourism">
                    観光情報一覧に戻る
                </Elements.ListLink>
            </div>
        </div>
    );
}

export default RegionPage;
