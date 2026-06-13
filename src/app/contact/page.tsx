import { ContactPage } from "@/components/Module/ContactPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — Fedora Software Solution",
  description:
    "Get in touch with the Fedora team. Whether you have a project in mind, need technical support, or just want to say hello — we'd love to hear from you.",
};

export default function ContactRoute() {
  return <ContactPage />;
}
