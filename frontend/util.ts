export function formatNumber(number: number) {
    if (number < 1000) {
        return `${number.toFixed(2)} milliseconds`;
    } else {
        return `${(number / 1000).toFixed(2)} seconds`;
    }
}