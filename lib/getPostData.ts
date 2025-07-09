import { notFound } from "next/navigation";
import { getPostBySlug, PostType } from "./markdown";

export async function getPostData(type: PostType, slug: string) {
    const post = await getPostBySlug(type, slug);
    if (!post) {
        notFound();
    }
    return post;
}
