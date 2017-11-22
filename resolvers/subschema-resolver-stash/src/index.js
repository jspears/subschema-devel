import PropTypes from 'subschema-prop-types';
import { flattenFields, warning } from 'subschema-utils';

export function resolveFieldKey(key) {
    return (this.path && key != null) ? `${this.path}.${key}` : key;
}
export function extractFields(value, props) {
    if (value != null && typeof value !== 'boolean') {
        if (Array.isArray(value)) {
            return value;
        }
        return [value]
    }

    if (props.fields) {
        return props.fields.map(resolveFieldKey, props);
    }
    if (props.fieldsets) {
        return flattenFields(props).map(resolveFieldKey, props);
    }
    if (props.schema) {
        return Object.keys(props.schema).map(resolveFieldKey, props);
    }
    if (props.path) {
        return [resolveFieldKey.call(props, value) || props.path];
    }
}
function stash$resolver(value, key, props, { valueManager }) {
    const fields = extractFields(value, props);
    warning(fields, 'could not find any fields to stash for "%s" "%s"', key,
        value);

    const returnStash = () => {
        return this._stashId =
            valueManager.stash(props.path || this, fields);
    };

    returnStash();

    return returnStash;
};


export default {
    resolver: {
        stash: function(Clazz, key) {
            Clazz.contextTypes.valueManager = PropTypes.valueManager;


            Clazz::this.property(key, stash$resolver);
        }
    }
};
