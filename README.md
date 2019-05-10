# awsome-jsonp

Disappear the part of your website that which you want, just like Thanos snap his finger with infinity glove.

## Installation

In a browser:

```html
<script src="Thanos-fingersnap.js"></script>
```

Using npm:

```sh
npm install thanos-fingersnap --save
```

## Options

Options is very simple.

- `el` (`String` or `Element`) The element that you want it to disappear.
- `count` (`Number`) the canvas element will generate. By default is `10`, and modifying this option may affect performance.

## Usage example

Usage is also very easy.

```js

  var thanos = new Thanos({
    el: '#container'
  })

  // when you want to destroy the element,
  // call the `snap` method

  thanos.snap()

  // when you want to restore the element,
  // call the `restore` method

  thanos.restore()

```

## Attention

If the element contains `<img>`, the image source must be Same-origin or the image source allow cross-origin.