import React, { Component, PureComponent } from 'react';
import PropTypes from 'subschema-prop-types';
import ReactPropTypes from 'prop-types';
/**
 * This is a test class test it!
 */
export default class Test extends PureComponent {

    static propTypes    = {
        /**
         * A number
         */
        num     : PropTypes.number,
        /**
         * A number with default value
         */
        numDef  : PropTypes.number,
        /**
         * A template
         */
        template: PropTypes.template,

        /**
         * A react custom
         */
        what: ReactPropTypes.shape(
            { name: PropTypes.name, age: ReactPropTypes.number })
    };
    static defaultProps = {
        numDef: 2
    };

    //Handle a click
    handleClick = (e)=>{

    };
    //render Stuff
    renderStuff(){

    }

    render() {
        return <span>Hello from here {this.props.name || 'nonname'}</span>
    }
}

export class Other extends Component {
    static propTypes = {
        whatever: PropTypes.string
    };

    render() {
        return <span>Other Stuff {`${JSON.stringify(this.props)}`}</span>
    }
}
