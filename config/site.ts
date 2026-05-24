import { SiteConfig } from "@/types/siteConfig";
import { BsGithub } from "react-icons/bs";
import { MdEmail } from "react-icons/md";

const OPEN_SOURCE_URL = 'https://github.com/chenchenyyds/saas-landing-page'

const baseSiteConfig = {
  name: "SaaS Fast",
  description:
    "A modern, high-performance SaaS landing page built with Next.js, Tailwind CSS, and Framer Motion — ready to deploy and customize.",
  url: "https://saas-landing-page-b2qzrnom0-chenchenyyds-projects.vercel.app",
  ogImage: "/og.png",
  metadataBase: '/',
  keywords: ["saas", "landing page", "next.js", "tailwind css", "startup"],
  authors: [
    {
      name: "chenchenyyds",
      url: "https://github.com/chenchenyyds",
    }
  ],
  creator: '@chenchenyyds',
  openSourceURL: 'https://github.com/chenchenyyds/saas-landing-page',
  themeColors: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  nextThemeColor: 'dark',
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/logo.png",
  },
  headerLinks: [
    { name: 'repo', href: OPEN_SOURCE_URL, icon: BsGithub },
  ],
  footerLinks: [
    { name: 'github', href: "https://github.com/chenchenyyds/", icon: BsGithub },
  ],
  footerProducts: [
    { url: 'https://github.com/chenchenyyds/crm-dashboard', name: 'CRM Dashboard' },
    { url: 'https://github.com/chenchenyyds/data-dashboard', name: 'Data Dashboard' },
    { url: 'https://github.com/chenchenyyds/booking-appointment', name: 'Booking App' },
    { url: 'https://github.com/chenchenyyds/api-automation', name: 'API Automation' },
  ]
}

export const siteConfig: SiteConfig = {
  ...baseSiteConfig,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseSiteConfig.url,
    title: baseSiteConfig.name,
    images: [`${baseSiteConfig.url}/og.png`],
    description: baseSiteConfig.description,
    siteName: baseSiteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    site: baseSiteConfig.url,
    title: baseSiteConfig.name,
    description: baseSiteConfig.description,
    images: [`${baseSiteConfig.url}/og.png`],
    creator: baseSiteConfig.creator,
  },
}
