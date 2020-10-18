Cut any string to a specific length. You can cut straight at the middle of a word, or set the `pretty` argument to `true`.
Moreover you can add dots (`...`) at the end of string, which is even prettier.
For example, here are some possible configurations:

```js
Prizm.cutty("The quick brown fox jumps over the lazy dog.", 19)
```

`returns "The quick brown fox..."`

## Go further
Otherwise we can remove the dots:

```js
Prizm.cutty(
    "The quick brown fox jumps over the lazy dog.",
    19,
    true, // <= Pretty cut-out
    false // no dots at the end
)
```

---

And what do you say we cut to as close as possible? To do that 
