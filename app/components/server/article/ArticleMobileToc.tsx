import * as Sections from "@/app/components/sections/index";

const ArticleMobileToc = () => (
    <div className='md:hidden mb-4'>
        <div className="max-h-64 overflow-y-auto">
            <Sections.TableOfContents />
        </div>
    </div>
);

export default ArticleMobileToc;
