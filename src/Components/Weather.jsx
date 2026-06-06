import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useFetchWeather } from '../Hooks/useFetchWeather';
import useGeolocation from '../Hooks/useGeolocation'
import WeatherCard from './WeatherCard';
import HourlyForecast from './HourlyForecast';
import DailyForecast from './DailyForecast';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { BiLocationPlus, BiSearch } from 'react-icons/bi';

const Weather = () => {

    //Dark mode
    const [darkMode, setDarkMode] = useState(false);
    useEffect(() => {
        const saveTheme = localStorage.getItem("theme");
        if (saveTheme === "dark") {
            document.documentElement.classList.add("dark");
            setDarkMode(true);
        }
        if (window.matchMedia("prefers-color-scheme: dark").matches) {
            document.documentElement.classList.add("dark");
            setDarkMode(true);
        }
    }, [])

    //GeoLoaction
    const { loading, error, data: geoData } = useGeolocation();
    //searching
    const [city, setCity] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    //api
    const { data, error: apiError, isLoading: apiLoading } = useFetchWeather(geoData, searchQuery);

    const { currentWeather, foracastData } = data || {};

    //search function
    function handleSearch(e) {
        e.preventDefault();
        if (city.trim()) {
            console.log("City: ", city)
            setSearchQuery(city.trim())
        }
        if (city === '') {
            setSearchQuery(geoData)
        }
    }

    //live location
    const liveLoaction = (e) => {
        e.target.addEventListener("click", () => {
            setSearchQuery(geoData)
        });
    }

    //theme toggle function
    const toggleTheme = () => {
        if (darkMode) {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
            setDarkMode(false);
        } else {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
            setDarkMode(true);
        }
    }



    return (
        <div className='min-h-screen bg-linear-to-b from-blue-700 to-blue-200 py-4 px-7 mx-auto flex flex-col items-center gap-4 dark:bg-linear-to-b dark:from-slate-900 dark:to-blue-950'>

            <div className='h-16 px-8 flex justify-between items-center fixed top-0 left-0 w-full mx-auto bg-background/50 backdrop-blur-2xl border-b z-50 md:w-auto md:rounded-2xl md:mx-auto md:top-4 md:left-4 md:right-4'>
                <motion.h1
                    animate={{
                        opacity: [1, 0.6, 1],
                        scale: [1, 0.99, 1],
                        x: 0,
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse",
                        repeatDuration: 3
                    }}
                    className='mb-3 text-xl md:text-2xl font-bold tracking-wide text-orange-400 text-shadow-xs dark:text-gray-300'>
                    <span className='text-blue-950 mr-1.5 dark:text-orange-700'>Noorani</span>
                    Weather App
                </motion.h1>

                <button onClick={(e) => liveLoaction(e)} className='cursor-pointer'>
                    {darkMode ? <BiLocationPlus size={24} className='text-yellow-600' /> :
                        <BiLocationPlus size={24} className='text-slate-700' />}
                </button>

                <button className='text-2xl cursor-pointer' onClick={toggleTheme}>
                    {darkMode ? (
                        <MdLightMode size={30} className='text-yellow-400' />
                    ) : (
                        <MdDarkMode size={30} className='text-slate-700' />
                    )
                    }
                </button>
            </div>

            <form onSubmit={handleSearch} className='w-full flex justify-center relative mt-14 md:mt-18'>
                <input type="text" placeholder='Search City Name' className='bg-gray-300 text-gray-700 text-[15px] md:text-xl w-full h-9 rounded-full py-1.5 px-3 outline-none md:h-12 dark:bg-gray-600 dark:text-gray-100'
                    focus
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button className='absolute right-3 top-2 md:top-2.5'><BiSearch size={24} /></button>
            </form>


            {apiLoading ? (
                <div className='h-[60vh] flex justify-center items-center'>
                    <div className='w-15 h-15 border-t-4 border-r-4 border-gray-200 rounded-ss-full rounded-r-full animate-spin'>

                    </div>
                </div>
            ) :
                (
                    currentWeather && <WeatherCard data={currentWeather} />

                )

            }
            {apiError ? (
                <div className='h-[60vh] flex justify-center items-center'>
                    <div className=''>
                        <p className='text-red-900 md:text-2xl font-bold dark:text-slate-200'>City not Founded Or Internet problem</p>
                    </div>
                </div>
            ) :
                ""
            }
            {/* {currentWeather && <WeatherCard data={currentWeather}/>} */}
            {foracastData && <HourlyForecast foracastData={foracastData} />}
            {foracastData && <DailyForecast foracastData={foracastData} />}


        </div>
    )
}

export default Weather
