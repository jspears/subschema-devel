import React, { PureComponent } from 'react';
import PropTypes from 'subschema-prop-types';

export class Text extends PureComponent {

    static defaultProps = {
        type : 'text',
        value: ''
    };

    static propTypes = {
        onKeyDown  : PropTypes.event,
        className  : PropTypes.typeClass,
        placeholder: PropTypes.string,
        dataType   : PropTypes.string,
        fieldAttrs : PropTypes.fieldAttrs
    };

    static injectedProps = {
        value: "."
    };


    render() {
        const { dataType, fieldAttrs, ...props } = this.props;
        return <input type={dataType} {...fieldAttrs} {...props}/>
    }
}

export default ({
    type: {
        Text
    }
})
