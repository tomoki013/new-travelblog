import { notFound } from "next/navigation";
import { getPostBySlug } from "./markdown";
import type { PostType } from "@/types/types";

export async function getPostData(type: PostType, slug: string) {
  const post = await getPostBySlug(type, slug);
  if (!post) {
    notFound();
  }
  return post;
}
