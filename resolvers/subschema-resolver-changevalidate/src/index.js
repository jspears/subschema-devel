import PropTypes from "subschema-prop-types";
import {noop, resolveKey} from "subschema-utils";

/**
 * Validates on change, used in checkbox.  As it needs validation without blur.  In cases like text,
 * the behaviour is different.  This can also be used for any component that needs to be validated
 * after any value change.
 *
 * @param Clazz
 * @param key
 */
export default {
    resolver: {
        changeValidate: function(Clazz, key) {

            Clazz.contextTypes.valueManager = PropTypes.valueManager;
            Clazz.contextTypes.loader = PropTypes.loader;
            Clazz.contextTypes.noValidate = PropTypes.bool;

            Clazz::this.property(key, function blurValidate$prop(value, key, props, {valueManager, noValidate}) {
                const validate = typeof value === 'function' ? value : props.validators;
                if (validate == null) return noop;

                const path = resolveKey(props.path, value);

                this._validateListener = valueManager.addValidateListener(path, () => {
                        return valueManager.updateErrors(path, validate());
                    }
                ).remove;

                this._validateChangeListeners = valueManager.addListener(path, (val)=> {
                    if (noValidate) {
                        return;
                    }
                    
                    valueManager.updateErrors(path, validate(val, valueManager));
                }, this, false).remove;

                //blur event if its changed we will validate.
                return validate;
            });

            Clazz::this.unmount(function () {
                this._validateChangeListeners && this._validateChangeListeners();
                this._validateListener && this._validateListener();
            });
        }
    }
};
