import { motion } from "motion/react"
import {
    IconBrandTwitter,
    IconBrandFacebook,
    IconBrandInstagram,
    IconMail,
    IconPhone,
    IconMapPin,
    IconHandLoveYou,
} from "@tabler/icons-react"
import Logo from "../ui/logo"
import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <footer className="relative mt-20">
            <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="glass rounded-3xl p-8 md:p-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                        <div className="space-y-4">
                            <Logo size='lg' />

                            <p className="text-muted-foreground text-sm leading-relaxed">Kutubxona - Bilimga yo'lingiz</p>
                            <div className="flex gap-3">
                                {[IconBrandTwitter, IconBrandFacebook, IconBrandInstagram].map((Icon, i) => (
                                    <motion.a
                                        key={i}
                                        href="https://t.me/SIN_xsi"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                                    >
                                        <Icon size={20} />
                                    </motion.a>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="font-serif font-semibold text-lg mb-4">Tezkor havolalar</h4>
                            <nav className="flex flex-col gap-2">
                                {["Bosh sahifa", "Ma'lumotlar", "Kutubxonalar", "Kitoblar"].map((key, index) => (
                                    <Link
                                        key={index}
                                        className="text-muted-foreground hover:text-primary transition-colors text-sm"
                                    >
                                        {key}
                                    </Link>
                                ))}
                            </nav>
                        </div>

                        <div>
                            <h4 className="font-serif font-semibold text-lg mb-4">Biz bilan bog'laning</h4>
                            <div className="space-y-3">
                                <a
                                    href="mailto:hello@xona.lib"
                                    className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors text-sm"
                                >
                                    <IconMail size={18} />
                                    sayfullayev@icloud.com
                                </a>
                                <a
                                    href="tel:+1555000123"
                                    className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors text-sm"
                                >
                                    <IconPhone size={18} />
                                    +998 99 660 5809
                                </a>
                                <div className="flex items-start gap-3 text-muted-foreground text-sm">
                                    <IconMapPin size={18} className="mt-0.5 flex-shrink-0" />
                                    <span>
                                        70 home
                                        <br />
                                        Chilonzor 9, Qatortol 3
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="my-5 text-center">
                            <span className="font-serif font-semibold text-3xl mb-1 block">Kelajak</span>
                            <span className="font-serif font-semibold text-2xl mb-4">yoshlar qo'lida!</span>
                            <div className='grid place-content-center mt-2'><IconHandLoveYou size={30}/></div>
                        </div>
                    </div>

                    <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-muted-foreground">
                            © {new Date().getFullYear()} Kutubxona. Barcha huquqlar himoyalangan.
                        </p>
                        <div className="flex gap-6 text-sm text-muted-foreground">
                            <Link to="/" className="hover:text-primary transition-colors">
                                Privacy Policy
                            </Link>
                            <Link to="/" className="hover:text-primary transition-colors">
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
