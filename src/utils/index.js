export const getFormatDate = () => {
    const currentDate = new Date();

    const option = {
        weekday: "long",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }

    return currentDate.toLocaleString('en-US', option);
}

export const getHourlyForecatDate = (timestamp, timezone) => {
    const currentDate = new Date((timestamp + timezone) * 1000);

    const option = {
        hour: "2-digit"
    }
    

    return currentDate.toLocaleString('en', option);
}

export const getDailyForecatDate = (timestamp, timezone, todayComponent) => {
    const date = new Date((timestamp + timezone) * 1000);

    const today = new Date();

    if (date.getDate() === today.getDate() && date.getMonth() === today.getMonth()) {
        return (todayComponent);
    }

    return date.toLocaleDateString('en', {
        weekday: "long"
    });
}

export const formatTime = (timestamp) => {

    const option = {
        hour: "2-digit",
        minute: "2-digit",
    }

    return new Date((timestamp) * 1000)
        .toLocaleTimeString("en", option)
}

export function twilveFormat(hour) {
    if (hour >= 13) {
        return hour % 12;
    } else {
        return hour;
    }
}

export const isNow = (dt) => {
    return new Date(dt * 1000).getHours() === new Date().getHours();
}

// Change Mode dark light
// export function changeMode(){
//     alert(23);
// }