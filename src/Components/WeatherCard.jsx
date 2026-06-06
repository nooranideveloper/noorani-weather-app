import { motion } from "framer-motion";
import { weatherIconUrl } from "../Services/api";
import { getFormatDate } from "../utils";
import WeatherSubCard from "./WeatherSubCard";
import { BsEye } from "react-icons/bs";
import { FaWind } from "react-icons/fa";
import { GiPressureCooker } from "react-icons/gi";
import { CgDrop } from "react-icons/cg";

const ani = {
    hide: {opacity: 0, y: 12},
    visible: { opacity: 1, y: 0}
}

const WeatherCard = ({ data }) => {
    const { name, sys, main, weather, wind, visibility } = data;

    const countryFullName = (countryCode) => {
        return new Intl.DisplayNames(['en-US'], {
            type: 'region'
        }).of(countryCode)
    }

    return (
        <>
            {/* main contant */}
            <div className="w-full flex justify-between items-center">
                {/* lift */}
                <div className="flex flex-col items-start gap-y-3 text-gray-200">
                
                    <motion.div variants={ani} initial="hide" animate="visible"  transition={{duration: 0.7}}>
                        <h1 className="text-[18px] md:text-xl lg:text-2xl font-semibold">{name}, {countryFullName(sys.country)}</h1>
                        <h3 className="text-[17px]">{getFormatDate()}</h3>
                    </motion.div>

                    <motion.div variants={ani} initial="hide" animate="visible" transition={{duration: 1}}>
                        <h1 className="text-2xl md:text-5xl lg:text-7xl">{Math.round(main.temp)}<sup>&deg;c</sup></h1>
                    </motion.div>
                    
                    <motion.div variants={ani} initial="hide" animate="visible" transition={{duration: 1.4}}>
                        <h1 className="text-xl md:text-2xl font-semibold">{weather[0].description}</h1>
                        <h3 className="text-[16px] font-semibold">Feels like {main.feels_like}<sup>&deg;c</sup></h3>
                    </motion.div>
                </div>

                {/* right */}
                <div className="w-1/2 flex justify-center items-center">
                    <img src={`${weatherIconUrl}${weather[0].icon}@2x.png`} alt={weather[0].description} className="h-32 md:h-72" />
                </div>

            </div >


            {/* sub contant */}
            <div div className="w-full grid grid-cols-2 gap-3 md:grid-cols-4" >
                <WeatherSubCard img={<CgDrop color="blue" size={28} />} title={"Humidity"} data={`${main.humidity} %`} />
                <WeatherSubCard img={<FaWind color="blue" size={28} />} title={"Wind"} data={`${wind.speed} m/s`} />
                <WeatherSubCard img={<GiPressureCooker color="gray" size={30} />} title={"Pressure"} data={`${main.pressure} hPa`} />
                <WeatherSubCard img={<BsEye color="gray" size={30} />} title={"Visibility"} data={`${visibility / 1000} k/h`} />
                {/* <WeatherSubCard  img={<BiSun color="orange" size={30}/>} title={"Sunrise"} data={`${formatTime(sys.sunrise)}`}/>
            <WeatherSubCard  img={<BiSun color="orange" size={30}/>} title={"Sunset"} data={`${formatTime(sys.sunset)}`}/> */}
            </div >

        </>
    )
}

export default WeatherCard;
