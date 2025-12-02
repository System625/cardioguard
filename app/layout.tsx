import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CardioGuard",
  description: "CardioGuard is an AI-powered web application that predicts cardiovascular disease (CVD) risk using machine learning. The application provides: Real-time risk assessment based on patient demographics, vital signs, and lifestyle factors Interactive visualizations including risk gauges and confidence metrics Model interpretability through SHAP (SHapley Additive exPlanations) analysis User-friendly interface with educational tooltips and clear explanations This project demonstrates the practical application of machine learning in healthcare for early detection and risk stratification of cardiovascular disease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
