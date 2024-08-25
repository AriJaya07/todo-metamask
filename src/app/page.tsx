import { Metadata } from "next";
import TodoPage from "./todo/page";

export const metadata: Metadata = {
  title: "Todo Metamask",
  description: "Generated Todo Metamask",
  icons: {
		icon: [
			{
				url: '/images/metamask.png',
				href: '/images/metamask.png',
				sizes: '512x512',
			}
		],
	},
};

export default function Home() {
  return (
    <main>
      <TodoPage />
    </main>
  );
}
