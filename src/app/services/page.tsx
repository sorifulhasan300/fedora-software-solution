import { ServicesPage } from "@/components/Module/ServicesPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services — Fedora Software Solution",
  description:
    "End-to-end e-commerce engineering services: custom storefronts, edutech platforms, SaaS software including order management, accounting, POS, and coupon systems.",
};

export default function ServicesRoute() {
  return <ServicesPage />;
}
