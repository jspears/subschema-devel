Subschema Navigation
===
This project adds simplistic routing to a subschema application.
See the demo for advanced usage


## Installation
```sh
# yarn add -D subschema-component-navigation
```

## Routing Usage
To use the routing functionality create a Route section in your schema.json

The route path is matched the corresponding component will be loaded and the 
router parameters will be injected into the component.  The urls are parsed with
see [@funjs/route-parser](https://github.com/fun-js/route-parser) for more information.

```json

{
  "schema": {

    "section1":{
      "type":"Routes",
      //Will load this type if no routes match.  It will recieve histories location object in this case.
      "notFound":"NotFound",
       "routes": {
            // will recieve a param named page
            "/doc/:page": "Doc",
            // will recieve a pram named name
            "/:name": "Example",
            // no params
             "": "Index"
       }
    }
  },
  "fieldsets":["section1"]
}
```
This schema needs to be passed into a NavigationForm

```jsx 
import React from 'react';
import {NavigationForm} from 'subschema-component-navigation';
import createHistory from 'history/createHashHistory';

//You can configure the history however you would like.

const history = createHistory({
    hashType: 'slash' // Google's legacy AJAX URL format

});


export default (props)=><NavigationForm  history={history} {...props}/>


```
## State
Components can interact with the location state through
@query
and
@location

These will be in sync with the browser url, weather updated by the valueManager
or the history (url);


## Components
This provides a few basic components for managing list of links and Links.
### Core components
- NavigationForm - A component that has the history component.  
- Routes - This is a type that acts as a container and injects the correct component for specified route.
### Layout Components
- ToggleLink - Will create a toggler for the query param changing the param based on input
- Navigate - Provides a list of rendered links.   
- NavTemplate - Just a simple navigation header.
- ULTemplate - Wrap a bunch of children in links in a ul list.
