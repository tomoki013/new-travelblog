// app/components/sections/posts/PostList.tsx
import * as Elements from '@/app/components/elements/index';
import { Post } from '@/lib/types';

interface PostListProps {
    posts: Post[];
}

export const PostList = ({ posts }: PostListProps) => {
    return (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.length === 0 ? (
                <p className="text-center col-span-full">該当の記事がありません。</p>
            ) : (
                posts.map(post => (
                    <Elements.PostCard key={post.slug} post={post} linkPrefix={post.type || ''} />
                ))
            )}
        </div>
    );
};
