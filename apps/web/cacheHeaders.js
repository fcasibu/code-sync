module.exports = [
  {
    source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
    headers: [
      {
        key: 'CDN-Cache-Control',
        value: 'public, max-age=600, stale-while-revalidate=300',
      },
    ],
  },
];
