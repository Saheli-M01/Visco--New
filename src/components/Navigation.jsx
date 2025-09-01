import React, { useState } from "react";
import { Menu, X } from "lucide-react";

export const Navigation = () => {
	const [open, setOpen] = useState(false);

	const navItems = [
		{ href: "#home", label: "Home" },
		{ href: "#about", label: "About" },
		{ href: "#topics", label: "Topics" },
	];

	const closeMenu = () => setOpen(false);

	return (
		<header className="sticky top-0 z-50 w-full border-b border-border/50 bg-white/70 dark:bg-gray-900/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
			<div className="mx-auto max-w-6xl px-4">
				<div className="flex h-16 items-center justify-between">
					{/* Logo */}
					<a href="#home" className="text-xl font-extrabold tracking-tight">
						<span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">Visco</span>
					</a>

					{/* Desktop nav */}
					<nav className="hidden md:flex items-center gap-6 text-sm">
						{navItems.map((item) => (
							<a
								key={item.href}
								href={item.href}
								className="text-foreground/80 hover:text-foreground transition-colors"
							>
								{item.label}
							</a>
						))}
					</nav>

					{/* Right actions */}
					<div className="flex items-center gap-3">
						<a
							href="#topics"
							className="hidden md:inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow hover:shadow-md transition-shadow"
						>
							Get Started
						</a>
						<button
							className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-border/60 hover:bg-muted"
							aria-label="Toggle menu"
							onClick={() => setOpen((v) => !v)}
						>
							{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
						</button>
					</div>
				</div>
			</div>

			{/* Mobile menu */}
			{open && (
				<div className="md:hidden border-t border-border/50 bg-white/90 dark:bg-gray-900/90 backdrop-blur">
					<div className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-2">
						{navItems.map((item) => (
							<a
								key={item.href}
								href={item.href}
								onClick={closeMenu}
								className="py-2 text-foreground/90 hover:text-foreground"
							>
								{item.label}
							</a>
						))}
						<a
							href="#topics"
							onClick={closeMenu}
							className="mt-2 inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow hover:shadow-md"
						>
							Get Started
						</a>
					</div>
				</div>
			)}
		</header>
	);
};

