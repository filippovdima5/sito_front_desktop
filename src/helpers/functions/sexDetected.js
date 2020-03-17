export function sexDetected(sex_id) {
    switch (sex_id) {
        case 1: return 'men';
        case 2: return 'women';
        default: return ''
    }
}