//Custom error types
class InvalidDateFormatError extends RangeError {}
class DateIsInTheFutureError extends RangeError {}

function ask() {
    return prompt('When is your birthday?')
}

function parse(birthday: string): Date | InvalidDateFormatError | DateIsInTheFutureError {
    let date = new Date(birthday)
    if (!isValid(date)) {
        throw new InvalidDateFormatError('Enter a date in the form YYYY/MM/DD')
    }
    if (date.getTime() > Date.now()) {
        throw new DateIsInTheFutureError('Are you a timelord?')
    }
    return date
}

try {
    let result = parse(ask())
    if (result instanceof InvalidDateFormatError) {
        console.error(result.message)
    } else if (result instanceof DateIsInTheFutureError) {
        console.info(result.message)
    } else {
        console.info('Date is', result.toISOString())
    }
}



/*
try {
    let result = parse(ask())
    console.info('Date is', result.toISOString())
} catch (e) {
    if (e instanceof InvalidDateFormatError) {
        console.error(e.message)
    } else if (e instanceof DateIsInTheFutureError) {
        console.info(e.message)
    } else {
        throw e
    }
}
*/
