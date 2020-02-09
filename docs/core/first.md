This method return a Prizm object including ___only___ the first node found with your selector. You can pass a function as first argument, it will be called with the Prizm object in first argument too.

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
  
  Prizm("p").first().html()
  // Returns "Hi !"
```
or
``` js
  Prizm("p").first(el => {
    el.log();
  });

  // Log <p class="one"> in the console
```
