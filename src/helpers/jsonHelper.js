export function getObjectNewState(name, value, currentState) {
    const newState = createInstance(currentState);
    setData(name, value, newState);
    return newState;
}

export function createInstance(currentState) {
  return Object.assign({}, currentState);
}


function setData(key, val, obj) {

    let keys = key.split(/\./);
    let last = keys.pop();

    keys.forEach(function (key) {
        if (typeof obj[key] === "undefined")
            obj[key] = {};
        obj = obj[key];
    });

    obj[last] = val;
}

