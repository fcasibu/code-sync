module.exports = [
  {
    source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
    headers: [
      {
        key: 'CDN-Cache-Control',
        value: 'public, s-maxage=600, stale-while-revalidate=300',
      },
    ],
  },
];
