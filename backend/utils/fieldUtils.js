// Helper to filter object fields based on allowed keys
const filterFields = (data, allowedFields) => {
    return Object.keys(data)
        .filter((key) => allowedFields.includes(key))
        .reduce((acc, key) => {
            acc[key] = data[key];
            return acc;
        }, {});
};

module.exports = {filterFields} ;
