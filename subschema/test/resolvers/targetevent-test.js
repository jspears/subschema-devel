import { expect } from 'chai';
import React, { Component } from 'react';
import PropTypes from 'subschema-prop-types';
import ValueManager from 'subschema-valuemanager';
import {newSubschemaContext} from 'subschema';
import { byComponent, change, intoWithContext } from 'subschema-test-support';

describe('subschema/targetEvent', function () {
    this.timeout(10000);
    let injector;
    beforeEach(() => {
        injector = newSubschemaContext().injector;
    });
    const propTypes = {
        onChange: PropTypes.targetEvent,
        value   : PropTypes.value,
        dataType: PropTypes.dataType,
        path    : PropTypes.path
    };

    const defaultProps = {
        value   : '.',
        dataType: 'text'
    };

    class TargetTest extends Component {

        render() {
            const { path, ...props } = this.props;
            return <input {...props}/>
        }
    }

    class Target2Test extends Component {
        static defaultProps = {
            onChange() {

            }
        };
        static propTypes    = {
            onChange: PropTypes.targetEvent
        };

        render() {
            const { path, ...props } = this.props;
            return <input {...props}/>
        }
    }


    it('should follow change lifecyle', function () {
        const Injected     = injector.inject(TargetTest, propTypes,
            defaultProps);
        const valueManager = ValueManager({ 'other': 'stuff', more: 'd' });
        const inst         = intoWithContext(<Injected path="hello"/>, {
            valueManager
        }, true);

        const et = inst.find(TargetTest);
        expect(et.prop('type')).to.eql('text');
        change(et, 'world');
        expect(valueManager.path('hello')).to.eql('world');
    });
    it('should allow for default functions to be ignored', function () {

        const Injected     = injector.inject(Target2Test, propTypes);
        const valueManager = ValueManager({ 'other': 'stuff', more: 'd' });
        const inst         = intoWithContext(<Injected path="hello"/>, {
            valueManager

        }, true);

        const et = byComponent(inst, Target2Test);
        expect(et.prop('onChange')).to.not
                                   .eql(Target2Test.defaultProps.onChange);

    });
    it('should allow for default functions not to be ignored',
        function () {

            const Injected     = injector.inject(Target2Test, propTypes);
            const valueManager = ValueManager({ 'other': 'stuff', more: 'd' });
            const f            = () => {
            };
            const inst         = intoWithContext(<Injected path="hello"
                                                           onChange={f}/>, {
                valueManager

            }, true);

            const et = byComponent(inst, Target2Test);
            expect(et.prop('onChange')).to.eql(f);

        });
});
