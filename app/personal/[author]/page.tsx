import * as Sections from "@/app/components/sections/index";
import { members } from "@/lib/member";

const AuthorPage = async (props: { params: { author: string } }) => {
    const params = await props.params;
    const decodedAuthor = await decodeURIComponent(params.author).replace(/\}$/g, ''); // 余分な`}`を削除
    const authorMember = members.find((member) => member.name === decodedAuthor);

    return (
        <div className="container py-12">
            <div className="mb-12 text-center">
                <h1 className="mb-4 text-4xl font-bold">{authorMember?.name}</h1>
                <p className="mx-auto max-w-2xl text-muted-foreground">{authorMember?.description}</p>
            </div>

            <Sections.Posts type="all" filter="author" filterItem={decodedAuthor} />

        </div>
    );
};

export default AuthorPage;
