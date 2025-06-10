export default function manifest() {
  return {
    name: 'Serhii Churilov',
    short_name: 'Serhii Churilov',
    description:
      'Serhii Churilov is an award-winning Digital Art Director and Designer, Awwwards Judge (2020-2025), specializing in web design, branding, and motion design to craft innovative brand stories.',
    start_url: '/',
    display: 'standalone',
    background_color: '#9b9b88',
    theme_color: '#9b9b88',
    icons: [
      {
        src: '/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
