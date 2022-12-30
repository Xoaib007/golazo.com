/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
        domains: ['localhost', 'media.api-sports.io','media-2.api-sports.io', 'media-1.api-sports.io'],
      },
}

module.exports = nextConfig


// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   images: {
//     domains: ['localhost', 'media.api-sports.io','media-2.api-sports.io', 'media-1.api-sports.io'],
//   },
// }


// module.exports = nextConfig
