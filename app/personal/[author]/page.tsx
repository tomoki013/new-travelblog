import * as Elements from "@/app/components/elements/index";
import * as Sections from "@/app/components/sections/index";
import { members } from "@/data/member";
import Image from "next/image";
import { Metadata } from "next";
import { notFound } from "next/navigation";

// 動的にメタデータを生成
export async function generateMetadata(
    { params }: { params: { author: string } }
): Promise<Metadata> {
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

    return (
        <div className="container py-12">
            <div className="mb-12 flex justify-center items-center gap-4">
                <div className="mb-4 flex justify-center">
                    <Image
                        src={authorMember?.image || "/favicon.ico"}
                        alt={authorMember?.name || "ともきちの旅行日記"}
                        width={100}
                        height={100}
                        className="rounded-full object-cover"
                    />
                </div>
                <div className="flex flex-col items-center">
                    <h1 className="mb-4 text-4xl font-bold">{authorMember?.name}</h1>
                    <p className="mx-auto max-w-2xl text-muted-foreground">{authorMember?.description}</p>
                </div>
            </div>

            <div className="flex justify-center">
                <Elements.ListLink href="/personal">
                    著者一覧へ
                </Elements.ListLink>
            </div>

            <Sections.Posts type="all" filter="author" filterItem={decodedAuthor} gridColsClass="sm:grid-cols-4" />

        </div>
    );
};

export default AuthorPage;
