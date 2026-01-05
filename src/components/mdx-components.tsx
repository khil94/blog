import type { MDXComponents } from "mdx/types";
import Link from "next/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="mt-8 mb-4 text-3xl font-bold tracking-tight">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-8 mb-4 pb-4 text-2xl font-semibold tracking-tight border-b">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-6 mb-3 text-xl font-semibold">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="mb-4 leading-7 text-muted-foreground">{children}</p>
    ),
    a: ({ href, children }) => (
      <Link
        href={href ?? "#"}
        className="text-primary underline underline-offset-4 hover:text-primary/80"
      >
        {children}
      </Link>
    ),
    ul: ({ children }) => (
      <ul className="mb-4 ml-6 list-disc space-y-2">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="mb-4 ml-6 list-decimal space-y-2">{children}</ol>
    ),
    li: ({ children }) => <li className="text-muted-foreground">{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className="mt-4 mb-4 border-l-4 border-primary pl-4 italic text-muted-foreground">
        {children}
      </blockquote>
    ),
    code: ({ children, className }) => {
      const isInlineCode = !className;
      if (isInlineCode) {
        return (
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            {children}
          </code>
        );
      }
      return <code className={className}>{children}</code>;
    },
    pre: ({ children }) => (
      <pre className="mb-4 break-all whitespace-break-spaces overflow-x-auto rounded-lg border bg-muted p-4">
        {children}
      </pre>
    ),
    img: ({ src, alt }) => {
      let imageSrc = src ?? "";
      if (imageSrc.startsWith("public/")) {
        imageSrc = "/" + imageSrc.slice(7);
      }
      if (!imageSrc.startsWith("/") && !imageSrc.startsWith("http")) {
        imageSrc = "/" + imageSrc;
      }
      return (
        <img
          src={imageSrc}
          alt={alt ?? ""}
          className="rounded-lg my-4 max-w-full h-auto"
        />
      );
    },
    table: ({ children }) => (
      <div className="mb-4 overflow-x-auto">
        <table className="w-full border-collapse border">{children}</table>
      </div>
    ),
    th: ({ children }) => (
      <th className="border bg-muted px-4 py-2 text-left font-semibold">
        {children}
      </th>
    ),
    td: ({ children }) => <td className="border px-4 py-2">{children}</td>,
    hr: () => <hr className="my-8 border-t" />,
    ...components,
  };
}
