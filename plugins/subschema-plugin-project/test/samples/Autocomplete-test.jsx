import React from 'react';

import {
    byComponent, byComponents, byId, byTag, byTypes, change, click, expect,
    into,
} from 'subschema-test-support';
import { setupFunc } from '../support';
import { newSubschemaContext } from 'subschema';
import Autocomplete from 'subschema-example-autocomplete';

describe('subschema-project/samples/Autocomplete', function () {
    this.timeout(50000);
    it('should not be selectable', function () {

        const Subschema                = newSubschemaContext();
        const { Form, loader }         = Subschema;
        const AutocompleteItemTemplate = loader.loadTemplate(
            'AutocompleteItemTemplate');
        const AutocompleteType         = loader.loadType('Autocomplete');
        const context                  = setupFunc(Autocomplete, Subschema);

        const form = into(<Form {...context}/>, true);

        const simple = byTypes(form, AutocompleteType, 2).at(0);
        const input  = byTag(simple, 'input');
        change(input, 'aaa');

        form.update();
        const suggestions = byComponents(form, AutocompleteItemTemplate, 4);

        click(suggestions.at(2));
        form.update();
        const s2 = form.find('#simple input');
        expect(s2.prop('value')).to.eql('baaa');

    });
    it.skip('should render and not leak', function () {
        const Subschema                                = newSubschemaContext();
        const { Form, loader, importer, valueManager } = Subschema;

        const schema  = Autocomplete.schema;
        const context = setupFunc(Autocomplete, Subschema);

        const AutocompleteItemTemplate = loader.loadTemplate(
            'AutocompleteItemTemplate');
        const AutocompleteType         = loader.loadType('Autocomplete');

        class RenderTest extends React.Component {
            state = { count: 1 };

            increment() {
                this.setState({ count: this.state.count + 1 });
            }

            render() {
                const { count }   = this.state;
                const { ...copy } = schema;
                return count % 3 ?
                       <Form key={`render-count-${count}`} schema={copy}
                             loader={loader}
                             valueManager={valueManager}/> : null;
            }
        }


        const form         = byComponent(into(<RenderTest/>, true), Form);
        const { injector } = form.props;
        if (valueManager.listeners) {
            expect(valueManager.listeners.length).to.eql(4);
        }
        expect(injector.size()).to.eql(12);
        form.increment();
        form.increment();
        if (valueManager.listeners) {
            expect(valueManager.listeners.length).to.eql(0);
        }
        expect(injector.size()).to.eql(12);
        form.increment();
        form.increment();
        form.increment();
        form.increment();
        form.increment();
        if (valueManager.listeners) {
            expect(valueManager.listeners.length).to.eql(4);
        }
        expect(injector.size()).to.eql(12);

        //just a simple test to make sure everything still works.
        const [simple, ajax] = byTypes(form, AutocompleteType, 2);

        change(byTag(simple, 'input'), 'aaa');

        const suggestions = byComponents(simple, AutocompleteItemTemplate, 4);

        click(suggestions[2]);


    });

});
