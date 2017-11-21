import React from "react";
import { expect } from 'chai';
import samples from "subschema-test-samples";
import { cleanUp, into } from "subschema-test-support";
import { newSubschemaContext, ValueManager } from "subschema";
import { findDOMNode, unmountComponentAtNode } from 'react-dom';
import { setupFunc } from '../support';

describe('subschema-support/samples', function () {
    this.timeout(5000);


    Object.keys(samples).forEach(function (key) {
        const sample = samples[key];
        let form;
        describe(key, function () {
            afterEach(cleanUp);

            it(`render sample ${key} with data`, function () {
                const Subschema        = newSubschemaContext();
                const { Form }         = Subschema;
                Subschema.valueManager = ValueManager(sample.data);
                const context          = setupFunc(sample, Subschema);

                form = into(<Form {...context}/>, true);
                expect(form, `form should exist for ${key}`).to.exist;
            });

            it(`render sample ${key} without data`, function () {
                const Subschema = newSubschemaContext();
                const { Form }  = Subschema;
                const context   = setupFunc(sample, Subschema);
                form            = into(<Form {...context}/>, true);
                expect(form, `form should exist for ${key}`).to.exist;
            });

            it(`render sample ${key} with data and errors`, function () {
                const Subschema = newSubschemaContext();
                const { Form }  = Subschema;
                const context   = setupFunc(sample, Subschema);
                const form      = into(<Form {...context}/>, true);
                expect(form, `form should exist for ${key}`).to.exist;
            });
        });
    });
});
