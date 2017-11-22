import {titlelize } from 'subschema-utils';

function resolve(value, key, props) {
    if (value === false) {
        return '';
    }
    if (value) {
        return value;
    }
    const val = props.name || props.id || props.path || '';

    return titlelize(val.split(/\./).pop());
}

export default {
    resolver: {
        valueEvent: function(Clazz, key) {

            Clazz::this.property(key, resolve);

        }
    }
};
