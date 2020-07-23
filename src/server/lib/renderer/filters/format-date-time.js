module.exports = function formatDateTime(value, ...args) {
    const date = new Date(value);
    const locale = (args.length === 2) ? args[0] : undefined;
    const options = (args.length === 2) ? args[1] : args[0];
    const dateTimeFormat = new Intl.DateTimeFormat(locale, options);
    return dateTimeFormat.format(date);
}
