import { Careers } from "@/components/Module/Careers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join the Fedora team. We're hiring senior engineers, designers, and AI specialists to build the future of e-commerce technology.",
};

export default function CareersPage() {
  return <Careers />;
}