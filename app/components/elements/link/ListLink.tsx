import Link from "next/link"

interface ListLinkProps {
    href: string;
    children: React.ReactNode;
}

const ListLink = ({
    href,
    children
}: ListLinkProps
) => {
    return (
        <div className="mb-8">
            <Link
                href={href}
                className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
            >
                {children}
            </Link>
        </div>
    );
}

export default ListLink;
