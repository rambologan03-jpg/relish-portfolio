"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

type Video = {
  id: string;
  title: string;
  category: string;
  client: string;
  desc: string;
  customThumb?: string;
};

const VIDEOS: Video[] = [
  {
    id: "Mzw1bQwoW4w",
    title: "Brand Storytelling",
    category: "Motion",
    client: "AI Motion Design",
    desc: "Soft 3D visuals and calm motion communicating trust, care, and family-first values for a delivery brand.",
  },
  {
    id: "hDbo07o7TSE",
    title: "Cinematic Anime Short Film",
    category: "Motion",
    client: "AI Filmmaking",
    desc: "AI-generated cinematic anime with controlled camera movement and atmospheric storytelling inspired by Japanese animation.",
  },
  {
    id: "OMGGl0UMWqU",
    title: "AI Healthcare Explainer",
    category: "Shorts",
    client: "Tech & Science",
    desc: "Short-form explainer on AI research agents analyzing millions of papers — abstract medical visuals with clean pacing.",
  },
  {
    id: "Q7LF4xmlGDw",
    title: "Motion Typography",
    category: "Motion",
    client: "Social Media",
    desc: "Fast-paced motion with bold animated typography engineered for maximum impact on social platforms.",
  },
  {
    id: "4-pjHsUJbws",
    title: "Highlight Reel",
    category: "Shorts",
    client: "Content Creator",
    desc: "Key moments from long-form content repackaged into engaging short-form reels with motion graphics overlays.",
  },
  {
    id: "bX_GDIuRP2s",
    title: "Cinematic Trailer",
    category: "Long Form",
    client: "Brand / Event",
    desc: "Pacing, rhythm, and emotional beats — blending visuals, sound design, and motion graphics into a compelling narrative arc.",
  },
  {
    id: "-7lElYkiFlY",
    title: "Illustrated Explainer",
    category: "Long Form",
    client: "Corporate",
    desc: "Animated vector explainer combining clean illustrations, dynamic transitions, and infographic elements for complex ideas.",
    customThumb: "/images/explainer-thumb.jpg",
  },
  {
    id: "zMgVHK6eem8",
    title: "Talking Head Edit",
    category: "Long Form",
    client: "Creator",
    desc: "Clean, engaging talking head production with professional pacing, color grade, and motion graphic overlays.",
  },
  {
    id: "3m9Ioz5lPGk",
    title: "Real Estate Showcase",
    category: "Shorts",
    client: "Real Estate",
    desc: "Short-form property showcase crafted to highlight key features and drive buyer interest quickly.",
  },
  {
    id: "lNsGxoSx2JM",
    title: "UGC Product Edit",
    category: "Ads",
    client: "E-commerce",
    desc: "Raw UGC footage transformed into a high-converting product ad with tight editing and strong hook.",
  },
  {
    id: "J5_dlPlFUoo",
    title: "AI UGC Ad",
    category: "Ads",
    client: "AI Generated",
    desc: "AI-generated UGC style ad combining authentic feel with optimized structure for social media conversion.",
  },
  {
    id: "3j3nYD2YrDg",
    title: "UGC Lifestyle Ad",
    category: "Ads",
    client: "Lifestyle Brand",
    desc: "Lifestyle UGC edit with natural pacing, on-screen text, and scroll-stopping hook for paid social.",
  },
  {
    id: "EEfoT29NYFM",
    title: "Brand Storytelling II",
    category: "Motion",
    client: "AI Motion Design",
    desc: "Follow-up AI motion design concept for logistics brand — soft 3D visuals with warm, trust-first storytelling.",
  },
  {
    id: "AYr6Sp5TCVM",
    title: "Real Estate Walk-through",
    category: "Shorts",
    client: "Real Estate",
    desc: "Cinematic short-form property walk-through designed to generate leads and showcase premium listings.",
  },
  {
    id: "TnRTYpO7wxo",
    title: "UGC Brand Ad",
    category: "Ads",
    client: "Lifestyle Brand",
    desc: "Authentic UGC-style ad with strong hook, clean cuts, and on-screen text optimized for paid social performance.",
  },
];

