import Image from "next/image";
import Link from "next/link";

export const regions = [
    {city: 'パリ', image: '/images/India/tajmahal.jpg'},
    {city: 'マドリード', image: '/images/India/tajmahal.jpg'},
    {city: 'バンコク', image: '/images/Thai/wat-arun-3.jpg'},
    {city: 'デリー', image: '/images/India/tajmahal.jpg'},
]

const FeaturedRegions = () => {
    return (
        <section className="my-16">
            <h2 className="mb-6 text-2xl font-bold">人気の観光地</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {regions.slice(0, 8).map((region) => (
                    <Link key={region.city} href={`/tourism/region/${region.city.toLowerCase()}`}>
                        <div className="group relative h-32 overflow-hidden rounded-lg">
                            <Image
                                src={region.image}
                                alt={region.city}
                                fill
                                style={{ objectFit: 'cover' }}
                                className="transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/40 transition-opacity group-hover:bg-black/60" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-lg font-bold text-white">{region.city}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}

export default FeaturedRegions;
