import { compileMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import { useMDXComponents } from "@/components/mdx-components";
import type { PostFrontmatter } from "./posts";

const rehypePrettyCodeOptions = {
  theme: "github-dark",
  keepBackground: true,
};

export async function compileMDXContent(source: string) {
  const { content, frontmatter } = await compileMDX<PostFrontmatter>({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions]],
      },
    },
    components: useMDXComponents({}),
  });

  return { content, frontmatter };
}
