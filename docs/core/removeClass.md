The .removeClass Prizm's method allows you to remove a className to any DOM element. You have to pass a string as argument or an array to remove multiples classes.

``` html
  <!-- HTML code-->
  <div>
    <p class="one hi">Hi !</p>
    <p class="two good bye">Goodbye !</p>
  </div>
```

``` js
  Prizm(".one").removeClass("hi");
  // The "hi" class was removed to <p class="one">
  
    Prizm(".two").removeClass(["good", "bye"]);
      // The "good" and the "bye" classes were removed to <p class="one">
```
