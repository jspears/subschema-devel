
## Dependencies
Subschema compiles things into itself, if you want to use the source inside your project, and not the subschema dist files, you will need a few more deps.
* subschema
* subschema-dev-support

## DefaultLoader
By default subschema uses a DefaultLoader that tries to determine components you
want to include and include them in your build. You can configure this, by adding
a "subschema" section to package.json


```json
  {
    "name":"your-package",
    ...
    "dependencies":{
       "your-fantastic-dep":"0.0.1",
       "your-fantastic-dep-is-evil":"0.0.1"
    ...
    }

    "subschema":{
       "includes":["your-fantastic-dep"],
       "excludes":["*-is-evil"]
    }


  }

```

## Webpack
You will probably need to do some webpack munging.
Here is an example that does this.
If you include a webpack.subschema.js in the root of your project you can change how it compiles.

```js
module.exports = function(webpack, opts){
    //webpack is the current webpack config.
    //opts are some handy opts to see what mode its in.


    return webpack;
}


```

## Or use your very own DefaultLoader and alias it in the subschema-webpack.config.js
Default loader is just a loader with components installed.

```js


module.exports = function(webpack, opts){
    //webpack is the current webpack config.
    //opts are some handy opts to see what mode its in.
    webpack.alias.DefaultLoader = path.resolve('/path/to/your/defaultLoader';

    return webpack;
}
```




