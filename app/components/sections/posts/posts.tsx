import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import * as Elements from '@/app/components/elements/index';
import getAllPosts from "@/lib/markdown";

const diaryCategories = [
    {id: 'all', name: 'すべて'},
    {id: 'domestic', name: '国内旅行'},
    {id: 'international', name: '海外旅行'},
    {id: 'singleTrip', name: '一人旅'},
    {id: 'others', name: 'その他'},
]

const tourismCategories = [
    {id: 'all', name: 'すべて'},
    {id: 'sightseeing', name: '観光スポット'},
    {id: 'food', name: 'グルメ'},
    {id: 'accommodation', name: '宿泊施設'},
    {id: 'transportation', name: '交通情報'},
    {id: 'pilgrimage', name: '聖地巡礼'},
]

interface PostsProps {
    type: 'diary' | 'tourism'
    filter?: 'region'
    filterItem?: React.ReactNode
}

const Posts = ({
    type,
    filter,
    filterItem,
}: PostsProps) => {
    // カテゴリーの取得
    const categories = type === 'diary'
        ? diaryCategories : type === 'tourism'
        ? tourismCategories : diaryCategories;

    // 投稿の取得
    const posts = type === 'diary'
        ? getAllPosts('diary') : type === 'tourism'
        ? getAllPosts('tourism') : getAllPosts('diary');

    // filterとfilterItemが存在する場合のみフィルタリング
    const filteredPosts = filter && filterItem
        ? posts.filter((filteredPost) => {
            if (filter === 'region' && typeof filterItem === 'string') {
                return filteredPost.location.includes(filterItem);
            }
            return false;
        })
        : posts;

    return (
        <Tabs defaultValue="all" className="mb-10">
            <TabsList className="mb-8 grid w-full grid-cols-2 sm:grid-cols-6 h-auto">
                {categories.map((category) => (
                    <TabsTrigger key={category.id} value={category.id}>
                        {category.name}
                    </TabsTrigger>
                ))}
            </TabsList>

            <TabsContent value="all">
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredPosts.map((post) => (
                        <Elements.PostCard key={post.slug} post={post} linkPrefix={type} />
                    ))}
                </div>
            </TabsContent>

            {categories.map((category) => (
                <TabsContent key={category.id} value={category.id}>
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredPosts
                            .filter((post) => post.category?.includes(category.name))
                            .map((post) => (
                                <Elements.PostCard key={post.slug} post={post} linkPrefix={type} />
                            ))}
                    </div>
                </TabsContent>
            ))}
        </Tabs>
    );
}

export default Posts;
