import React from 'react';
import {findNode, into, expect, byComponents, byComponent}  from 'subschema-test-support';
import {types, templates} from 'subschema-component-form';
import newSubschemaContext from 'subschema-test-support/lib/newSubschemaContext';
const {ButtonTemplate, ButtonsTemplate} = templates;

describe('templates/ButtonsTemplate', function () {
    it('should render buttons', function () {
        const {Form, context, ...rest} = newSubschemaContext();
        const form = into(<Form {...rest} schema={
            {
                schema: {},
                fieldsets: [{
                    buttons: ['one', 'two', 'three']
                }]
            }
        }/>, true);
        const btns = byComponents(byComponent(form, ButtonsTemplate), ButtonTemplate, 3);
        for (let btn of btns) {
            const btnN = findNode(btn);
            expect(btnN.classList.contains('btn')).to.eql(true);
        }
    });
    it('should render buttons with actions', function () {
        const {Form, context, ...rest} = newSubschemaContext();

        const form = into(<Form {...rest} schema={
            {
                schema: {},
                fieldsets: [{
                    buttons: [{label: 'one', primary: true}, 'two', 'three']
                }]
            }
        }/>, true);
        const btns = byComponents(byComponent(form, ButtonsTemplate), ButtonTemplate, 3);
        for (let btn of btns) {
            const btnN = findNode(btn);
            expect(btnN.classList.contains('btn')).to.eql(true, 'should have btn');
        }
        expect(findNode(btns[0]).classList.contains('btn-primary')).to.eql(true, 'should have primary');
    })
});
