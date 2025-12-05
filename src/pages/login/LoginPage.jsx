import { IconUser } from '@tabler/icons-react'
import { Candle } from '../home/Candle'
import { Input, PasswordInput } from '@mantine/core'
import { useStore } from '../../store/useStore'
import { useMutation } from '@tanstack/react-query'
import { API } from '../../api/API'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
    const {login } = useStore()
    const navigate = useNavigate()

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
        <section className="relative min-h-screen overflow-hidden pt-24 pb-12 flex items-center">
            <div className='flex items-center'>
                <div className='w-2xl'>
                    <Candle />
                </div>
                <div className='w-2xl'>
                    <form className='flex flex-col' onSubmit={handleSubmitLogin}>
                        <IconUser />
                        <h1>Ro'yxatdan o'tish </h1>
                        <Input ref={phoneRef} defaultValue="+998996605809"placeholder='+998 __ ___ __ __' />
                        <PasswordInput ref={passwordRef} defaultValue="121212" placeholder='Password kiriting' />
                        <button type='submit' className='w-full p-4 bg-accent-foreground rounded mt-2.5'>Login</button>
                    </form>
                </div>
            </div>

        </section>
    )
}

export default LoginPage
