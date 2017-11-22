import React, { Component } from 'react';
import PropTypes from 'subschema-prop-types';
import ObjectType from 'subschema-plugin-object';

export default class Form extends Component {
    static displayName       = "Form";
    static defaultValueManager;
    static childContextTypes = {
        validate  : PropTypes.bool,
        noValidate: PropTypes.bool, ...PropTypes.contextTypes
    };

    static propTypes = {
        schema      : PropTypes.schema.isRequired,
        loader      : PropTypes.loader,
        injector    : PropTypes.injectorFactory,
        valueManager: PropTypes.valueManager,
        template    : PropTypes.string,
        method      : PropTypes.string,
        action      : PropTypes.string,
        enctype     : PropTypes.string,
        //handy submit handler.
        onSubmit    : PropTypes.event,
        //Set this to true if you don't want validation to run on submit.
        noValidate  : PropTypes.bool,
        //Set this to true, if you want validators to be called against the
        // current schema.  I.E. after a POST.
        validate    : PropTypes.bool,
        ObjectType  : PropTypes.any
    };

    static defaultProps = {
        fallbackTemplate: 'FormTemplate',
        noValidate      : false,
        validate        : false,
        ObjectType
    };

    constructor(props, context, ...rest) {
        super(props, context, ...rest);
        this.loader   = props.loader;
        this.injector =
            typeof props.injector === 'function' ? props.injector(this.loader)
                : props.injector;
        if (!props.valueManager) {
            this.valueManager =
                this.constructor.defaultValueManager(props.value, props.errors);
        } else {
            this.valueManager = props.valueManager;
            if (props.value) {
                this.valueManager.setValue(props.value);
            }
            if (props.errors) {
                this.valueManager.setErrors(props.errors);
            }
        }
        this.ObjectWrapper = this.injector.inject(this.props.ObjectType);
        if (props.onSubmit) {
            this._submitListener = this.valueManager.addSubmitListener(null,
                props.onSubmit).remove;
        }
    }

    getChildContext() {
        return {
            valueManager: this.valueManager,
            loader      : this.loader,
            injector    : this.injector,
            validate    : this.props.validate,
            noValidate  : this.props.noValidate
        };
    }

    componentWillReceiveProps(newProps) {

        if (newProps.loader !== this.props.loader) {
            this.loader = newProps.loader;
        }
        if (newProps.valueManager !== this.props.valueManager) {
            if (this._submitListener) {
                this._submitListener();
            }
            this.valueManager = newProps.valueManager;
            this.forceUpdate();
        }

        if (this.props.value !== newProps.value) {
            this.valueManager.setValue(newProps.value);
        }
        if (this.props.errors !== newProps.errors) {
            this.valueManager.setErrors(newProps.errors);
        }
        if (this.props.injector !== newProps.injector || this.props.loader
                                                         !== newProps.loader) {
            if (typeof newProps.injector === 'function') {
                this.injector = newProps.injector(newProps.loader);
            } else {
                this.injector = newProps.injector;
            }
            this.ObjectWrapper = this.injector.inject(this.props.ObjectType);
        }

        if (newProps.onSubmit) {
            if (this._submitListener) {
                this._submitListener();
            }
            this._submitListener = this.valueManager.addSubmitListener(null,
                newProps.onSubmit).remove;
        }
    }

    componentWillUnmount() {
        this._submitListener && this._submitListener();
    }

    getValue() {
        return this.valueManager.getValue();
    }

    setErrors = (errors) => {
        this.valueManager.setErrors(errors);
    };


    render() {

        const {
                  valueManager, injector, loader, validate,
                  template, onSubmit, ...props
              }             = this.props;
        const ObjectWrapper = this.ObjectWrapper;
        return <ObjectWrapper {...props} objectTemplate={template}/>
    }

}
