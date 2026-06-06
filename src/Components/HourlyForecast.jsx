import { motion } from "framer-motion";
import { weatherIconUrl } from "../Services/api";
import { getHourlyForecatDate, twilveFormat } from "../utils";

const container = {
    hide: {opacity: 0},
    visible: { opacity: 1}
}
const item = {
    hide: {opacity: 0, x: 0},
    visible: { opacity: 1, x: 10}
}


const HourlyForecast = ({ foracastData}) => {

  // Calculate Local Time

  return (
    <div className="bg-gray-200 w-full mt-5 rounded-2xl py-3 px-6 shadow  text-gray-900 dark:text-gray-300 dark:bg-slate-700">
      <h2 className="text-xl font-semibold mb-4">Hourly ForeCast</h2>

      <motion.div className="flex overflow-scroll relative" variants={container} initial="hide" animate="visible" transition={{duration:1}}>

        {foracastData.list.slice(0, 25).map((forecastItem, index) => {

          const { dt, weather, main, wind } = forecastItem;
          return (
            <motion.div className="text-[17px] dark:text-gray-400" key={index} variants={item} nitial="hide" animate="visible" transition={{duration: index}}>
              <div className="w-18 md:w-28 flex flex-col justify-center items-center gap-y-0.3">
                {index === 0 ?
                  <motion.span className='w-14 text-xl font-bold'
                    animate={{
                      color: ["rgb(200, 18, 7)", "rgb(100, 100, 100)", "rgb(200, 18, 7)"]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                      repeatDuration: 2
                    }}

                  >
                    Now
                  </motion.span>
                  :
                  <p>{twilveFormat(getHourlyForecatDate(dt, foracastData.city.timezone))}</p>
                }


                <img src={`${weatherIconUrl}${weather[0].icon}@2x.png`} alt={weather[0].description} />
                <p>{Math.round(main.temp)}<sup>&deg;</sup></p>
              </div>
              <div>
                <p className="text-center mt-8 pb-3">{wind.speed}</p>
              </div>
            </motion.div>
          );
        })}
        <h2 className="text-[17px] font-semibold mb-3 absolute bottom-6">Wind m/s</h2>


      </motion.div>
    </div>
  )
}

export default HourlyForecast;
