Check if one of the matched node(s) has the specified class.
If several elements are matched and just one has the requested class, `Prizm(<selector>).hasClass(<className>)` will return `true`. If 0 node has the class, it returns false.

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
  // In theses case Prizm returns true.
  
    Prizm("p").hasClass("three");
  // But here it returns false !
```
