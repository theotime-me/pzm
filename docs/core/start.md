Hi! Welcome to the light, flexible and modern __Prizm__ framework!
_Prizm_ is really easy to handle: all the basic functions are already setup, as well the framework can execute DOM operations. We have called this the _Prizm Core_.

> To find help about this functions, click on them in the left panel.

However, Prizm becomes interesting when you start developping with the *Prizm packages*. Small code blocks whiches are filling a specific needing and can be installed (or not) at your convenience ! It avoid useless code in the framework, and therefore _Prizm_ is lighter that others ones.

Obviously, we have worked on the simplicity of the framework. To add prizm to your website, you just have to include this script: 

``` html
  <script src="https://pzm.herokuapp.com/$/"></script>
```

This url is fully customizable: you can
* change the alias to `p`, `z` or `_` _(`$` by default)_
  ex: https://pzm.herokuapp.com/z -> the alias is now `z`
* add any package, separated by `|`:
  ex: https://pzm.herokuapp.com/$/ajax|date|os -> 3 packages are installed (`ajax`, `date` and `os`)
