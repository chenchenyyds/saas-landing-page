/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL || "https://saas-landing-page-b2qzrnom0-chenchenyyds-projects.vercel.app",
  generateRobotsTxt: true,
  sitemapSize: 7000,
};
