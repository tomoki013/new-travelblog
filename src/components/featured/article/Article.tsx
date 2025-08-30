import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import { Post } from "@/types/types";
import {
  createCustomHeading,
  CustomImg,
  CustomLink,
  CustomTable,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "./CustomMarkdown";

type PostMetadata = Omit<Post, "content">;

export interface ArticleContentProps {
  content: string;
  currentPostCategory: Post["category"];
  allPosts: PostMetadata[];
}

const ArticleContent = ({
  content,
  currentPostCategory,
  allPosts,
}: ArticleContentProps) => {
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
    a: (props: React.ComponentProps<"a">) => (
      <CustomLink
        {...props}
        href={props.href ?? ""}
        allPosts={allPosts}
        currentPostCategory={currentPostCategory}
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
    // ▼ 2. テーブル関連のコンポーネントをマッピングに追加
    table: (props) => <CustomTable {...props} />,
    thead: (props) => <Thead {...props} />,
    tbody: (props) => <Tbody {...props} />,
    tr: (props) => <Tr {...props} />,
    th: (props) => <Th {...props} />,
    td: (props) => <Td {...props} />,
  };

  return (
    <div className="prose prose-lg max-w-none dark:prose-invert">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkToc]}
        components={markdownComponents}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default ArticleContent;
