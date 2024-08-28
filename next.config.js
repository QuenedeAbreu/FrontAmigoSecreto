/** @type {import('next').NextConfig} */
import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';

const nextConfig = {}
/** @type {import('next').NextConfig} */


if (process.env.NODE_ENV === 'development') {
  await setupDevPlatform();
}
module.exports = nextConfig
