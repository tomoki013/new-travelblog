import * as Server from "@/app/components/server/index";

const ArticleMobileToc = () => (
    <div className='md:hidden mb-4'>
        <div className="max-h-64 overflow-y-auto">
            <Server.TableOfContents />
        </div>
    </div>
);

export default ArticleMobileToc;
