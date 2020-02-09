The .addClass Prizm's method allows you to add a className to any DOM element. You have to pass a string as argument or an array to add multiples classes.

``` html
  <!-- HTML code-->
  <div>
    <p class="one">Hi !</p>
    <p class="two">Goodbye !</p>
  </div>
```

``` js
  Prizm(".one").addClass("hi");
  // The "hi" class was added to <p class="one hi">
  
    Prizm(".two").addClass(["good", "bye"]);
      // The "good" and the "bye" classes were added to <p class="one good bye">
```
