export const getMonthName = (monthNumber, diff = 0) => {
    parseInt(monthNumber);
    monthNumber = monthNumber - diff;
    let months = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
    return months[monthNumber];
}
export const getFullMonthName = (monthNumber, diff = 0) => {
    parseInt(monthNumber);
    monthNumber = monthNumber - diff;
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

export const handleFormatText = (text) => {
    if (!text) return false;
    return text.length <= 20 ? text : text.substr(0, 20) + "..."
}

export const getDateDay = (date, separator) => {
    return (date.split(separator))[0];
}

export const getCardFlag = (cardnumber) => {
    var card_number = cardnumber.replace(/[^0-9]+/g, '');

    var cards = {
        visa: /^4[0-9]{12}(?:[0-9]{3})/,
        mastercard: /^5[1-5][0-9]{14}/,
        diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}/,
        amex: /^3[47][0-9]{13}/,
        discover: /^6(?:011|5[0-9]{2})[0-9]{12}/,
        hipercard: /^(606282\d{10}(\d{3})?)|(3841\d{15})/,
        elo: /^((((636368)|(438935)|(504175)|(451416)|(636297))\d{0,10})|((5067)|(4576)|(4011))\d{0,12})/,
        jcb: /^(?:2131|1800|35\d{3})\d{11}/,
        aura: /^(5078\d{2})(\d{2})(\d{11})$/
    };

    for (var flag in cards) {
        if (cards[flag].test(card_number)) {
            return flag;
        }
    }

    return false;
}