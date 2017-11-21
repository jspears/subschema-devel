module.exports = {
    description: `Autocomplete adds static or dynamic autocompletion.
     If options are passed than it behaves mostly like the select component.
     If a processor is passed than it can load dynamically.
     `,
    schema: {
        schema: {
            'simple': {
                type: 'Autocomplete',
                options: ['aaaa', 'aaab', 'aba', 'baaa', 'caaa'],
                placeholder:'Please type "a"'
            },
            'ajax': {
                type: 'Autocomplete',
                processor: 'fakeAjax',
                help:'Uses a fake ajax call to demonstrate different value than label'
            }
        }
    },
    data: {
        simple: 'aaaa',
        ajax: {
            val: '1',
            label: 'a 1'
        }
    },
    imports: {
        'subschema': ['loader']
    },
    props: ["loader"]
};
