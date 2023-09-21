/** @type {import('next').NextConfig} */
const nextConfig = {
  // https://nextjs.org/docs/advanced-features/i18n-routing
  i18n: {
    localeDetection: false,
    locales: ['en-US', 'he-IL'],
    defaultLocale: 'he-IL'
  },
  reactStrictMode: true,
}

module.exports = nextConfig
