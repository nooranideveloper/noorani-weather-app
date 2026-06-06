import { motion } from "framer-motion";
import { weatherIconUrl } from "../Services/api";
import { getDailyForecatDate } from "../utils";
import TodayLive from "./todaylive";



const container = {
    hide: {opacity: 0},
    visible: { opacity: 1}
}
const item = {
    hide: {opacity: 0, y: 12},
    visible: { opacity: 1, y: 0}
}

const DailyForecast = ({ foracastData }) => {
    return (
        
        <motion.div className="bg-gray-200 w-full rounded-2xl py-3 px-6 shadow text-gray-900 dark:text-gray-300 dark:bg-slate-700" variants={container} initial="hide" animate="visible" transition={{duration:1}}>
            
            <h2 className="text-xl font-semibold mb-2">Daily ForeCast</h2>

            {foracastData.list.map((dayItme, index) => {
                const {dt, main, weather} = dayItme;
                if (dayItme.dt_txt.includes("09:00:00")) {
                    return (
                        <motion.div key={dt} className='grid grid-cols-3 justify-between items-center border-b border-b-gray-400 dark:text-gray-400' variants={item} nitial="hide" animate="visible" transition={{duration: index}}>
                            <div>
                                <p className='text-[18] font-bold'>{getDailyForecatDate(dt, foracastData.city.timezone, <TodayLive />)}</p>
                                <p className='text-gray-500'>{weather[0].description}</p>
                            </div>
                            <div className="flex justify-center items-center">
                                <img className="h-16 md:h-28" src={`${weatherIconUrl}${weather[0].icon}@2x.png`} alt={weather[0].description}/>
                            </div>
                            <div className='flex justify-around items-center flex-col md:flex-row flex-wrap'>
                                <p className=' text-[18px]'>{Math.round(main.temp_max)}<sup>&deg;</sup></p>
                                <p className='text-gray-500 text-[16px]'>{Math.round(main.temp_min)}<sup>&deg;</sup></p>
                            </div>
                        </motion.div>
                    )
                }
            })}

        </motion.div>
    );
}

export default DailyForecast
