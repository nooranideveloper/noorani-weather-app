const WeatherSubCard = ({img, title, data}) => {
  return (
    <>

        <div className="bg-blue-200 w-full flex gap-x-4 justify-start items-center text-gray-800  text-[18px] py-2 px-5 rounded-xl shadow shadow-gray-400 dark:bg-slate-700">
            <div>
                {img}
            </div>
            <div>
                <h1 className="text-gray-500 mb-1 font-semibold">{title}</h1>
                <h2 className="font-semibold dark:text-gray-200">{data}</h2>
            </div>
        </div>
      
    </>
  )
}

export default WeatherSubCard
