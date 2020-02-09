Check if one of the matched node(s) has the specified class. If 3 elements are matched and only one has the requested class, `Prizm(<selector>).hasClass(<className>)` will return `true`. If 0 node has the class, it returns false.

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
  // In this case Prizm returns true.
  
    Prizm("p").hasClass("three");
  // But here false
```
