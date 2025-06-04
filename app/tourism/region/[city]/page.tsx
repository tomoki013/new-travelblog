import * as Elements from '@/app/components/elements/index';
import * as Sections from '@/app/components/sections/index';
import { regions } from '@/data/cities';
import { Metadata } from 'next';
import Image from 'next/image';

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
                        url: metadata.image || '/favicon.ico',
                        width: 1200,
                        height: 630,
                        alt: metadata.title,
                    },
                ],
            },
            twitter: {
                title: metadata.title,
                description: metadata.description,
                images: [metadata.image || '/favicon.ico'],
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
        <div className="container py-12">
            {/* 地域画像 */}
            <div className="flex justify-center mb-8">
                <div className="relative w-full max-w-xl h-72">
                    <Image
                        src={region.image || '/favicon.ico'}
                        alt={region.title || decodedCity}
                        className="rounded-lg shadow-lg object-cover"
                        fill
                        sizes="(max-width: 768px) 100vw, 600px"
                        priority
                    />
                </div>
            </div>
            <div className="mb-12 text-center">
                <h1 className="mb-4 text-4xl font-bold">{decodedCity}観光情報</h1>
            </div>
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
    );
}

export default RegionPage;
