const values = {};

export class DataType {

    constructor(ordinal, type) {
        this.ordinal = ordinal;
        this.type = type;
        values[ordinal] = this;
    }

    static create(ordinal) {
        if (values[ordinal]) {
            return values[ordinal];
        }
        return null;
    }

    static toString() {
        return this.type;
    }

    static values() {
        return Object.values(values);
    }

    static valueOf(typekey) {
        var type = null;
        var bag = this.values().filter(e => {return e.type === type});
        if (bag.length > 0) {
            type = bag[0];
        }
        return type;
    }
}