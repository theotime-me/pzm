This method return a Prizm object including ___only___ the last node found with your selector. You can pass a function as first argument, it will be called with the Prizm object in first argument too.

Example:

``` html
  <!-- HTML code-->
  <div>
    <p class="one">Hi !</p>
    <p class="two">Goodbye !</p>
  </div>
```

``` js
  // Javascript code
  
  Prizm("p").last().html()
  // Returns "Goodbye !"
```
or
``` js
  Prizm("p").last(el => {
    el.log();
  });

  // Log <p class="two"> in the console
```
