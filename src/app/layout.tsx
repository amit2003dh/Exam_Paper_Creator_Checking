import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TestSetu AI – Smart Operating System for Coaching Institutes in India',
  description: 'AI-powered question paper generator, smartphone OMR checker, and automated parent WhatsApp notifications for JEE, NEET, and CBSE coaching institutes.',
  keywords: [
    'AI question paper generator',
    'online exam paper maker',
    'OMR sheet checker online',
    'coaching institute management software',
    'WhatsApp result notification',
    'coaching class software India',
    'AI test generator for teachers',
    'OMR scanner mobile camera',
  ],
  authors: [{ name: 'TestSetu AI Team' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'TestSetu AI – Coaching Institute Operating System',
    description: 'Create test papers with AI in 60 seconds, check OMR with mobile camera, and send automated WhatsApp report cards to parents.',
    url: 'https://testsetu.ai',
    siteName: 'TestSetu AI',
    locale: 'en_IN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'TestSetu AI',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web, Android, iOS',
    offers: {
      '@type': 'Offer',
      price: '799',
      priceCurrency: 'INR',
    },
    description: 'AI-powered operating system for coaching institutes, tuition centres and schools across India.',
  };

  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
