import {expect} from 'chai';
import React, {Component} from 'react';
import {intoWithContext, byComponent,findNode, change} from 'subschema-test-support';
import injector from 'subschema-injection';
import PropTypes from 'subschema-prop-types';
import {dataType} from 'subschema-resolver-datatype';
describe('resolvers/dataType', function () {
    this.timeout(50000);
    const propTypes = {
        dataType: PropTypes.dataType
    };
    const defaultProps = {
        dataType: 'text'
    };


    injector.resolver(PropTypes.dataType, dataType);

    it('should set type and not have dataType', function () {
        class TargetTest extends Component {
            render() {
                return <span>{this.props.type}</span>
            }
        }
        const Injected = injector.inject(TargetTest, {
            someType: PropTypes.dataType
        }, defaultProps);
        const inst = intoWithContext(<Injected someType="text"/>, {}, true);

        const et = byComponent(inst, TargetTest);
        expect(et.prop('type')).to.eql('text');
     //   expect(et.props.someType).toNotExist('dataType should not be passed');

    });
    it('should set dataType', function () {
        class TargetTest extends Component {
            render() {
                return <span>{this.props.type}</span>
            }
        }
        const Injected = injector.inject(TargetTest, propTypes, defaultProps);
        const inst = intoWithContext(<Injected />, {}, true);

        const et = byComponent(inst, TargetTest);
        expect(et.prop('type')).to.eql('text');

    });
    it('should set dataType by defaultProps', function () {
        class TargetTest extends Component {
            static propTypes = propTypes;
            static defaultProps = defaultProps;

            render() {
                return <span>{this.props.type}</span>
            }
        }
        const Injected = injector.inject(TargetTest);
        const inst = intoWithContext(<Injected />, {}, true);

        const et = byComponent(inst, TargetTest);
        expect(et.prop('type')).to.eql('text');

    });

    it('should set dataType by defaultProps overrider by component', function () {
        class TargetTest extends Component {
            static propTypes = propTypes;
            static defaultProps = defaultProps;

            render() {
                return <span>{this.props.type}</span>
            }
        }
        const Injected = injector.inject(TargetTest);
        const inst = intoWithContext(<Injected dataType="stuff"/>, {}, true);

        const et = byComponent(inst, TargetTest);
        expect(et.prop('type')).to.eql('stuff');

    });

    it('should set dataType by defaultProps overrider by component with overrides', function () {
        class TargetTest extends Component {
            static propTypes = propTypes;
            static defaultProps = defaultProps;

            render() {
                return <span>{this.props.type}</span>
            }
        }
        const Injected = injector.inject(TargetTest, propTypes, {dataType: 'other'});
        const inst = intoWithContext(<Injected dataType="stuff"/>, {}, true);

        const et = byComponent(inst, TargetTest);
        expect(et.prop('type')).to.eql('stuff');

    });
    it('should set dataType by defaultProps overrider by component with overrides with defaults and configs', function () {
        class TargetTest extends Component {
            static propTypes = propTypes;

            render() {
                return <span>{this.props.type}</span>
            }
        }
        const Injected = injector.inject(TargetTest, propTypes, {dataType: 'other'});
        const inst = intoWithContext(<Injected/>, {}, true);

        const et = byComponent(inst, TargetTest);
        expect(et.prop('type')).to.eql('other');

    });
});
