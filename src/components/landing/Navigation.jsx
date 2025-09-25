import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

export const Navigation = () => {
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();

	const navItems = [
		{ href: "#home", label: "Home" },
		{ href: "#about", label: "About" },
		{ href: "#topics", label: "Topics" },
	];

	const closeMenu = () => setOpen(false);

	// Check if we're on the home page
	const isHomePage = location.pathname === "/";

	// Handle navigation clicks
	const handleNavClick = (e, href) => {
		e.preventDefault();
		closeMenu();

		const scrollToSection = () => {
			const targetId = href.replace("#", "");
			const targetElement = document.getElementById(targetId);
			if (targetElement) {
				// Dynamically get navbar height
				const navbar = document.querySelector('header');
				const navbarHeight = navbar ? navbar.offsetHeight : 64;
				
				// Add some extra padding for better visual spacing
				const extraPadding = 20;
				const totalOffset = navbarHeight + extraPadding;
				
				const elementPosition = targetElement.getBoundingClientRect().top;
				const offsetPosition = elementPosition + window.pageYOffset - totalOffset;

				window.scrollTo({
					top: offsetPosition,
					behavior: "smooth"
				});
			}
		};

		if (isHomePage) {
			// We're on home page, smooth scroll to section with navbar offset
			scrollToSection();
		} else {
			// We're on a different page, navigate to home first then scroll
			navigate("/");
			// Use setTimeout to wait for navigation to complete
			setTimeout(scrollToSection, 150);
		}
	};

	const handleLogoClick = (e) => {
		e.preventDefault();
		closeMenu();

		if (isHomePage) {
			// Scroll to top
			window.scrollTo({
				top: 0,
				behavior: "smooth",
			});
		} else {
			// Navigate to home
			navigate("/");
		}
	};

	return (
		<header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
			<div className="mx-auto max-w-6xl px-4">
				<div className="flex h-16 items-center justify-between">
					{/* Logo */}
					<a 
						href="#home" 
						onClick={handleLogoClick}
						className="text-xl font-extrabold tracking-tight cursor-pointer"
					>
						<span className="text-gray-900 font-bold">Visco</span>
					</a>

					{/* Desktop nav */}
					<nav className="hidden md:flex items-center gap-6 text-sm">
						{navItems.map((item) => (
							<a
								key={item.href}
								href={item.href}
								onClick={(e) => handleNavClick(e, item.href)}
								className="text-gray-700 hover:text-gray-900 transition-colors font-medium cursor-pointer"
							>
								{item.label}
							</a>
						))}
					</nav>

					{/* Right actions */}
					<div className="flex items-center gap-3">
						<a
							href="#topics"
							onClick={(e) => handleNavClick(e, "#topics")}
							className="hidden md:inline-flex items-center rounded-xl bg-white/30 backdrop-blur-sm border border-white/40 px-4 py-2 text-sm font-semibold text-gray-900 shadow-md hover:bg-white/40 hover:shadow-lg transition-all cursor-pointer"
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
								onClick={(e) => handleNavClick(e, item.href)}
								className="py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors cursor-pointer"
							>
								{item.label}
							</a>
						))}
						<a
							href="#topics"
							onClick={(e) => handleNavClick(e, "#topics")}
							className="mt-2 inline-flex items-center rounded-xl bg-white/30 backdrop-blur-sm border border-white/40 px-4 py-2 text-sm font-semibold text-gray-900 shadow-md hover:bg-white/40 cursor-pointer"
						>
							Get Started
						</a>
					</div>
				</div>
			)}
		</header>
	);
};

