export const metadata = {
    title: 'Food Delivery App',
    description: 'Best food delivery service',

  };
  
  export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body>{children}</body>
      </html>
    );
  }
  