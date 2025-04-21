import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import * as Elements from '@/app/components/elements/index';
import getAllPosts from '@/lib/markdown';

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
    type: 'diary' | 'tourism';
    filter?: 'region';
    filterItem?: React.ReactNode;
}

const Posts = ({
    type,
    filter,
    filterItem
}: PostsProps) => {
    return (
        <Tabs defaultValue="all" className="mb-10">
            <TabsList className="mb-8 grid w-full grid-cols-2 sm:grid-cols-6 h-auto">
                {(type === 'diary' ? diaryCategories : tourismCategories).map(cat => (
                    <TabsTrigger key={cat.id} value={cat.id}>
                        {cat.name}
                    </TabsTrigger>
                ))}
            </TabsList>
            
            <TabsContent value="all">
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {( (type === 'diary' ? getAllPosts('diary') : getAllPosts('tourism'))
                        .filter(post => {
                            if (filter === 'region' && typeof filterItem === 'string') {
                                return post.location.includes(filterItem as string);
                            }
                            return true;
                        })
                    ).map(post => (
                        <Elements.PostCard key={post.slug} post={post} linkPrefix={type} />
                    ))}
                </div>
            </TabsContent>
                
            {(type === 'diary' ? diaryCategories : tourismCategories).map(cat => (
                <TabsContent key={cat.id} value={cat.id}>
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {(() => {
                            const filteredPosts = (type === 'diary' ? getAllPosts('diary') : getAllPosts('tourism'))
                                .filter(post => {
                                    if (filter === 'region' && typeof filterItem === 'string') {
                                        return post.location.includes(filterItem as string) && post.category?.includes(cat.name);
                                    }
                                    return post.category?.includes(cat.name);
                                });
                            if (filteredPosts.length === 0) {
                                return <p className="col-span-full text-center">該当する記事がありません。</p>;
                            }
                            return filteredPosts.map(post => (
                                <Elements.PostCard key={post.slug} post={post} linkPrefix={type} />
                            ));
                        })()}
                    </div>
                </TabsContent>
            ))}
        </Tabs>
    );
}

export default Posts;
