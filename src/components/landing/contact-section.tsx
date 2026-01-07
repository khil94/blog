"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Github, Linkedin, Twitter, Instagram, Mail } from "lucide-react";
import { PROFILE, SOCIAL_LINKS, SITE_CONFIG } from "@/constants";

const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
};

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText(PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const activeSocials = Object.entries(SOCIAL_LINKS).filter(
    ([, url]) => url && url.length > 0
  );

  return (
    <section id="contact" className="py-24 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Let&apos;s Connect
        </motion.h2>

        <motion.p
          className="text-muted-foreground mb-12 max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          프로젝트 협업이나 궁금한 점이 있으시면 언제든 연락해주세요.
        </motion.p>

        <motion.div
          className="flex flex-col items-center gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <button
            onClick={handleCopyEmail}
            className="group flex items-center gap-3 px-6 py-4 rounded-xl bg-card/50 border border-border hover:border-foreground/30 transition-all"
          >
            <Mail className="w-5 h-5 text-muted-foreground" />
            <span className="text-lg">{PROFILE.email}</span>
            {copied ? (
              <Check className="w-5 h-5 text-green-400" />
            ) : (
              <Copy className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
            )}
          </button>

          {activeSocials.length > 0 && (
            <div className="flex items-center gap-4">
              {activeSocials.map(([key, url]) => {
                const Icon = socialIcons[key as keyof typeof socialIcons];
                if (!Icon) return null;
                return (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-card/50 border border-border hover:border-foreground/30 hover:bg-card transition-all"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          )}
        </motion.div>

        <motion.div
          className="mt-24 pt-8 border-t border-border text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
        </motion.div>
      </div>
    </section>
  );
}
