'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
	const [isDark, setIsDark] = useState(false);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const html = document.documentElement;
			const isDarkMode = html.classList.contains('dark');
			setIsDark(isDarkMode);
		}
	}, []);

	const toggleTheme = () => {
		const html = document.documentElement;
		html.classList.toggle('dark');
		setIsDark(html.classList.contains('dark'));
	};

	return (
		<button
			onClick={toggleTheme}
			className="text-sm font-medium px-3 py-1 border rounded-md hover:bg-muted transition-all"
			title="Alternar tema"
		>
			{isDark ? '☀️ Claro' : '🌙 Escuro'}
		</button>
	);
}
