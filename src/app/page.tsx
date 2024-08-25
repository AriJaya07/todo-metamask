import { Metadata } from "next";
import TodoPage from "./todo/page";

export const metadata: Metadata = {
  title: "Todo Metamask",
  description: "Generated Todo Metamask",
};

export default function Home() {
  return (
    <main>
      <TodoPage />
    </main>
  );
}
