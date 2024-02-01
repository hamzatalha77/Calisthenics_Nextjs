/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'res.cloudinary.com',
      's.gravatar.com',
      'avatars.githubusercontent.com'
    ]
  }
}

module.exports = nextConfig
