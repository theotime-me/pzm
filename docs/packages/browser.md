know the browser of your users with this package. Simply use `Prizm.browser()` or pass one argument to test the browser as shown below:

```js
  Prizm.browser(); // return "Firefox"

  // or

  Prizm.browser("firefox"); // return true
  Prizm.browser("fIrEfOx"); // return true
  Prizm.browser("chrome"); // return false
```

---

## Arguments
There is only one argument:

| Argument    | Description | Type  | Default
| ----------- | ----------- | ----  |--------
|browser | test browser | string | ---
