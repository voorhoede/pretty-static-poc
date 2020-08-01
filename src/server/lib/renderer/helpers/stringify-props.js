// @todo replace by https://github.com/JedWatson/classnames ?

const isObject = obj => typeof obj === 'object';

const stringifyPropsArray = arr => arr
    .map(item => isObject(item) ? stringifyObject(item) : item)
    .join(' ');

const stringifyObject = obj => Object.entries(obj)
    .filter(([key, value]) => value)
    .map(([key]) => key)
    .join(' ');

const stringifyProps = (props) => {
    if (Array.isArray(props)) {
        return stringifyPropsArray(props);
    }
    if (isObject(props)) {
        return stringifyObject(props);
    }
    return props;
};

module.exports = stringifyProps;
