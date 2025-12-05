import { AnimatePresence, motion } from "motion/react"
import { ActionIcon, Select } from "@mantine/core"
import { IconLanguage, IconMenu2, IconMoon, IconSun, IconUserCode, IconX } from "@tabler/icons-react"
import { Link, NavLink, useLocation } from "react-router-dom"
import Logo from "../ui/Logo"
import { useStore } from "../../store/useStore"
import { useState } from "react"

const navLinks = [
    { href: "/", key: "home", label: "Bosh sahifa" },
    { href: "/about", key: "about", label: "Ma’lumotlar" },
    { href: "/libraries", key: "readers", label: "Kutubxonalar" },
    { href: "/books", key: "books", label: "Kitoblar" },
]

export default function Header() {
    const { isDark, toggleTheme, isAuth, user } = useStore()


    const [mobileMenuOpen, setMobileMenuOpen] = useState()

    const location = useLocation()
    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 right-0 z-50 px-4 py-3"
        >
            <div className="max-w-7xl mx-auto">
                <nav className="glass rounded-2xl px-6 py-3 flex items-center justify-between">
                    <Logo />

                    <div className="md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.key}
                                to={link.href}
                                className="relative text-foreground/80 hover:text-foreground transition-colors font-medium"
                            >
                                {link.label}
                                {location.pathname === link.href && (
                                    <motion.div
                                        layoutId="activeNav"
                                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                                    />
                                )}
                            </NavLink>
                        ))}

                        {
                            isAuth ?
                                (<NavLink to='/login' className="text-foreground/80 hover:text-foreground transition-colors font-bold hover:bg-accent-foreground px-3.5 py-1 rounded">
                                    Login
                                </NavLink>) : (<p>profile</p>)
                        }

                        <ActionIcon variant="subtle" size="lg" radius="xl" onClick={toggleTheme} className="text-foreground">
                            {isDark ? <IconSun size={20} /> : <IconMoon size={20} />}
                        </ActionIcon>
                    </div>

                    <div className="flex md:hidden items-center gap-2">
                        <ActionIcon variant="subtle" size="lg" radius="xl" onClick={toggleTheme} className="text-foreground">
                            {isDark ? <IconSun size={20} /> : <IconMoon size={20} />}
                        </ActionIcon>

                        <ActionIcon
                            variant="subtle"
                            size="lg"
                            radius="xl"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="text-foreground"
                        >
                            {mobileMenuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
                        </ActionIcon>
                    </div>
                </nav>

                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden mt-2 glass rounded-2xl overflow-hidden"
                        >
                            <div className="p-4 flex flex-col gap-2">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        to={link.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`px-4 py-3 rounded-xl transition-colors ${location.pathname === link.href
                                            ? "bg-primary/20 text-primary font-medium"
                                            : "text-foreground/80 hover:bg-primary/10"
                                            }`}
                                    >
                                        {link.key}
                                    </Link>
                                ))}
                                <div className="pt-2 border-t border-border">
                                    <Select
                                        size="sm"
                                        leftSection={<IconLanguage size={16} />}
                                        className="w-full"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.header>
    )
}
