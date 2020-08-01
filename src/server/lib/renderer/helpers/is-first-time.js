module.exports = function(state) {
    state.firstTimers = [];
    return (key) => {
        if (state.firstTimers.includes(key)) return false;
        state.firstTimers.push(key);
        return true;
    }
}