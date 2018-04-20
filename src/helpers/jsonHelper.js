export function getObjectNewState(name, value, currentState) {
    const newState = createInstance(currentState);
    setData(name, value, newState);
    return newState;
}

export function createInstance(currentState) {
    return Object.assign({}, currentState);
}

export var clearAllPropertiesObject = (objToClear) => {
    Object.keys(objToClear).forEach((param) => {
        if (objToClear[param] != null) {
            if (Array.isArray(objToClear[param])) {
                objToClear[param] = [];
            } else if ((objToClear[param]).toString() === "[object Object]") {
                clearAllPropertiesObject(objToClear[param]);
            } else {
                if (Number.isInteger(objToClear[param])) {
                    objToClear[param] = null;
                } else if (typeof objToClear[param] === 'boolean') {
                    objToClear[param] = false;
                } else if (typeof objToClear[param] === Date) {
                    objToClear[param] = new Date();
                } else {
                    objToClear[param] = '';
                }
            }
        }

    })
    return objToClear;
}

function setData(key, val, obj) {

    let checkArray = key.split('_');
    let pos = 0;

    if(checkArray.length > 1) {
        pos = checkArray[1];
    }

    key = checkArray[0];

    let keys = key.split(/\./);
    let last = keys.pop();

    keys.forEach(function (key) {
        if (typeof obj[key] === "undefined") {
            obj[key] = {};
        } else if (Array.isArray(obj[key])) {
            let i = obj[key][pos];
            i[last] = val;
            return
        } else {
            obj = obj[key];
        } 
       
    });

    obj[last] = val;
}

