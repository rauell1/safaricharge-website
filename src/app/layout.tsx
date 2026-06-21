import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/toaster';
import { APP_CONFIG } from '@/lib/config';
import './globals.css';

const BASE_URL = 'https://safaricharge.rauell.systems';
const appDescription =
  "Kenya's #1 EV charging network for drivers, fleet managers, employees, and administrators. Find stations, manage fleets, and power Africa's electric future.";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: `${APP_CONFIG.name} | Kenya EV Charging Network`,
    template: `%s | ${APP_CONFIG.name}`,
  },
  description: appDescription,
  keywords: [
    'EV charging Kenya',
    'electric vehicle charging Nairobi',
    'EV stations Kenya',
    'SafariCharge',
    'fleet EV management Africa',
    'sustainable transport Kenya',
    'green energy Kenya',
    'electric car charging Nakuru',
    'EV infrastructure East Africa',
    'e-mobility solutions Africa',
  ],
  authors: [{ name: 'SafariCharge Ltd', url: BASE_URL }],
  alternates: {
    canonical: BASE_URL,
  },
  verification: {
    google: 'YopMsxRCWbWYZU_ANAhcwd6ggCeArux5CR37WuXqXXA',
    other: {
      'msvalidate.01': '66CE208CF02793B41D19362E121494C6',
    },
  },
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },
  openGraph: {
    title: `${APP_CONFIG.name} | Kenya EV Charging Network`,
    description: appDescription,
    url: BASE_URL,
    siteName: APP_CONFIG.name,
    type: 'website',
    locale: 'en_KE',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SafariCharge: Kenya EV Charging Network',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${APP_CONFIG.name} | Kenya EV Charging Network`,
    description: appDescription,
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
      name: 'SafariCharge',
      url: BASE_URL,
      logo: `${BASE_URL}/logo.svg`,
      description:
        "Kenya's EV charging network for drivers, fleet managers, employees, and administrators.",
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'KE',
        addressLocality: 'Nairobi',
        addressRegion: 'Nairobi County',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'info@rauell.systems',
        telephone: '+254700000000',
        contactType: 'customer service',
        areaServed: 'KE',
        availableLanguage: 'English',
      },
      sameAs: [],
    },
    {
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,
      url: BASE_URL,
      name: 'SafariCharge',
      description: appDescription,
      publisher: { '@id': `${BASE_URL}/#organization` },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${BASE_URL}/map?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/#webpage`,
      url: BASE_URL,
      name: 'SafariCharge | Kenya EV Charging Network',
      isPartOf: { '@id': `${BASE_URL}/#website` },
      about: { '@id': `${BASE_URL}/#organization` },
      description: appDescription,
      inLanguage: 'en-KE',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: BASE_URL,
          },
        ],
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-KE" suppressHydrationWarning>
      <head>
        <link rel="canonical" href={BASE_URL} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange={false}
        >
          {children}
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
