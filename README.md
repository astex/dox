dox
===

A documentation system that will convert a jsonic description of your api into a static searchable pretty documentation site.

Describing your app
-------------------

The overall application is described via a series of json data sources linked to in `data/app.json`.  This lists out a number of `apis`, each containing a number of endpoints described by the file in the `endpoints` key and a list of files from which to pull `models`.  Take a look at the examples in `data/*` for more information.
