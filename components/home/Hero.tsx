"use client";

import { LineText } from "@/components/LineText";
import CTAButton from "@/components/home/CTAButton";
import TypewriterText from "@/components/home/TypewriterText";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, StarIcon } from "lucide-react";

const Hero = ({
  locale,
  langName,
  CTALocale,
}: {
  locale: any;
  langName: string;
  CTALocale: any;
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2, duration: 0.6 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <>
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-400/10 blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-violet-500/20 to-purple-400/10 blur-3xl animate-pulse [animation-delay:2000ms]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-indigo-500/10 to-blue-400/5 blur-3xl" />
      </div>

      <motion.section
        lang={langName}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-10 pt-16 md:pt-28 text-center relative"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="mb-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/50 px-4 py-1.5 text-sm font-medium text-blue-700 dark:text-blue-300">
            <Sparkles className="h-4 w-4" />
            {locale.badge}
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1 variants={itemVariants} className="!mb-4 !leading-[1.15]">
          {locale.title1}{" "}
          <LineText>{locale.title2}</LineText>{" "}
          {locale.title3}
        </motion.h1>

        {/* Rotating typewriter text */}
        <motion.div variants={itemVariants} className="mb-6">
          <span className="text-2xl sm:text-3xl font-semibold text-slate-700 dark:text-slate-300">
            {locale.rotatingPrefix}{" "}
            <TypewriterText
              texts={locale.rotatingTexts}
              className="text-2xl sm:text-3xl font-bold"
            />
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-slate-600 dark:text-slate-400"
        >
          {locale.description}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <CTAButton locale={CTALocale} />
          {locale.secondaryCTA && (
            <Button
              variant="outline"
              size="lg"
              className="group relative overflow-hidden rounded-full border-slate-300 dark:border-slate-700 px-8 h-12 text-base"
              asChild
            >
              <Link href={locale.secondaryCTA.href} className="flex items-center gap-2">
                <StarIcon className="h-4 w-4 text-yellow-500 group-hover:rotate-12 transition-transform" />
                <span className="relative z-10">{locale.secondaryCTA.text}</span>
              </Link>
            </Button>
          )}
        </motion.div>

        {/* Stats */}
        {locale.stats && (
          <motion.div
            variants={itemVariants}
            className="mt-12 flex flex-wrap items-center justify-center gap-8 sm:gap-12"
          >
            {locale.stats.map((stat: { value: string; label: string }, idx: number) => (
              <div key={idx} className="text-center">
                <div className="text-3xl font-bold text-slate-900 dark:text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </motion.section>
    </>
  );
};

export default Hero;
