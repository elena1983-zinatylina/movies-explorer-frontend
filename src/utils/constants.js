export const MOVIE_HOUR_IN_MINUTES = 60;

export const DISPLAY_SETTINGS = {
    default: {
        start: 16,
        load: 4
    },
    pad: {
        start: 8,
        load: 2
    },
    mobile: {
        start: 5,
        load: 1
    }
}

export const convertDuration = (number) => {
    const minutes = number % 60;
    const hours = (number - minutes) / 60;
    if (hours === 0) {
       return `${minutes}м`;
    } else if (minutes === 0) {
       return `${hours}ч`;
    } else {
       return `${hours}ч ${minutes}м`;
    }
 };
 
export const SHORT_MOVIE_DURATION = 40;
