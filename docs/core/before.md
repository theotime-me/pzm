This method insert a string or a node before an existing node.

See instead this basic HTML code:

```html
<p class="old-content">How are you ?</p>
```

Then whether the `before()` method is called like that,

```js
Prizm("one").before('<h4 class="new-content">Hello !</h4>');
```

the DOM will look like this.

```html
<h4 class="new-content">Hello !</h4>
<p class="old-content">How are you ?</p>
```
