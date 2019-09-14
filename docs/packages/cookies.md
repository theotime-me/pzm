Set and get cookies with this package ! Two function are available: `Prizm.getCookie()` and `Prizm.setCookie()`. Look at it instead:

```js
  Prizm.setCookie("foo", "bar", 999) // SET "foo" to "bar" for 999 days.
  Prizm.getCookie("foo") // GET "foo", return "bar".
```

> At the first line, we set a cookie called `foo` to the value `bar`, that will stay in the browser for `999` days. And for the second line, we get the cookie that was set before, this is because the result is `bar`.

---

## Arguments

`setCookie();`
| Argument    | Description | Type  | Default
| ----------- | ----------- | ----  |--------
| name* | cookie's name | string | ---
| value* | cookie's new value | string or numbers | ---
| days | expiration time in days | numbers | 0
*required

If the `days` argument isn't provided, the cookie [will be deleted](https://www.w3schools.com/js/js_cookies.asp) when the browser's window will be closed.

---

`getCookie();`
| Argument    | Description | Type  | Default
| ----------- | ----------- | ----  |--------
| name* | cookie's name | string | ---
*required
