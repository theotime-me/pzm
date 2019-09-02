Ajax is a package that helps you to make requests with the [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) API. You can pass arguments to the function as shown below:

```js
Prizm.ajax({
  url: "https://randomuser.me/api/",
  async: true,
  success(data) {
    $.log(data.results[0].name.first);
  }
});
```
`log "hedwig" in the console`

---

## Arguments
There are all arguments availables as [destructured parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Unpacking_fields_from_objects_passed_as_function_parameter).

| Argument    | Description | Type  | Default
| ----------- | ----------- | ----  |--------
| url*         | url to fetch| string| ---
| async       | set if the request is asynchronous| boolean| false
| method | [HTTP request method](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) to use | string | "GET"
| parse       | Parse json in case it's one | boolean | true
| success       | Success callback | function | ---
| error       | Error callback | function | ---
| progress       | Progress callback (return %) | function | ---
*required

---

If the received data is in json, automatically the result is converted into a javascript object using [`JSON.parse`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse). If you want disabled it, set `parse: false` as argument.
