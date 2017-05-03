const values = {};

export class DataType {

    constructor(ordinal, key) {
        this.ordinal = ordinal;
        this.key = key;
        values[ordinal] = this;
    }

    static create(ordinal) {
        if (values[ordinal]) {
            return values[ordinal];
        }
        return null;
    }

    static values() {
        return Object.values(values);
    }

    static valueOf(key) {
        var type = null;
        var bag = this.values().filter(e => {return e.key === key});
        if (bag.length > 0) {
            type = bag[0];
        }
        return type;
    }
}