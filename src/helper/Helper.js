export const toCelsius = (F) => {
    return (F-32)/1.8000
}

export const day = (n) => {
    const today = new Date()
    const next = new Date(today)
    next.setDate(next.getDate() + n)
    var days = ['Jan', 'Feb', 'Mar','Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', , 'Oct', 'Nov', 'Dec'];
    return days[next.getMonth()] + " " + next.getDate();
}