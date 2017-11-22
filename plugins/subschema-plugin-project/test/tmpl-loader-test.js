import { expect } from 'chai';
import { projectTemplates as templates } from "subschema-project";
import pkg from "../../subschema/_package.json";

describe('tmpl-loader', function () {
    Object.keys(templates).forEach((key) => {
        it(`should render template "${key}"`, function () {
            expect(templates[key]({
                schema  : {},
                title   : 'Hello',
                demo    : 'what',
                jsName  : 'uhhu',
                setupTxt: 'Setup Text',

                scripts: {
                    form: {
                        vars: ''
                    }
                },
                sample : {},

                project: {
                    name: 'hello'
                },
                pkg
            })).to.exist;
        });
    })
})
;
