import React, {Component} from "react";
import {expect, byTag, into} from "subschema-test-support";
import {types, templates} from 'subschema-component-form';
import newSubschemaContext from 'subschema-test-support/lib/newSubschemaContext';

//TODO - Figure these out.
describe("resolvers/fieldAttrs", function () {
    it('should insert fieldAttrs', function () {
        const {Form, valueManager, loader} = newSubschemaContext();
        const schema = {
            test: {
                "type": "Text",
                "fieldAttrs": {
                    "data-stuff": 1,
                    "aria-required": true
                }
            }
        };
        const form = into(<Form schema={{
            schema
        }} valueManager={valueManager} loader={loader}/>);
        const input = byTag(form, 'input');
        expect(input.dataset.stuff).to.eql('1');
        expect(input.attributes['aria-required'].value).to.eql('true');
    });
});
