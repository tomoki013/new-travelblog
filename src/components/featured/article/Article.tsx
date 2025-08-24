import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import { Post } from "@/types/types";
import { getAllPostTypes } from "@/lib/markdown";
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

interface ArticleContentProps {
  content: string;
  currentPostType: Post["type"];
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
    // ▼ 2. テーブル関連のコンポーネントをマッピングに追加
    table: (props) => <CustomTable {...props} />,
    thead: (props) => <Thead {...props} />,
    tbody: (props) => <Tbody {...props} />,
    tr: (props) => <Tr {...props} />,
    th: (props) => <Th {...props} />,
    td: (props) => <Td {...props} />,
  };

  return (
    // proseクラスはデフォルトでtableにもスタイルを当てるため、
    // 競合を避けるためにprose-table:border-noneなどのクラスを追加するか、
    // prose-invertなどダークモード用のクラスを調整する必要があるかもしれません。
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
