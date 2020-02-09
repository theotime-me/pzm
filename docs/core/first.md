This method return a Prizm object including ___only___ the first node found with your selector.

Example:

``` html
  <!-- HTML code-->
  <div>
    <p class="one">Hi !</p>
    <p class="one">Goodbye !</p>
  </div>
```

``` js
  // Javascript code
  
  Prizm("p").last().html()
  // Returns "Goodbye !"
```
