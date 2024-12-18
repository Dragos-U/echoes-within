export function formatDate(dateString) {
    const date = new Date(dateString);
    const dayNumber = date.getDay();
    const dayName = date.toLocaleDateString('en-US', {
        weekday: 'short'
    })
    const monthNumber = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${dayName}, ${dayNumber}.${monthNumber}.${year}`
}