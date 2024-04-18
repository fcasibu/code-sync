module.exports = [
  {
    source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
    headers: [
      {
        key: 'CDN-Cache-Control',
        value: 'public, s-max-age=300, stale-while-revalidate=120',
      },
    ],
  },
];
