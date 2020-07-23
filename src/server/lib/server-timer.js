module.exports = function serverTimer(keyAll) {
    const timings = {};
    const start = key => {
        timings[key] = { start: process.hrtime() }
    }
    const end = key => {
        const timing = timings[key];
        const end = process.hrtime(timing.start);
        const delta =(end[1]/1000000).toFixed(2);
        timings[key] = { ...timing, delta, end };
    }
    const withTiming = async (key, fn) => {
        start(key);
        const output = await fn;
        end(key);
        return output;
    }
    const timingsToString = () => {
        if(keyAll) {
            end(keyAll);
        }
        return Object.entries(timings)
            .map(([key, { delta }], index) => `${index}; dur=${delta}; desc="${key}"`)
            .join(', ');
    }

    if(keyAll) {
        start(keyAll);
    }

    return {
        withTiming,
        timingsToString,
    }
}
