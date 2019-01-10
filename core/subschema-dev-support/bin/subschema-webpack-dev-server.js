#!/usr/bin/env node
process.env.MRBUILDER_INTERNAL_PRESETS='subschema-dev-support';
require('@mrbuilder/cli/bin/mrbuilder');
