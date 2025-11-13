export const metadata = {
  title: "Indian Village Morning - 3D Scene",
  description: "A Pixar-style soft 3D village scene with a happy boy playing.",
};

import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
