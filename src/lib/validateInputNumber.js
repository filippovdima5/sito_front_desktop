export function validateInputNumber(value) {
    return isNaN(value) ? '' : value.toString()
}