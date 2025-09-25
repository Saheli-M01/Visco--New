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
		<header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
			<div className="mx-auto max-w-6xl px-4">
				<div className="flex h-16 items-center justify-between">
					{/* Logo */}
					<a href="#home" className="text-xl font-extrabold tracking-tight">
						<span className="text-gray-900 font-bold">Visco</span>
					</a>

					{/* Desktop nav */}
					<nav className="hidden md:flex items-center gap-6 text-sm">
						{navItems.map((item) => (
							<a
								key={item.href}
								href={item.href}
								className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
							>
								{item.label}
							</a>
						))}
					</nav>

					{/* Right actions */}
					<div className="flex items-center gap-3">
						<a
							href="#topics"
							className="hidden md:inline-flex items-center rounded-xl bg-white/30 backdrop-blur-sm border border-white/40 px-4 py-2 text-sm font-semibold text-gray-900 shadow-md hover:bg-white/40 hover:shadow-lg transition-all"
						>
							Get Started
						</a>
						<button
							className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md backdrop-blur-sm bg-white/20 border border-white/30 hover:bg-white/30 transition-all"
							aria-label="Toggle menu"
							onClick={() => setOpen((v) => !v)}
						>
							{open ? <X className="h-5 w-5 text-gray-900" /> : <Menu className="h-5 w-5 text-gray-900" />}
						</button>
					</div>
				</div>
			</div>

			{/* Mobile menu */}
			{open && (
				<div className="md:hidden border-t border-white/20 bg-white/20 backdrop-blur-md">
					<div className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-2">
						{navItems.map((item) => (
							<a
								key={item.href}
								href={item.href}
								onClick={closeMenu}
								className="py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors"
							>
								{item.label}
							</a>
						))}
						<a
							href="#topics"
							onClick={closeMenu}
							className="mt-2 inline-flex items-center rounded-xl bg-white/30 backdrop-blur-sm border border-white/40 px-4 py-2 text-sm font-semibold text-gray-900 shadow-md hover:bg-white/40"
						>
							Get Started
						</a>
					</div>
				</div>
			)}
		</header>
	);
};

