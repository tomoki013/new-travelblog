import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import * as Elements from '@/app/components/elements/index';
import getAllPosts from "@/lib/markdown";

const diaryCategories = [
    {id: 'all', name: 'すべて'},
    {id: 'domestic', name: '国内旅行'},
    {id: 'international', name: '海外旅行'},
]

const tourismCategories = [
    {id: 'all', name: 'すべて'},
    {id: 'sightseeing', name: '観光スポット'},
    {id: 'food', name: 'グルメ'},
    {id: 'accommodation', name: '宿泊施設'},
    {id: 'transportation', name: '交通情報'},
]

interface PostsProps {
    type: 'diary' | 'tourism'
}

const Posts = ({
    type
}: PostsProps) => {
    const categories = type === 'diary' ?  diaryCategories : type === 'tourism' ? tourismCategories : diaryCategories;
    console.log(categories);
    const posts = type === 'diary' ? getAllPosts('diary') : type === 'tourism' ? getAllPosts('tourism') : getAllPosts('diary');

    return (
        <Tabs defaultValue="all" className="mb-10">
            <TabsList className="mb-8 grid w-full grid-cols-2 sm:grid-cols-5 h-auto">
                {categories.map((category) => (
                    <TabsTrigger key={category.id} value={category.id}>
                        {category.name}
                    </TabsTrigger>
                ))}
            </TabsList>

            <TabsContent value="all">
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post) => (
                        <Elements.PostCard key={post.slug} post={post} />
                    ))}
                </div>
            </TabsContent>

            {categories.map((category) => (
                <TabsContent key={category.id} value={category.id}>
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {posts
                            .filter((post) => post.category?.includes(category.name))
                            .map((post) => (
                                <Elements.PostCard key={post.slug} post={post} />
                            ))}
                    </div>
                </TabsContent>
            ))}
        </Tabs>
    );
}

export default Posts;
