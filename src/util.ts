export function getRandomNumberToNearestFifty() {
    let number = Math.floor(Math.random() * (2000 - 100) + 100);
    return Math.round(number / 50) * 50;
}
