import React from 'react';
import PropTypes from 'subschema-prop-types';
import { FREEZE_OBJ } from 'subschema-utils';


//Expose for configurability
export const settings = {
    type: 'span'
};

export function loadType(val, key, props, { loader, injector }) {

    const { type, ...rest } = typeof val === 'string' ? {
        ...settings,
        type: val
    } : val == null ? settings : { ...settings, ...val };

    if (typeof type === 'string' && type[0].toLowerCase() == type[0]) {
        return type;
    }

    const Type = loader.loadType(type);

    const injectedClazz = injector.inject(Type, null, rest);
    return injectedClazz;
}

export default {
    resolver: {
        type: function(Clazz, key, propList, OrigClazz) {

            Clazz.contextTypes.loader   = PropTypes.loader;
            Clazz.contextTypes.injector = PropTypes.injector;


            Clazz::this.property(key, loadType);
        }
    }
};
