import React from "react";
import { compile, generate, project } from "subschema-plugin-project";
import { expect } from 'chai';
import { testEachSample } from "./support";

describe('subschema-plugin-project/samples', function () {
    this.timeout(50000);

    testEachSample((ds, sample) => {
        it(`should render "${sample}"`, async () => {
            const blob = await generate(ds, 'page', 'string');
            expect(blob).to.exist;
        });
    });

});
