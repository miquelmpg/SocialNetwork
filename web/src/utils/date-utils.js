export function dateToString(dateInput) {
    const isoDate = dateInput;
    const date = new Date(isoDate);
    return [date.toLocaleDateString(), date.toLocaleTimeString()];
}