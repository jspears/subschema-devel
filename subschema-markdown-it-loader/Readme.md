subschema-markdown-it-loader
===
Converts Markdown into react components with special magic.


## Demo
See it in action [here]()

Or run it 

```sh
  git clone 
  cd subschema-markdown-it-loader
  npm install
  npm run server &
  open http://localhost:8082
```

## Installation
```sh
 $ npm install subschema-markdown-it-loader
``

## Usage
```jsx

 import React, {Component} from 'react';
 import {loader, Form} from 'subschema';
 import subschemaMarkdownItLoader from 'subschema-markdown-it-loader';
 
 loader.addLoader(subschemaMarkdownItLoader);
 
 //A simple Schema for this demo.
 var schema = {
  "schema": {
    "title": {
      "type": "Select",
      "options": [
        "Mr",
        "Mrs",
        "Ms"
      ]
    },
    "name": {
      "type": "Text",
      "validators": [
        "required"
      ]
    },
    "age": {
      "type": "Number"
    }
  },
  "fieldsets": [
    {
      "legend": "Name",
      "fields": "title, name, age",
      "buttons": [
        {
          "label": "Cancel",
          "action": "cancel",
          "type": "reset",
          "buttonClass": "btn"
        },
        {
          "label": "Submit",
          "action": "submit",
          "buttonClass": "btn btn-primary"
        }
      ]
    }
  ]
}
 
 export default class App extends Component {
 
     render() {
         return <div>
             <h3></h3>
             <Form schema={schema}/>
         </div>
     }
 }


  
```
