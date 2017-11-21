import {
    byComponent, byComponents, byTag, byTags, byType, change, check, click,
    expect, findNode, Form, into, intoWithState, React, Simulate, TestUtils,
    ValueManager
} from 'subschema-test-support';
import { types } from 'subschema-component-form';
import newSubschemaContext from 'subschema-test-support/lib/newSubschemaContext';

const { Checkboxes, Checkbox } = types;

describe('types/Checkboxes', function () {
    this.timeout(50000);
    it('should create checkboxes', function () {
        const {
                  Form,
                  context,
                  valueManager
              } = newSubschemaContext();

        var root         = into(<Form valueManager={valueManager} schema={{
            schema: {
                group1: {
                    options: ['one', 'two', 'three'],
                    type   : 'Checkboxes'
                }

            }
        }}/>, true);
        const checkboxes = byTags(root, 'input');

        expect(checkboxes.length).to.eql(3);
        const cb0 = checkboxes[0];
        Simulate.change(cb0, {
            target: {
                checked: true,
                value  : 'one'
            }
        });
        expect(valueManager.path('group1.0')).to.eql('one');

    });

    it('should create checkboxes in groups', function () {
        const {
                  valueManager,
                  context,
                  Form
              } = newSubschemaContext();

        var root         = into(<Form valueManager={valueManager} schema={{
            schema: {
                groupsOfGroups: {
                    title  : 'Group of Groups',
                    options: [
                        {
                            group: 'North America', options: [
                            { val: 'ca', label: 'Canada' },
                            { val: 'us', label: 'United States' }
                        ]
                        },
                        {
                            group: 'Europe', options: [
                            { val: 'es', label: 'Spain' },
                            { val: 'fr', label: 'France' },
                            { val: 'uk', label: 'United Kingdom' }
                        ]
                        }
                    ],
                    type   : 'Checkboxes'
                }


            }
        }}/>, true);
        const checkboxes = byTags(root, 'input');
        expect(checkboxes.length).to.eql(5);
        expect(byTags(root, 'legend').length).to.eql(2);
    });


});
