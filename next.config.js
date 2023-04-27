/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["mongoose"],
    images:{
      loader:'cloudinary',
      path:"cdn.myanimelist.net"
    }

    
  },
  webpack(config) {
    config.experiments = { ...config.experiments, topLevelAwait: true }
    return config
  },
}

module.exports = nextConfig
