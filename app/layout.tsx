import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body className={``} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}