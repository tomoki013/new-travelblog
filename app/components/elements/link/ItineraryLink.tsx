import Link from "next/link"

const ItineraryLink = () => {
    return (
        <Link
            href={"/itinerary"}
            className={`relative block w-full max-w-full h-28 md:h-32 rounded-2xl overflow-hidden overflow-x-hidden group shadow-lg mt-2`}
        >
            {/* 背景画像 */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-101 z-10"
                style={{ backgroundImage: "url('/images/Thai/emotional-wat-arun.jpg')" }}
            ></div>

            {/* テキスト */}
            <div className="absolute inset-0 flex items-center justify-center gap-4 z-11">
                <span className="text-white text-3xl font-bold drop-shadow-md">
                    旅程＆費用レポート公開中！
                </span>
                <span className="flex items-center text-white text-base font-semibold mt-2 underline group cursor-pointer transition-transform duration-300">
                    click here
                    <span className="ml-2 inline-block transform group-hover:translate-x-2 transition-transform duration-300">
                        {/* 矢印アイコン（SVG） */}
                        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </span>
                </span>
            </div>
        </Link>
    )
}

export default ItineraryLink;
