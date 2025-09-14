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

const ArticleContent = ({ content, allPosts }: ArticleContentProps) => {
  const markdownComponents: Components = {
    p: (props) => {
      const { node } = props;

      // nodeプロパティと、その中のchildren配列が存在するかを安全にチェック
      if (!node?.children) {
        return <p>{props.children}</p>;
      }

      const children = node.children;

      // 子要素が1つだけであることを確認
      if (children.length === 1) {
        const firstChild = children[0];

        // 【重要】最初の子要素が'element'型であるかをチェック（型ガード）
        // これにより、TypeScriptは以降の行でfirstChildがtagNameプロパティを持つと認識してくれる
        if (firstChild.type === "element" && firstChild.tagName === "a") {
          // 条件に一致すればpタグを省略
          return <>{props.children}</>;
        }
      }

      // 上記の条件に当てはまらない場合は、通常のpタグを返す
      return <p>{props.children}</p>;
    },
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
      <CustomLink {...props} href={props.href ?? ""} allPosts={allPosts}>
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
