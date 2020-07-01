This method insert a string or a node before an existing node.

See instead this basic HTML code:

```html
<p class="new-content">How are you ?</p>
```

Then whether the `after()` method is called like that,

```js
Prizm("one").after('<h4 class="one">Hello !</h4>');
```

the DOM will look like this.

```html
<h4 class="one">Hello !</h4>
<p class="new-content">How are you ?</p>
```
