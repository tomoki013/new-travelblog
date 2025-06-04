import * as Sections from "@/app/components/sections/index";

interface ArticleMobileTocProps {
    navHidden?: string;
}

const ArticleMobileToc = ({ navHidden }: ArticleMobileTocProps) => (
    <div className={`md:hidden mb-4 ${navHidden || ''}`}>
        <div className="max-h-64 overflow-y-auto">
            <Sections.TableOfContents />
        </div>
    </div>
);

export default ArticleMobileToc;
