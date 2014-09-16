dox
===

A documentation system that will convert a jsonic description of your api into a static searchable pretty documentation site.

Describing your app
-------------------

The overall application is described via a series of json data sources linked to in `data/app.json`.  This lists out a number of `apis`, each containing a number of endpoints described by the file in the `endpoints` key and a list of files from which to pull `models`.  Take a look at the examples in `data/*` for more information.

A note about models
-------------------

The models will recursively search for each value in the list of all models and evaluate that when displayed.  For example, you could have the following:

`models/example.json`

```json
[
  {
    "name": "example",
    "payload": {
      "get": {
        "foo": "foo.get",
        "bars": ["bar.get"]
      }
    }
  },
  {
    "name": "foo",
    "payload": {
      "get": {
        "bar": "bar.get"
      }
    }
  },
  {
    "name": "bar",
    "payload": {
      "get": {
        "foobar": "[str]"
      }
    }
  }
]
```

When displayed, references to the `example.get` key would be evaluated out into:

```json
{
  "foo": {
    "bar": {
      "foobar": "[str]"
    }
  },
  "bars": [
    {
      "foobar": "[str]"
    }
  ]
}
```
