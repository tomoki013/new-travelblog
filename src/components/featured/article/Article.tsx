import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Post } from "@/types/types";
import { getAllPostTypes } from "@/lib/markdown";
import { createCustomHeading, CustomImg, CustomLink } from "./CustomMarkdown";

interface ArticleContentProps {
  content: string;
  currentPostType: Post["type"]; // 現在の記事のタイプを受け取る
}

const ArticleContent = ({ content, currentPostType }: ArticleContentProps) => {
  const allPosts = getAllPostTypes();

  const markdownComponents: Components = {
    h2: (props) =>
      createCustomHeading({ level: 2 })({
        ...props,
        node: props.node,
        children: props.children,
      }),
    h3: (props) =>
      createCustomHeading({ level: 3 })({
        ...props,
        node: props.node,
        children: props.children,
      }),
    // aタグにpropsを追加で渡すため、アロー関数でラップする
    a: (props: React.ComponentProps<"a">) => (
      <CustomLink
        {...props}
        href={props.href ?? ""}
        allPosts={allPosts}
        currentPostType={currentPostType}
      >
        {props.children}
      </CustomLink>
    ),
    img: (props) => {
      const { src, alt, ...rest } = props;
      return (
        <CustomImg
          src={typeof src === "string" ? src : ""}
          alt={typeof alt === "string" ? alt : ""}
          {...rest}
        />
      );
    },
  };

  return (
    <div className="prose prose-lg max-w-none dark:prose-invert">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={markdownComponents}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default ArticleContent;
