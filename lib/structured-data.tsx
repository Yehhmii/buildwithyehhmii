export function generateStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': 'hhttps://buildwithyehhmii.vercel.app/#person',
        name: 'YEHHMII',
        url: 'https://buildwithyehhmii.vercel.app',
        image: 'https://buildwithyehhmii.vercel.app/profile-image.jpg',
        email: 'franciscoabhulimen@gmail.com',
        jobTitle: 'Full-Stack Developer & Software Engineer',
        worksFor: {
          '@type': 'Organization',
          name: 'Freelance',
        },
        sameAs: [
          'https://github.com/Yehhmii',
          'https://www.linkedin.com/in/abhulimen-francisco-4928a0294?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
          'https://twitter.com/yehhmii',
        ],
        knowsAbout: [
          'Web Development',
          'Mobile App Development',
          'React',
          'Next.js',
          'Node.js',
          'TypeScript',
          'Python',
          'AI Integration',
          'Full-Stack Development',
        ],
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'Nigeria',
        },
      },
      {
        '@type': 'WebSite',
        '@id': 'https://buildwithyehhmii.vercel.app/#website',
        url: 'https://buildwithyehhmii.vercel.app',
        name: 'YEHHMII Portfolio',
        description: 'Full-stack developer portfolio showcasing web applications, mobile apps, and AI solutions',
        publisher: {
          '@id': 'https://buildwithyehhmii.vercel.app/#person',
        },
        inLanguage: 'en-US',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://buildwithyehhmii.vercel.app/?s={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'WebPage',
        '@id': 'https://buildwithyehhmii.vercel.app/#webpage',
        url: 'https://buildwithyehhmii.vercel.app',
        name: 'YEHHMII - Full-Stack Developer & Software Engineer',
        isPartOf: {
          '@id': 'https://buildwithyehhmii.vercel.app/#website',
        },
        about: {
          '@id': 'https://buildwithyehhmii.vercel.app/#person',
        },
        description: 'Full-stack developer specializing in web applications, mobile apps, AI solutions, and automation. Expert in React, Next.js, Node.js, Python.',
        inLanguage: 'en-US',
      },
      {
        '@type': 'ProfessionalService',
        '@id': 'https://buildwithyehhmii.vercel.app/#service',
        name: 'YEHHMII Development Services',
        description: 'Professional web and mobile development services',
        provider: {
          '@id': 'https://buildwithyehhmii.vercel.app/#person',
        },
        areaServed: 'Worldwide',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Development Services',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Web Application Development',
                description: 'Full-stack web applications with modern frameworks',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Mobile App Development',
                description: 'iOS and Android mobile applications',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'AI Integration',
                description: 'Artificial intelligence and machine learning solutions',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Automation Solutions',
                description: 'Custom workflow automation and process optimization',
              },
            },
          ],
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://buildwithyehhmii.vercel.app/#breadcrumb',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            item: {
              '@id': 'https://buildwithyehhmii.vercel.app',
              name: 'Home',
            },
          },
        ],
      },
    ],
  };
}

// Usage in your page:
// Add this to app/page.tsx or layout.tsx
export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(generateStructuredData()),
      }}
    />
  );
}