import { getAllPosts } from "@/lib/posts";
import { Header } from "@/components/header";
import {
  HeroSection,
  AboutSection,
  ProjectsSection,
  WritingSection,
  ContactSection,
} from "@/components/landing";

export default function Home() {
  const posts = getAllPosts().map((post) => ({
    slug: post.slug,
    category: post.category,
    frontmatter: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      createdAt: post.frontmatter.createdAt,
      tags: post.frontmatter.tags,
    },
  }));

  return (
    <>
      <Header variant="landing" />
      <main className="bg-[#0a0a0a] text-white">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <WritingSection posts={posts} />
        <ContactSection />
      </main>
    </>
  );
}
