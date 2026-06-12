"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Code2 } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false);
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 w-full py-4 px-4 sm:px-6 lg:px-8">
            {/* Pill Container */}
            <div className="mx-auto flex h-14 max-w-5xl items-center justify-between rounded-full border border-primary/20 bg-card/80 px-3 pl-4 shadow-[0_0_30px_rgba(37,99,235,0.08)] backdrop-blur-md transition-all duration-300">

                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2.5 group shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 border border-primary/25 text-primary group-hover:border-primary/50 group-hover:bg-primary/15 transition-all duration-300">
                        <Code2 className="h-4 w-4" />
                    </div>
                    <span className="font-sans text-[15px] font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                        Fedora<span className="text-primary">.</span>
                    </span>
                </Link>

                {/* Desktop Navigation — Centered */}
                <nav className="hidden md:flex items-center gap-0.5 absolute left-1/2 -translate-x-1/2">
                    {navLinks.map(({ href, label }) => (
                        <Link
                            key={href}
                            href={href}
                            className={cn(
                                "rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200",
                                pathname === href
                                    ? "bg-primary/12 text-primary"
                                    : "text-muted-foreground hover:text-foreground hover:bg-accent/60"
                            )}
                        >
                            {label}
                        </Link>
                    ))}

                    {/* Company Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger className={cn(
                            "flex items-center gap-1 rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 focus:outline-none",
                            pathname.startsWith("/about") || pathname.startsWith("/portfolio") || pathname.startsWith("/careers")
                                ? "bg-primary/12 text-primary"
                                : "text-muted-foreground hover:text-foreground hover:bg-accent/60"
                        )}>
                            Company
                            <ChevronDown className="h-3.5 w-3.5 opacity-60" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="center"
                            className="bg-card/95 backdrop-blur-md border-border rounded-xl w-44 mt-2"
                        >
                            <DropdownMenuItem className="focus:bg-primary/10 focus:text-primary rounded-lg cursor-pointer">
                                <Link href="/about" className="w-full">About Us</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="focus:bg-primary/10 focus:text-primary rounded-lg cursor-pointer">
                                <Link href="/portfolio" className="w-full">Our Work</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="focus:bg-primary/10 focus:text-primary rounded-lg cursor-pointer">
                                <Link href="/careers" className="w-full">Careers</Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </nav>

                {/* CTA Button */}
                <div className="hidden md:flex items-center shrink-0">
                    <Button
                        variant="default"
                        className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-[0_4px_20px_rgba(37,99,235,0.3)] hover:shadow-[0_4px_28px_rgba(37,99,235,0.5)] hover:bg-primary/90 transition-all duration-300"
                    >
                        Get Started
                    </Button>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex md:hidden items-center justify-center rounded-full p-2 text-muted-foreground hover:bg-accent hover:text-foreground transition-all focus:outline-none"
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
            </div>

            {/* Mobile Dropdown */}
            {isOpen && (
                <div className="md:hidden mt-2 mx-auto max-w-5xl rounded-2xl border border-border bg-card/95 backdrop-blur-lg shadow-lg animate-in fade-in slide-in-from-top-3 duration-200">
                    <div className="space-y-0.5 p-3">
                        {navLinks.map(({ href, label }) => (
                            <Link
                                key={href}
                                href={href}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                    "block rounded-xl px-4 py-2.5 text-sm font-medium transition-all",
                                    pathname === href
                                        ? "bg-primary/10 text-primary"
                                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                                )}
                            >
                                {label}
                            </Link>
                        ))}
                        <Link href="/about" onClick={() => setIsOpen(false)} className="block rounded-xl px-4 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-all">About Us</Link>
                        <Link href="/portfolio" onClick={() => setIsOpen(false)} className="block rounded-xl px-4 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-all">Our Work</Link>
                        <Link href="/careers" onClick={() => setIsOpen(false)} className="block rounded-xl px-4 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-all">Careers</Link>
                        <div className="pt-2 pb-1 px-1">
                            <Button className="w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 py-5 font-semibold">
                                Get Started
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}