import { motion } from 'motion/react'

const About = () => {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto grid place-content-center min-h-screen">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight text-balance"
        >
          Sahifa hali mavjud emas
        </motion.h1>
      </div>
    </div>
  )
}

export default About
