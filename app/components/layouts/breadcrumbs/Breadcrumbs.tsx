'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

const Breadcrumbs = () => {
	const pathname = usePathname();
	const pathSegments = pathname.split("/").filter(Boolean);

	return (
		<nav aria-label="breadcrumb" className="text-sm mb-2">
			<ol className="flex space-x-2">
				<li>
					{pathSegments.length === 0 ? (
						<span>ホーム</span>
					) : (
						<Link href="/" className="text-muted-foreground hover:text-foreground">
							ホーム
						</Link>
					)}
				</li>
				{pathSegments
					.filter(segment => segment !== "region") // "region" を除外
					.map((segment, index) => {
						const href = "/" + pathSegments.slice(0, index + 1).filter(s => s !== "region").join("/");
						const isLast = index === pathSegments.length - 1;

						return (
							<li key={href} className="flex items-center">
								<span className="mx-1 text-gray-600">＞</span>
								{isLast ? (
									<span>{decodeURIComponent(segment)}</span>
								) : (
									<Link href={href} className="text-muted-foreground hover:text-foreground">
										{decodeURIComponent(segment)}
									</Link>
								)}
							</li>
						);
					})}
			</ol>
		</nav>
	);
}

export default Breadcrumbs;
