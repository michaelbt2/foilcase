import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/collection',
          '/settings',
          '/sign-in',
          '/sign-up',
          '/welcome',
        ],
      },
    ],
    sitemap: 'https://foilcase.com/sitemap.xml',
  }
}