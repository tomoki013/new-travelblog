import * as Elements from "@/app/components/elements/index";
import * as Sections from '@/app/components/sections/index';
import { members } from "@/data/member";
import Image from "next/image";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPostTypes } from "@/lib/markdown";

// 動的にメタデータを生成
export async function generateMetadata(props: { params: Promise<{ author: string }>}): Promise<Metadata> {
    const params = await props.params;
    const decodedAuthor = decodeURIComponent(params.author).replace(/\}$/g, '');
    const authorMember = members.find((member) => member.name === decodedAuthor);
    if (!authorMember) {
        notFound();
    }
    return {
        title: '著者紹介: ' + authorMember.name,
        description: authorMember.description,
        authors: [{ name: authorMember.name }],
        openGraph: {
            title: '著者紹介: ' + authorMember.name,
            description: authorMember.description,
            images: [
                {
                    url: authorMember.image,
                    width: 1200,
                    height: 630,
                    alt: authorMember.name,
                },
            ],
        },
        twitter: {
            title: '著者紹介: ' + authorMember.name,
            description: authorMember.description,
            images: [authorMember.image],
        },
    };
}

const AuthorPage = async (props: { params: Promise<{ author: string }>}) => {
    const params = await props.params;
    const decodedAuthor = decodeURIComponent(params.author).replace(/\}$/g, ''); // 余分な`}`を削除
    const authorMember = members.find((member) => member.name === decodedAuthor);

    const allPosts = getAllPostTypes();

    return (
        <div className="container py-12">
            <div className="mb-12 flex flex-col md:flex-row justify-center items-center gap-8">
                <div className="flex-shrink-0 flex justify-center mb-4 md:mb-0">
                    <div className="relative w-48 h-48">
                        <Image
                            src={authorMember?.image || '/favicon.ico'}
                            alt={authorMember?.name || 'ともきちの旅行日記'}
                            className="rounded-full shadow-lg object-cover"
                            fill
                            sizes="192px"
                            priority
                        />
                    </div>
                </div>
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <h1 className="mb-4 text-4xl font-bold">{authorMember?.name}</h1>
                    <p className="mx-auto md:mx-0 max-w-2xl text-muted-foreground">{authorMember?.description}</p>
                </div>
            </div>
            <div className="flex justify-center mb-8">
                <Elements.ListLink href="/personal">
                    著者一覧へ
                </Elements.ListLink>
            </div>
            <Sections.Posts
                initialPosts={allPosts}
                postFilterType="all"
                specificFilterType="author"
                specificFilterValue={decodedAuthor}
                tabsGridColsClass="sm:grid-cols-2 md:grid-cols-4"
            />
        </div>
    );
};

export default AuthorPage;
