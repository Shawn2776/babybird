import AuthProvider from "./providers/auth/AuthProvider";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  style: ["normal", "italic"],
});

export const metadata = {
  title: "uTalkTo",
  description: "Generated by webDev2776",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body
          className={`${roboto.className} bg-gradient-to-b from-oxford via-cambridge to-bittersweet min-h-screen`}
        >
          <div>{children}</div>
        </body>
      </AuthProvider>
    </html>
  );
}