const FILTERS = ["All", "Ads", "Motion", "Shorts", "Long Form"] as const;

const SERVICES = [
  {
    icon: "✦",
    title: "AI Content Creation",
    desc: "My strongest edge — AI-generated visuals, motion design, and brand films that most editors simply can't deliver. Cutting-edge, cinematic, and cost-effective.",
  },
  {
    icon: "◈",
    title: "YouTube Production",
    desc: "Full long-form production — cuts, color grade, motion graphics, and pacing built for retention and channel growth.",
  },
  {
    icon: "⬡",
    title: "Reels & Shorts",
    desc: "Vertical content engineered for the algorithm. Fast hooks, tight pacing, and on-screen text that keeps viewers watching till the end.",
  },
  {
    icon: "◉",
    title: "Motion Graphics",
    desc: "Custom animated intros, title cards, lower thirds, and transitions that make your brand look premium and consistent.",
  },
  {
    icon: "❋",
    title: "Illustration to Video",
    desc: "Static illustrator files and vector artwork brought to life through animation — explainers, brand stories, and infographic videos with cinematic motion.",
  },
  {
    icon: "▶",
    title: "AI Generated UGC Content",
    desc: "Fully AI-generated UGC videos that look and feel like authentic creator content — without hiring actors. High-converting, scalable, and built for paid social performance.",
  },
] as const;

const TESTIMONIALS = [
  {
    name: "Alex R.",
    role: "E-commerce Founder",
    quote:
      "Relish took our boring product clips and turned them into ads that actually convert. ROAS went up 3x.",
  },
  {
    name: "Maya K.",
    role: "YouTuber 500K subs",
    quote:
      "My audience retention improved by 40% since switching to Relish.",
  },
  {
    name: "Jordan T.",
    role: "Brand Manager",
    quote:
      "Fast, creative, understands the brief immediately. Relish is in a different league.",
  },
] as const;

