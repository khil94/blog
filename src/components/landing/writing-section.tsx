"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";

interface Post {
  slug: string;
  category: string;
  frontmatter: {
    title: string;
    description: string;
    createdAt: string;
    tags: string[];
  };
}

interface WritingSectionProps {
  posts: Post[];
}

export function WritingSection({ posts }: WritingSectionProps) {
  const recentPosts = posts.slice(0, 3);

  return (
    <section id="writing" className="py-24 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          className="flex items-center justify-between mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold">Writing</h2>
          <Link
            href="/blog"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            View all
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="space-y-4">
          {recentPosts.map((post, index) => (
            <motion.div
              key={`${post.category}-${post.slug}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link
                href={`/blog/${post.category}/${post.slug}`}
                className="group block p-6 rounded-xl bg-card/50 border border-border hover:border-foreground/20 hover:bg-card transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="px-2 py-0.5 rounded bg-muted text-muted-foreground">
                        {post.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.frontmatter.createdAt}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold group-hover:text-foreground transition-colors">
                      {post.frontmatter.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-1">
                      {post.frontmatter.description}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
