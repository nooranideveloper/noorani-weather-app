import { useQuery } from "@tanstack/react-query";
import { fetchWeatherByCity, fetchWeatherByCoord } from "../Services/api";

export function useFetchWeather(geoData, searchQuery) {
    const { data, error, isLoading } = useQuery({
        queryKey: ['weather', searchQuery || geoData],
        queryFn: () => searchQuery ? fetchWeatherByCity(searchQuery) : fetchWeatherByCoord(geoData),
        enabled: (!!geoData?.latitude || !!geoData?.longitude) || !!searchQuery,
        staleTime: 60 * 60 * 1000,
        gcTime: 60 * 60 * 1000,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false
    });

    return { data, error, isLoading };
}