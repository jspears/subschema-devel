---
import Test
from
 '../TestComponent';
 import Muck,
    {Other as Me, joe as doe
    } from '../TestComponent' doc;

import Document from '../Document';
import whatever from '!!json-loader!../../subschema-docgen-loader!../TestComponent'
---
Hello from Test
===

![alt component-doc](../TestComponent)

<Document types={whatever}/>

<Muck/>

as <Test name='me'/> with more stuff.
