import { motion } from 'framer-motion'

const TodayLive = () => {
    return (
        <motion.span className='w-14 text-[18px] font-bold'
            animate={{
                color: ["rgb(22, 188, 73)", "rgb(100, 100, 100)", "rgb(22, 188, 73)"]
            }}

            transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDuration: 2
            }}

        >
            Today
        </motion.span>
    )
}

export default TodayLive
