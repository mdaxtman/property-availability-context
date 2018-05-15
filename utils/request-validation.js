function isDateRangeValid(range) {
    if (!range) {
        return true;
    }

    if (Array.isArray(range)) {
        const from = Date.parse(range[0]);
        const to = Date.parse(range[1]);

        if (from && to && from <= to) {
            return true;
        }
    }

    return false;
}

module.exports = {
    isDateRangeValid
};
