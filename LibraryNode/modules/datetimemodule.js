exports.getDate = function () {
    let date = new Date();

    return date;
};

exports.getUtcDate = function () {
    let date = new Date();
    let utcDate = date.getUTCDate();

    return utcDate;
}
