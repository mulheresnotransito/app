export const getMonthName = (monthNumber) => {
    let months = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
    return months[monthNumber];
}
export const getFullMonthName = (monthNumber) => {
    let months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
    return months[monthNumber];
}
export const getFullDayName = (dayNumber) => {
    let days = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
    return days[dayNumber];
}

export const getFormattedDate = (date, separator) => {
    let d = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
    let m = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1)); //adicionar + 1 por conta do formato de Date
    let y = date.getFullYear();
    return y + separator + m + separator + d;
}

export const getFormattedDateBR = (date, separator) => {
    let d = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
    let m = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1)); //adicionar + 1 por conta do formato de Date
    let y = date.getFullYear();
    return d + separator + m + separator + y;
}