Based on [ajax package](/docs/package/ajax), this one allow to:
* download a script
* execute it (in the global scope)

This is how to get the [HighlightJS](https://highlightjs.org/) library with `get Script` !
```js
Prizm.getScript('https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.3.1/build/highlight.min.js', (status) => {

    // All here is executed ONLY when the file was executed.

    console.log("The HTTP status code is "+status+" !");
});
```