import { useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { motion } from "motion/react"
import { Button, Badge, Avatar } from "@mantine/core"
import {
    IconUser,
    IconPhone,
    IconMapPin,
    IconBrandInstagram,
    IconBrandFacebook,
    IconBrandTelegram,
    IconBook,
    IconLogout,
    IconArrowLeft,
    IconCheck,
    IconX,
    IconBrandGoogleMaps,
} from "@tabler/icons-react"
import { useStore } from "@/store/useStore"

import { useQuery } from "@tanstack/react-query"
import { API } from "@/api/API"

export default function ProfilePage() {
    const navigate = useNavigate()
    const { isAuth, user, logout } = useStore()

    useEffect(() => {
        if (!isAuth) navigate("/login")
    }, [isAuth, navigate])

    const { data: profileData, isLoading, isError } = useQuery({
        queryKey: ["user-profile"],
        queryFn: async () => {
            const res = await API.get("/api/v1/auth/profile/")
            return res.data
        },
        enabled: isAuth,
    })

    if (!isAuth) return null
    if (isLoading) return <p>Loading...</p>
    if (isError) return <p>Error loading profile</p>

    const profile = profileData

    const handleLogout = () => {
        logout()
        navigate("/")
    }

    return (
        <div className="min-h-screen bg-background">
            <main className="pt-36 pb-16 px-4 max-w-4xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground text-center">Foydalanuvchi sahifa</h1>

                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-6">
                    <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
                        <IconArrowLeft size={20} /> Orqaga
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="glass rounded-3xl p-8 mb-6"
                >
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <Avatar size={120} radius="xl" color="primary" className="ring-4 ring-primary/20">
                            <IconUser size={60} />
                        </Avatar>

                        <div className="text-center md:text-left flex-1">
                            <h1 className="text-3xl font-bold text-foreground mb-2">{profile?.user?.name}</h1>
                            <p className="text-muted-foreground flex items-center justify-center md:justify-start gap-2">
                                <IconPhone size={18} />
                                {profile?.user?.phone}
                            </p>
                        </div>

                        <Button variant="light" color="red" leftSection={<IconLogout size={18} />} onClick={handleLogout}>
                            Chiqish
                        </Button>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="glass rounded-2xl p-6"
                    >
                        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                            <IconMapPin size={20} className="text-primary" /> Bog'lanish
                        </h2>
                        <p className="text-muted-foreground mb-1">Manzil</p>
                        <p className="text-foreground">{profile?.address}</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="glass rounded-2xl p-6"
                    >
                        <h2 className="text-lg font-semibold text-foreground mb-4">Ijtimoiy tarmoqlar</h2>

                        <div className="space-y-3">
                            <a
                                href={`https://instagram.com/${profile?.social_media?.instagram?.replace("@", "")}`}
                                target="_blank"
                                className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted"
                            >
                                <IconBrandInstagram size={24} className="text-pink-500" /> {profile?.social_media?.instagram}
                            </a>
                            <a
                                href={`https://facebook.com/${profile?.social_media?.facebook}`}
                                target="_blank"
                                className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted"
                            >
                                <IconBrandFacebook size={24} className="text-blue-600" /> {profile?.social_media?.facebook}
                            </a>
                            <a
                                href={`https://t.me/${profile?.social_media?.telegram?.replace("@", "")}`}
                                target="_blank"
                                className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted"
                            >
                                <IconBrandTelegram size={24} className="text-sky-500" /> {profile?.social_media?.telegram}
                            </a>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="glass rounded-2xl p-6 md:col-span-2"
                    >
                        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                            <IconBrandGoogleMaps size={20} className="text-primary" /> Google Map
                        </h2>

                    </motion.div>
                </div>
            </main>
        </div>
    )
}
