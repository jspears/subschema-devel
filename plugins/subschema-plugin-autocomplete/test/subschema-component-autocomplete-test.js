import React from 'react';
import {
    byTag, byTypes, change, click, expect, into, intoWithState
} from 'subschema-test-support';
import newSubschemaContext from 'subschema-test-support/lib/newSubschemaContext';
import 'subschema-styles-bootstrap';
import autocomplete, {
    Autocomplete, AutocompleteItemTemplate, styles
} from '../src';
import { OptionsProcessor } from 'subschema-processors';
import { types as formTypes } from 'subschema-component-form';
function noop() {

}
describe('subschema-plugin-autocomplete', function () {
    this.timeout(50000);
    var options = [
        { label: 'ABC', val: 'abc' },
        { label: 'DBC', val: 'dbc' },
        { label: 'JDK', val: 'jdk' }
    ];
    it('should render options and insert value even for zero', function () {
        const { Form, loader, ValueManager } = newSubschemaContext();
        loader.addLoader(autocomplete);
        const valueManager = ValueManager();
        const root         = into(<Form schema={{
            schema: {
                auto: {
                    type   : 'Autocomplete',
                    options: [
                        { label: 'ab', val: 0 },
                        { label: 'Hello', val: 1 }
                    ]
                }
            }
        }} loader={loader} valueManager={valueManager}/>, true);
        const input        = byTag(root, 'input');
        change(input, 'A');

        const found = byTypes(root, AutocompleteItemTemplate);
        expect(found.length).to.eql(1);

        click(found[0]);

        expect(valueManager.path('auto')).to.eql(0)


    });

    it('should render an autocomplete and select suggested', function () {

        var { child, state } = intoWithState(<Autocomplete
            inputType={formTypes.Text}
            itemTemplate={AutocompleteItemTemplate}
            options={options} processor={OptionsProcessor}
            onInputChange={noop} onChange={noop} onSelect={noop}/>, {});
        expect(child,'should render autocomplete').to.exist;
        var input = byTag(child, 'input');
        expect(input,'should show input').to.exist;
        change(input, 'b');
        var suggest = byTypes(child, AutocompleteItemTemplate);
        expect(suggest.length).to.eql(2, 'should suggest two');

        change(input, 'db');
        suggest = byTypes(child, AutocompleteItemTemplate);
        click(suggest[0]);
        var input = byTag(child, 'input');
        expect(input.value).to.eql('DBC');
    });

    it('should render an autocomplete  with a value and autoSelectSingle set to true',
        function () {
            var { child, state } = intoWithState(<Autocomplete
                itemTemplate={AutocompleteItemTemplate}
                inputType={formTypes.Text}
                value="abc"
                autoSelectSingle={true}
                options={options} processor={OptionsProcessor}
                onInputChange={noop} onChange={noop} onSelect={noop}/>, {});
            expect(child,'should render autocomplete').to.exist;
            var input = byTag(child, 'input');
            expect(input, 'should show input').to.exist;
            expect(input.value).to.eql('abc');
            change(input, 'j')
            expect(input.value).to.eql('JDK');
        });
});
