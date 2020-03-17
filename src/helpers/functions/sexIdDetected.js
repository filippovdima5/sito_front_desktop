export const sexIdDetected = (sex) => {
    switch (sex) {
        case 'men': return {sex_id: 1};
        case 'women': return {sex_id: 2};
        default: return {sex_id: 0};
    }
};