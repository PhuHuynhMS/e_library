function escapeRegex(ObjectData) {
    Object.keys(ObjectData).forEach((key) => {
        if (typeof ObjectData[key] != 'object') {
            if (typeof ObjectData[key] === 'number') {
                ObjectData[key] = ObjectData[key].toString();
                ObjectData[key] = ObjectData[key].replace(/[[\]{}*+\\^$|#]/g, '\\$&');
                ObjectData[key] = parseFloat(ObjectData[key]);
            } else ObjectData[key] = ObjectData[key].replace(/[[\]{}*+\\^$|#]/g, '\\$&');
        }
    });
    return ObjectData;
}

module.exports = { escapeRegex };
