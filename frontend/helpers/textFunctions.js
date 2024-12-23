export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export const capitalizeFirstLetters = (string) => {
    return string.split(" ").map(capitalizeFirstLetter).join(" ");
};

export const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

