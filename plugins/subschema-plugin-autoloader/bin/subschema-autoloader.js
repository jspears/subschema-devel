#!/usr/bin/env node
const DefaultLoaderFactory = require('../lib/index').default;
const optionsManager = new (require('mrbuilder-optionsmanager').default)({prefix:'subschema', _require:require});
console.log(DefaultLoaderFactory(optionsManager).code);
