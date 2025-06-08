import { Metadata } from "next";
import TodoPage from "./todo/page";

export const metadata: Metadata = {
  title: "Todo Metamask - Web3 Task Manager",
  description: "A decentralized todo list app using MetaMask for authentication.",
  keywords: ["Web3", "MetaMask", "Todo List", "Next.js", "Decentralized App", "Task Manager"],
  authors: [{ name: "Ari Jaya", url: "https://todo-meta.onrender.com" }],
  icons: {
    icon: [
      {
        url: "/images/metamask.png",
        href: "/images/metamask.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  openGraph: {
    title: "Todo Metamask",
    description: "Manage your tasks securely using MetaMask and Web3.",
    url: "https://todo-meta.onrender.com",
    siteName: "Todo Metamask",
    images: [
      {
        url: "/images/metamask.png",
        width: 1200,
        height: 630,
        alt: "Todo Metamask Screenshot",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Todo Metamask",
    description: "Web3 Todo App secured by MetaMask",
    images: ["/images/metamask.png"],
    creator: "@jayakusumaMe",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  themeColor: "#ffffff",
};

export default function Home() {
  return (
    <main>
      <TodoPage />
    </main>
  );
}
