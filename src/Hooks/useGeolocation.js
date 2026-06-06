import { useEffect, useState } from "react";

function useGeolocation(){
    const [loading, setLoading] = useState(true);
    const [error, setError]  = useState(null);
    const [data, setData] = useState({});

    useEffect(()=>{
        function onSucces(e){
            setLoading(false);
            setLoading(null);
            setData(e.coords);
        }

        function onError(e){
            setError(e);
            setLoading(false);
        }

        navigator.geolocation.getCurrentPosition(onSucces, onError);
    }, [])

    return {loading, error, data};
}

export default useGeolocation;