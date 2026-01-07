import { compileMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { useMDXComponents } from "@/components/mdx-components";
import type { PostFrontmatter } from "./posts";

const rehypePrettyCodeOptions = {
  theme: {
    dark: "github-dark",
    light: "github-light",
  },
  keepBackground: false,
};

export async function compileMDXContent(source: string) {
  const { content, frontmatter } = await compileMDX<PostFrontmatter>({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [rehypePrettyCode, rehypePrettyCodeOptions]
        ],
      },
    },
    components: useMDXComponents({}),
  });

  return { content, frontmatter };
}
