import { IconLock, IconPhone, IconUser } from '@tabler/icons-react'
import { motion } from "motion/react"
import { Candle } from '../home/Candle'
import { Button, Input, PasswordInput, TextInput } from '@mantine/core'
import { useStore } from '../../store/useStore'
import { useMutation } from '@tanstack/react-query'
import { API } from '../../api/API'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
    const { login } = useStore()
    const navigate = useNavigate()
    // const [error, setError] = useState("")


    const phoneRef = useRef()
    const passwordRef = useRef()

    const { mutate: loginMut } = useMutation({
        mutationKey: ["login"],
        mutationFn: async (body) => {
            const res = await API.post("/api/v1/auth/login/", body)
            return res

        }
    })

    const handleSubmitLogin = (e) => {
        e.preventDefault()

        const newUser = {
            password: passwordRef.current.value,
            phone: phoneRef.current.value,
        }

        console.log(newUser);


        loginMut(newUser, {
            onSuccess: (res) => {
                console.log(res);
                login(res.data.user, res.data.access)
                navigate("/profile")

                alert("to'gri")

            },
            onError: (err) => {
                console.log(err);
                alert("xato")

            }
        })
    }

    return (
        <section className="min-h-screen bg-background">
            <main className="pt-24 pb-16 px-4">
                <div className="max-w-md mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="glass rounded-3xl p-8"
                    >
                        <div className="text-center mb-8">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring" }}
                                className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center"
                            >
                                <IconLock size={40} className="text-primary" />
                            </motion.div>
                            <h1 className="text-2xl font-bold text-foreground mb-2">Ro'yxatdan o'tish</h1>
                            <p className="text-muted-foreground">Ro'yxatdan o'tish uchun ma'lumotlarni to'gri kiriting</p>
                        </div>

                        {/* {error && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                                <Alert icon={<IconAlertCircle size={16} />} color="red" className="mb-4" variant="light">
                                    {error}
                                </Alert>
                            </motion.div>
                        )} */}

                        <form onSubmit={handleSubmitLogin} className="space-y-4">
                            <TextInput
                                label={"Telefon raqam:"}

                                // placeholder={t("phonePlaceholder")}
                                // value={phone}
                                // onChange={(e) => setPhone(e.target.value)}
                                ref={phoneRef} defaultValue="+998996605809" placeholder='+998 __ ___ __ __'
                                leftSection={<IconPhone size={18} />}
                                size="md"
                                required
                                styles={{
                                    input: {
                                        backgroundColor: "hsl(var(--card))",
                                        borderColor: "hsl(var(--border))",
                                        color: "hsl(var(--foreground))",
                                    },
                                    label: {
                                        color: "hsl(var(--foreground))",
                                        marginBottom: "0.5rem",
                                    },
                                }}
                            />

                            <PasswordInput
                                label={"Password"}
                                // placeholder={t("passwordPlaceholder")}
                                // value={password}
                                // onChange={(e) => setPassword(e.target.value)}
                                ref={passwordRef} defaultValue="121212" placeholder='Password kiriting'
                                leftSection={<IconLock size={18} />}
                                size="md"
                                required
                                styles={{
                                    input: {
                                        backgroundColor: "hsl(var(--card))",
                                        borderColor: "hsl(var(--border))",
                                        color: "hsl(var(--foreground))",
                                    },
                                    label: {
                                        color: "hsl(var(--foreground))",
                                        marginBottom: "0.5rem",
                                    },
                                }}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                size="lg"
                                // loading={loading}
                                className="bg-primary hover:bg-primary/90 text-primary-foreground mt-6"
                            >
                                Ro'yxatdan o'tish
                            </Button>
                        </form>
                    </motion.div>
                </div>
            </main>
        </section>
    )
}

export default LoginPage
