// app/components/sections/posts/PostList.tsx
import * as Elements from '@/app/components/elements/index';
import { Post } from '@/types/types';

interface PostListProps {
    posts: Post[];
    postCardType?: number; // ポストカードのタイプを指定
    postsGridColsClass?: string; // グリッドの列数を指定するクラス名
    textForIsPosts?: string;
}

export const PostList = ({
    posts,
    postCardType = 1,
    postsGridColsClass = 'sm:grid-cols-2 lg:grid-cols-3',
    textForIsPosts = '該当の記事がありません。',
}: PostListProps) => {
    return (
        <div className={`" grid gap-8 ${postsGridColsClass} "`}>
            {posts.length === 0 ? (
                <p className="text-center col-span-full">{textForIsPosts}</p>
            ) : (
                posts.map(post => (
                    <Elements.PostCard key={post.slug} post={post} linkPrefix={post.type || ''} postCardType={postCardType} />
                ))
            )}
        </div>
    );
};
