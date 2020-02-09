By using this function you're able to fill any node(s) with any string or DOM element.

There are few examples to help you to understand:
``` js
  $("p").html("Hello !");
  // or
  let newNode = Prizm.createNode("a");
   $("p").html(newNode);
  // or
  let existingNodeToCopy = $("h4");
   $("p").html(existingNodeToCopy);
```
