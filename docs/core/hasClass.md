Check if one of the matched node(s) has the specified class.
If several elements are matched and just one has the requested class, `Prizm(<selector>).hasClass(<className>)` will return `true`.
If no node has the class, it returns false.

examples:

``` html
  <!-- HTML code-->
  <div>
    <p class="one">Hi !</p>
    <p class="two">Goodbye !</p>
  </div>
```

``` js
  Prizm("p").hasClass("one");
  Prizm("p").hasClass("two");
  // In theses cases Prizm returns true.
  
  Prizm("p").hasClass("three");
  // But here it returns false !
```
