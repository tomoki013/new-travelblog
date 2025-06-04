import * as Sections from "@/app/components/sections/index";

const Home = () => {
    const sections = [
        { Component: Sections.SearchHeroSection },
        { Component: Sections.DiaryPostsHeroSection },
        { Component: Sections.TourismInformationHeroSection },
        { Component: Sections.ItineraryHeroSection },
        { Component: Sections.PhotoGalleryHeroSection },
        { Component: Sections.RouletteHeroSection },
        { Component: Sections.WorldClockHeroSection },
        { Component: Sections.AppHeroSection },
    ];

    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <Sections.HeroSection />

            {sections.map((section, index) => (
                <section
                    key={index}
                    className={`relative overflow-hidden py-16 p-2 ${
                        index % 2 === 0 ? "bg-muted" : ""
                    }`}
                >
                    <section.Component />
                </section>
            ))}

            {/* Newsletter */}
            {/* <section className="container py-16 mx-auto">
                <div className="rounded-xl bg-primary p-8 text-primary-foreground sm:p-12">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="mb-4 text-3xl font-bold">旅の最新情報をお届けします</h2>
                        <p className="mb-6">
                            メールマガジンに登録して、最新の旅行記事や観光情報、お得な旅行情報を受け取りましょう。
                        </p>
                        <form className="flex flex-col gap-3 sm:flex-row">
                            <input
                                type="email"
                                placeholder="メールアドレスを入力"
                                className="flex-1 p-3 rounded-md border border-primary-foreground/20 bg-transparent px-4 py-2 text-primary-foreground placeholder:text-primary-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary-foreground/20"
                                required
                            />
                            <Button variant='secondary'>登録する</Button>
                        </form>
                    </div>
                </div>
            </section> */}
        </div>
    );
};

export default Home;
