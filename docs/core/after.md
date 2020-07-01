This method insert a string or a node after an existing node.

See instead this basic HTML code:

```html
  <h4 class="one">Hello !</h4>
```

Then whether the `after()` method is called like that,

```js
  Prizm("one").after('<p class="new-content">How are you ?</p>');
```

the DOM will look like this.

```html
  <h4 class="one">Hello !</h4>
  <p class="new-content">How are you ?</p>
```
