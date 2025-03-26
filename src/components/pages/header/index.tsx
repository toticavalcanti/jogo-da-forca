import Link from 'next/link';
import { ResetBoard } from './client';
import ThemeToggle from './theme-toggle'; // se já estiver usando o botão de tema

export default function Header() {
	return (
		<header className="border-b">
			<div className="max-w-maxi mx-auto py-4 px-4 flex items-center justify-between">
				<p>
					<Link href="/" className="font-semibold text-muted-foreground text-lg tracking-wide">
						🎯 Jogo da Forca
					</Link>
				</p>

				<div className="flex items-center gap-4">
					<ThemeToggle />
					<ResetBoard>🔄 Jogar de novo</ResetBoard>
				</div>
			</div>
		</header>
	);
}