function VideoModal({
  video,
  onClose,
}: {
  video: Video | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {video ? (
        <motion.div
          key={video.id}
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/85 px-4 py-8 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-5xl rounded-[2rem] border border-white/10 bg-[#0a0a0a] p-4 shadow-[0_30px_120px_rgba(0,0,0,0.65)] md:p-6"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 180, damping: 24 }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/70 text-lg text-white/80 transition hover:border-white/20 hover:text-white"
              aria-label="Close video modal"
            >
              {"\u00d7"}
            </button>
            <div className="aspect-video overflow-hidden rounded-[1.5rem] border border-white/10 bg-black">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <div className="mt-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-[#DC2626]">
                  {video.category}
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-white">
                  {video.title}
                </h3>
              </div>
              <p className="text-sm uppercase tracking-[0.25em] text-white/45">
                Client / {video.client}
              </p>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const workRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const [activeFilter, setActiveFilter] =
    useState<(typeof FILTERS)[number]>("All");
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  const filteredVideos =
    activeFilter === "All"
      ? VIDEOS
      : VIDEOS.filter((video) => video.category === activeFilter);

  useEffect(() => {
    document.body.style.overflow =
      activeVideo || mobileMenuOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [activeVideo, mobileMenuOpen]);

  const scrollToSection = (ref: React.RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { label: "Work", key: "work" },
    { label: "Services", key: "services" },
    { label: "About", key: "about" },
    { label: "Contact", key: "contact" },
  ];

  return (
    <>
      <div className="relative min-h-screen overflow-hidden bg-[#080808] text-white">
        <motion.div
          className="pointer-events-none fixed inset-0 z-0 opacity-30"
          style={{
            background:
              "radial-gradient(circle at 12% 78%, rgba(220,38,38,0.22), transparent 32%)",
          }}
          animate={{ opacity: [0.2, 0.35, 0.25] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />

        <header className="fixed inset-x-0 top-0 z-50">
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 md:px-6">
            <div className="glass-panel flex w-full items-center justify-between rounded-full px-5 py-3">
              <button
                type="button"
                className="text-xl font-semibold tracking-[0.35em] text-white"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                RS<span className="text-[#DC2626]">.</span>
              </button>
              <nav className="hidden items-center gap-8 text-sm uppercase tracking-[0.25em] text-white/60 md:flex">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    type="button"
                    onClick={() => {
                      const map: Record<
                        string,
                        React.RefObject<HTMLElement | null>
                      > = {
                        work: workRef,
                        services: servicesRef,
                        about: aboutRef,
                        contact: contactRef,
                      };
                      scrollToSection(map[link.key]);
                    }}
                    className="transition hover:text-white"
                  >
                    {link.label}
                  </button>
                ))}
              </nav>
              <div className="hidden md:block">
                <button
                  type="button"
                  onClick={() => scrollToSection(contactRef)}
                  className="rounded-full bg-[#DC2626] px-5 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-white transition hover:bg-[#ef4444]"
                >
                  Hire Me
                </button>
              </div>
              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white md:hidden"
                onClick={() => setMobileMenuOpen((open) => !open)}
                aria-label="Toggle menu"
              >
                <div className="flex flex-col gap-1.5">
                  <span className="h-px w-5 bg-white" />
                  <span className="h-px w-5 bg-white" />
                  <span className="h-px w-5 bg-white" />
                </div>
              </button>
            </div>
          </div>
        </header>

        <AnimatePresence>
          {mobileMenuOpen ? (
            <motion.div
              className="fixed inset-0 z-40 bg-black/80 backdrop-blur-xl md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="ml-auto flex h-full w-[82%] max-w-sm flex-col bg-[#0b0b0b] p-6"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 220, damping: 28 }}
              >
                <div className="mb-12 flex items-center justify-between">
                  <span className="text-lg font-semibold tracking-[0.32em]">
                    RS<span className="text-[#DC2626]">.</span>
                  </span>
                  <button
                    type="button"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/70"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Close menu"
                  >
                    {"\u00d7"}
                  </button>
                </div>
                <div className="flex flex-col gap-5 text-lg uppercase tracking-[0.24em] text-white/70">
                  {navLinks.map((link) => (
                    <button
                      key={link.label}
                      type="button"
                      onClick={() => {
                        const map: Record<
                          string,
                          React.RefObject<HTMLElement | null>
                        > = {
                          work: workRef,
                          services: servicesRef,
                          about: aboutRef,
                          contact: contactRef,
                        };
                        scrollToSection(map[link.key]);
                      }}
                      className="text-left transition hover:text-white"
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => scrollToSection(contactRef)}
                  className="mt-auto rounded-full bg-[#DC2626] px-5 py-4 text-sm font-semibold uppercase tracking-[0.28em]"
                >
                  Hire Me
                </button>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <main className="bg-[#080808] text-white overflow-x-hidden">
          <div className="fixed inset-0 pointer-events-none z-[1]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(180,0,0,0.12)_0%,_transparent_40%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(180,0,0,0.10)_0%,_transparent_40%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(100,0,0,0.05)_0%,_transparent_70%)]" />
          </div>
          <section
            ref={heroRef}
            className="relative z-[2] flex min-h-screen items-end overflow-visible pt-28"
          >
            <motion.div
              className="absolute inset-0"
              style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#2a0000] via-[#0f0000] to-[#080808]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(220,38,38,0.25)_0%,_transparent_60%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(180,0,0,0.10)_0%,_transparent_50%)]" />
              <div
                className="absolute inset-0 opacity-[0.12]"
                style={{
                  backgroundImage:
                    'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27160%27 height=%27160%27 viewBox=%270 0 160 160%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%272%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27160%27 height=%27160%27 filter=%27url(%2523n)%27 opacity=%270.65%27/%3E%3C/svg%3E")',
                }}
              />
              <div className="absolute -bottom-24 -left-20 h-80 w-80 rounded-full bg-[#DC2626]/25 blur-[120px]" />
            </motion.div>

            <div className="relative mx-auto flex w-full max-w-7xl flex-col justify-end px-6 pb-10 pt-20 md:px-12 md:pb-16">
              <motion.div
                className="w-full"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="mb-8 ml-0 flex items-center gap-4 text-xs uppercase tracking-[0.35em] text-white/70">
                  <span className="h-px w-12 bg-[#DC2626]" />
                  <span>Creative Editor &amp; AI Content Designer</span>
                </div>
                <div className="space-y-1 leading-none">
                  <div className="overflow-visible">
                    <motion.span
                      className="text-[clamp(3rem,8vw,7.5rem)] font-black leading-[0.85] tracking-tight"
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      transition={{
                        duration: 0.9,
                        delay: 0.15,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      RELISH
                    </motion.span>
                  </div>
                  <div className="overflow-visible">
                    <motion.span
                      className="text-[clamp(3rem,8vw,7.5rem)] font-black leading-[0.85] tracking-tight text-white/15"
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      transition={{
                        duration: 0.9,
                        delay: 0.28,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      SABALPARA
                    </motion.span>
                  </div>
                </div>
                <motion.p
                  className="mt-8 max-w-2xl text-base leading-8 text-white/40 md:text-lg"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.45 }}
                >
                  Cinematic edits, ad creatives, and motion-led storytelling for
                  brands and creators who need attention, retention, and
                  results.
                </motion.p>
                <motion.div
                  className="mt-10 flex flex-col gap-4 sm:flex-row"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.55 }}
                >
                  <button
                    type="button"
                    onClick={() => scrollToSection(workRef)}
                    className="rounded-full bg-[#DC2626] px-8 py-4 text-sm font-semibold uppercase tracking-[0.28em] transition hover:bg-[#ef4444]"
                  >
                    View Work
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollToSection(contactRef)}
                    className="rounded-full border border-white/20 px-8 py-4 text-sm font-semibold uppercase tracking-[0.28em] text-white transition hover:border-white/40 hover:bg-white/5"
                  >
                    Book a Call
                  </button>
                </motion.div>
              </motion.div>

            </div>
          </section>

          <section className="relative z-[2] overflow-hidden border-y border-white/5 bg-[#0d0d0d] py-4">
            <motion.div
              className="flex w-max gap-10 whitespace-nowrap text-sm uppercase tracking-[0.38em] text-white/60"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            >
              {[...Array(2)].flatMap((_, groupIndex) =>
                [
                  "UGC Ads",
                  "YouTube Production",
                  "Reels & Shorts",
                  "Motion Graphics",
                  "Color Grading",
                  "Brand Videos",
                ].map((item, index) => (
                  <span key={`${groupIndex}-${item}-${index}`}>
                    {item} {"\u2022"}
                  </span>
                )),
              )}
            </motion.div>
          </section>

          <section
            id="work"
            ref={workRef}
            className="relative z-[2] mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-xs uppercase tracking-[0.35em] text-[#DC2626]">
                Selected Work
              </p>
              <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <h2 className="text-4xl font-semibold tracking-[0.12em] text-white md:text-6xl">
                  THE REEL
                </h2>
                <div className="flex flex-wrap gap-3">
                  {FILTERS.map((filter) => (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setActiveFilter(filter)}
                      className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.28em] transition ${
                        activeFilter === filter
                          ? "border-[#DC2626] bg-[#DC2626] text-white"
                          : "border-white/10 bg-white/5 text-white/55 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredVideos.map((video, index) => (
                <motion.button
                  key={`${video.id}-${video.title}`}
                  type="button"
                  className="group relative aspect-video overflow-hidden rounded-[1.75rem] border border-white/10 text-left"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  onClick={() => setActiveVideo(video)}
                >
                  <img
                    src={
                      video.customThumb ||
                      `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`
                    }
                    alt={video.title}
                    className="absolute inset-0 h-full w-full object-cover"
                    onError={(event) => {
                      const target = event.currentTarget;
                      target.onerror = null;
                      target.src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  <div className="absolute inset-0 bg-[#DC2626]/0 transition duration-500 group-hover:bg-[#DC2626]/10" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.span
                      className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-black/55 text-xl text-white opacity-0 backdrop-blur-sm transition group-hover:opacity-100"
                      whileHover={{ scale: 1.08 }}
                      transition={{ type: "spring", stiffness: 260, damping: 18 }}
                    >
                      {"\u25b6"}
                    </motion.span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="text-xs uppercase tracking-[0.35em] text-[#DC2626]">
                      {video.category}
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold text-white">
                      {video.title}
                    </h3>
                    <p className="mt-2 text-sm uppercase tracking-[0.22em] text-white/45">
                      {video.client}
                    </p>
                    <p className="mt-3 line-clamp-2 text-xs leading-6 text-white/30">
                      {video.desc}
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>
          </section>

          <section
            id="services"
            ref={servicesRef}
            className="relative z-[2] bg-[#0a0a0a] py-28 md:py-36"
          >
            <div className="mx-auto max-w-7xl px-4 md:px-6">
              <motion.div
                className="overflow-visible"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <p className="text-xs uppercase tracking-[0.35em] text-[#DC2626]">
                  What I Do
                </p>
                <h2 className="mt-4 text-4xl font-semibold tracking-[0.12em] md:text-6xl">
                  SERVICES
                </h2>
              </motion.div>

              <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-[2rem] bg-white/5 md:grid-cols-2 lg:grid-cols-3">
                {SERVICES.map((service, i) => (
                  <motion.div
                    key={service.title}
                    className="group relative bg-[#080808] p-8 md:p-10"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ backgroundColor: "rgba(220,38,38,0.04)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                  >
                    <div className="absolute left-0 top-0 h-0 w-0.5 bg-[#DC2626] transition-all duration-500 group-hover:h-full" />
                    <div className="text-3xl text-[#DC2626]">{service.icon}</div>
                    <h3 className="mt-8 text-2xl font-semibold text-white">
                      {service.title}
                    </h3>
                    <p className="mt-4 max-w-md text-base leading-8 text-white/50">
                      {service.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section
            id="about"
            ref={aboutRef}
            className="relative z-[2] mx-auto max-w-7xl px-4 py-28 md:px-6 md:py-36"
          >
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <p className="text-xs uppercase tracking-[0.35em] text-[#DC2626]">
                  About
                </p>
                <h2 className="mt-4 text-4xl font-semibold tracking-[0.12em] text-white md:text-6xl">
                  ABOUT / <span className="text-white/20">RELISH</span>
                </h2>
                <div className="mt-8 space-y-6 text-base leading-8 text-white/55 md:text-lg">
                  <p>
                    I&apos;m a video editor with{" "}
                    <span className="text-white">2+ years of experience</span>{" "}
                    crafting content that performs - not just looks good. Based
                    in Surat, I work with e-commerce brands, real estate
                    agencies, YouTubers, and creators who need edits that drive
                    real results.
                  </p>
                  <p>
                    My strongest edge is{" "}
                    <span className="text-white">AI-generated content</span> - I
                    combine traditional editing skills with cutting-edge AI
                    tools to produce motion design, cinematic visuals, and ad
                    creatives that most editors simply can&apos;t deliver.
                  </p>
                  <p>
                    Whether it&apos;s a high-converting UGC ad, a property
                    showcase, a YouTube production, or a fully AI-generated
                    brand film - I bring the same obsession with pacing,
                    clarity, and impact to every project.
                  </p>
                </div>
                <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
                  {[
                    ["50+", "Projects"],
                    ["2+", "Years Exp"],
                    ["100%", "Satisfaction"],
                  ].map(([value, label]) => (
                    <div
                      key={label}
                      className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5"
                    >
                      <p className="text-3xl font-semibold text-white">
                        {value}
                      </p>
                      <p className="mt-2 text-xs uppercase tracking-[0.3em] text-white/45">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src="/images/relish.jpg"
                    alt="Relish Sabalpara"
                    className="absolute inset-0 h-full w-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute left-0 top-0 h-1 w-16 bg-[#DC2626]" />
                  <div className="absolute left-0 top-0 h-16 w-1 bg-[#DC2626]" />
                  <div className="absolute bottom-0 right-0 h-1 w-16 bg-[#DC2626]" />
                  <div className="absolute bottom-0 right-0 h-16 w-1 bg-[#DC2626]" />
                </div>
                <div className="absolute -bottom-5 -left-5 bg-[#DC2626] px-6 py-4">
                  <div className="text-2xl font-black">RELISH</div>
                  <div className="text-xs tracking-widest uppercase opacity-80 mt-0.5">
                    Creative Editor &amp; Designer
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          <section className="relative z-[2] bg-[#0a0a0a] py-28 md:py-36">
            <div className="mx-auto max-w-7xl px-4 md:px-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <p className="text-xs uppercase tracking-[0.35em] text-[#DC2626]">
                  Client Results
                </p>
                <h2 className="mt-4 text-4xl font-semibold tracking-[0.12em] md:text-6xl">
                  RESULTS
                </h2>
              </motion.div>

              <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
                {TESTIMONIALS.map((testimonial, index) => (
                  <motion.article
                    key={testimonial.name}
                    className="relative group rounded-[1.75rem] border border-white/8 bg-[#0d0d0d] p-8 transition-all duration-500 hover:border-[#DC2626]/25"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.08 }}
                  >
                    <div className="absolute left-6 top-4 text-6xl font-semibold leading-none text-[#DC2626]/10">
                      &quot;
                    </div>
                    <p className="relative z-10 pt-10 text-sm leading-relaxed text-white/75">
                      {testimonial.quote}
                    </p>
                    <div className="mt-8 border-t border-white/5 pt-5">
                      <p className="text-sm font-bold text-white">
                        {testimonial.name}
                      </p>
                      <div className="mt-3 h-px w-8 bg-[#DC2626]" />
                      <p className="mt-0.5 text-xs tracking-wide text-[#DC2626]">
                        {testimonial.role}
                      </p>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>

          <section className="relative z-[2] overflow-hidden py-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.2),transparent_55%)]" />
            <motion.div
              className="relative mx-auto flex max-w-5xl flex-col items-center px-4 text-center md:px-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-4xl font-semibold tracking-[0.12em] text-white md:text-6xl">
                READY TO GO <span className="text-[#DC2626]">VIRAL?</span>
              </h2>
              <button
                type="button"
                onClick={() => scrollToSection(contactRef)}
                className="mt-8 rounded-full bg-[#DC2626] px-8 py-4 text-sm font-semibold uppercase tracking-[0.28em] transition hover:bg-[#ef4444]"
              >
                Start a Project {"\u2192"}
              </button>
            </motion.div>
          </section>

          <section
            id="contact"
            ref={contactRef}
            className="relative z-[2] bg-[#0a0a0a] py-28 md:py-36"
          >
            <div className="mx-auto grid max-w-7xl gap-12 px-4 md:px-6 lg:grid-cols-[0.9fr_1.1fr]">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <p className="text-xs uppercase tracking-[0.35em] text-[#DC2626]">
                  Contact
                </p>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="mb-8 overflow-visible text-4xl font-black tracking-tight md:text-5xl"
                >
                  LET&apos;S
                  <br />
                  <span className="text-white/20">WORK.</span>
                </motion.h2>
                <p className="mt-8 max-w-md text-base leading-8 text-white/55">
                  Currently available for freelance editing, monthly retainers,
                  and post-production support for creators and brands.
                </p>
                <div className="mt-10 space-y-5">
                  {[
                    {
                      label: "Email",
                      value: "kodomokindlejoy@gmail.com",
                      href: "mailto:kodomokindlejoy@gmail.com",
                    },
                    {
                      label: "Instagram",
                      value: "@relish__art",
                      href: "https://www.instagram.com/relish__art/",
                    },
                    {
                      label: "LinkedIn",
                      value: "Relish Sabalpara",
                      href: "https://www.linkedin.com/in/relish-sabalpara-139a50134/",
                    },
                    {
                      label: "Threads",
                      value: "@relish__art",
                      href: "https://www.threads.com/@relish__art",
                    },
                    {
                      label: "Twitter / X",
                      value: "@kids78681",
                      href: "https://x.com/kids78681",
                    },
                  ].map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between border-b border-white/10 pb-4 transition hover:border-[#DC2626]"
                    >
                      <div>
                        <p className="text-xs uppercase tracking-[0.35em] text-[#DC2626]">
                          {item.label}
                        </p>
                        <p className="mt-2 text-lg text-white/70">
                          {item.value}
                        </p>
                      </div>
                      <span className="text-xl text-white/45">
                        {"\u2197"}
                      </span>
                    </a>
                  ))}
                </div>
              </motion.div>

              <motion.form
                className="rounded-[2rem] border border-white/10 bg-[#080808] p-6 md:p-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                onSubmit={(event) => {
                  event.preventDefault();
                  alert("Message sent!");
                }}
              >
                <div className="grid gap-5 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-3 block text-xs uppercase tracking-[0.35em] text-white/35">
                      Name
                    </span>
                    <input
                      type="text"
                      required
                      className="w-full rounded-2xl border border-transparent bg-white/5 px-5 py-4 text-white outline-none transition placeholder:text-white/20 focus:border-[#DC2626]"
                      placeholder="Your name"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-3 block text-xs uppercase tracking-[0.35em] text-white/35">
                      Email
                    </span>
                    <input
                      type="email"
                      required
                      className="w-full rounded-2xl border border-transparent bg-white/5 px-5 py-4 text-white outline-none transition placeholder:text-white/20 focus:border-[#DC2626]"
                      placeholder="you@example.com"
                    />
                  </label>
                </div>
                <label className="mt-5 block">
                  <span className="mb-3 block text-xs uppercase tracking-[0.35em] text-white/35">
                    Budget (optional)
                  </span>
                  <input
                    type="text"
                    className="w-full rounded-2xl border border-transparent bg-white/5 px-5 py-4 text-white outline-none transition placeholder:text-white/20 focus:border-[#DC2626]"
                    placeholder="$500 - $2,000"
                  />
                </label>
                <label className="mt-5 block">
                  <span className="mb-3 block text-xs uppercase tracking-[0.35em] text-white/35">
                    Message
                  </span>
                  <textarea
                    required
                    rows={6}
                    className="w-full rounded-[1.5rem] border border-transparent bg-white/5 px-5 py-4 text-white outline-none transition placeholder:text-white/20 focus:border-[#DC2626]"
                    placeholder="Tell me about the project, timeline, and deliverables."
                  />
                </label>
                <button
                  type="submit"
                  className="mt-6 w-full rounded-full bg-[#DC2626] px-6 py-4 text-sm font-semibold uppercase tracking-[0.28em] transition hover:bg-[#ef4444]"
                >
                  Submit
                </button>
              </motion.form>
            </div>
          </section>
        </main>

        <footer className="border-t border-white/5 bg-[#080808]">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-sm text-white/35 md:flex-row md:items-center md:justify-between md:px-6">
            <p>&copy; 2025 Relish Sabalpara — kodomokindlejoy@gmail.com</p>
            <p>Video Editor {"\u00b7"} Surat, India</p>
          </div>
        </footer>
      </div>

      <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
    </>
  );
}
