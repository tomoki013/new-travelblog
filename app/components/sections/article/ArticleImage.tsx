import Image from "next/image";

interface ArticleImageProps {
    src: string;
    alt: string;
}

const ArticleImage = ({ src, alt }: ArticleImageProps) => (
    <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-lg">
        <Image src={src} alt={alt} fill style={{ objectFit: 'cover' }} priority />
    </div>
);

export default ArticleImage;
