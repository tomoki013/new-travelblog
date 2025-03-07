"use client"

import ModeToggle from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

const routes = [
    {
        name: 'ホーム',
        path: '/',
    },
    {
        name: '旅行日記',
        path: '/diary',
    },
    {
        name: '観光情報',
        path: '/tourism',
    },
    {
        name: '写真ギャラリー',
        path: '/gallery',
    },
    {
        name: 'お問い合わせ',
        path: '/contact',
    },
]

const Header = () => {
    const pathname = usePathname()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 background-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2">
                        <span className="text-2xl font-bold">旅行日記</span>
                        <span className="text-sm font-medium text-muted-foreground">Travel Diary</span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex md:items-center md:gap-4">
                    <NavigationMenu>
                        <NavigationMenuList>
                            {routes.map((route) => (
                                <NavigationMenuItem key={route.path}>
                                    <Link href={route.path} legacyBehavior passHref>
                                        <NavigationMenuLink className={navigationMenuTriggerStyle()} active={pathname === route.path}>
                                            {route.name}
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                    <ModeToggle />
                </div>

                {/* Mobile Menu Button */}
                <div className="flex md:hidden">
                    <Button
                        variant='ghost'
                        size='icon'
                        aria-label="Toggle Menu"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="container md:hidden">
                    <nav className="flex flex-col space-y-3 pb-4">
                        {routes.map((route) => (
                            <Link
                                key={route.path}
                                href={route.path}
                                className={cn(
                                    'text-lg font-medium transition-colors hover:text-primary',
                                    pathname === route.path
                                        ? 'text-primary'
                                        : 'text-muted-foreground'
                                )}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {route.name}
                            </Link>
                        ))}
                        <div className="pt-2">
                            <ModeToggle />
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}

export default Header;
