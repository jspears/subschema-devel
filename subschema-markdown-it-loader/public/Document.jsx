import React, { PureComponent } from 'react';
import PropTypes from 'subschema-prop-types';

export default class Document extends PureComponent {

    static propTypes = {
        types: PropTypes.array
    }

    render() {
        return <code><pre>{JSON.stringify(this.props.types, null, 2)}</pre></code>
    }
}
