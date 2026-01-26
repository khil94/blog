import { CustomCursor } from "@/components/custom-cursor";
import { Header } from "@/components/header";
import {
  AboutSection,
  ContactSection,
  HeroSection,
  ProjectsSection,
  WritingSection,
} from "@/components/landing";
import { SmoothScroll } from "@/components/smooth-scroll";
import { getAllPosts } from "@/lib/posts";

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
    <div className="cursor-none">
      <SmoothScroll />
      <CustomCursor />
      <Header variant="landing" />
      <main className="bg-background text-foreground">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <WritingSection posts={posts} />
        <ContactSection />
      </main>
    </div>
  );
}
