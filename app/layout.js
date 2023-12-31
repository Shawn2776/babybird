import { Roboto } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/utils/providers/auth/AuthProvider";
import QueryProvider from "@/utils/providers/query/QueryProvider";

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
          className={`${roboto.className} bg-gradient-to-b from-[#55BCC9] to-oxford min-h-screen w-full`}
        >
          <QueryProvider>{children}</QueryProvider>
        </body>
      </AuthProvider>
    </html>
  );
}
