# Morpheus Image Resize
Morpheus Image Resize is a JavaScript library for image resizing. It allows you to resize images to given size by using the HTML5 Canvas API.

## NPM
You can install Morpheus Image Resize by using `npm`.

```
npm install --save-dev morpheus-image-resize
```

## Installation
You can simply import Morpheus class and call static `resize` method to resize an image.

```
import Morpheus from 'morpheus-image-resize';

Morpheus.resize('image.jpg', {
    scale: 50
})
.then(canvas => Morpheus.toImage(canvas))
.then(image => {
    document.body.appendChild(image);
});
```

You can also add the script file into your HTML.
```
<!DOCTYPE html>
<html lang="en">
<head></head>
<body>
<script src="/node_modules/morpheus-image-resize/dist/morpheus.min.js"></script>
<script>
Morpheus.resize('image.jpg', {
    scale: 50
})
.then(canvas => Morpheus.toImage(canvas))
.then(image => {
    document.body.appendChild(image);
});
</script>
</body>
</html>
```

## Demo
This repository contains a simple demo project that allows you to give it a try and see the results.

If you want to run the demo, clone the repository and go to the project directory.

```
$ git clone https://github.com/cevadtokatli/morpheus-image-resize.git
$ cd morpheus-image-resize/demo/dist
```

Open the demo file in your browser.

```
$ open index.html
```


## Methods
All methods of Morpheus are static and return a `Promise` to be chained.

### Resize

##### `static Promise resize(Image, Options)`
Resizes given image and returns a Promise that resolves a canvas element which can be converted to a file, image, blob or base64 code by using Morpheus' convert methods _(`toImage`, `toFile`, `toBlob`, `toBase64`)_.

#### Method Arguments
##### `Image {HTMLImageElement|HTMLCanvasElement|File|String}`

Image to be resized. It can be given in five different ways.

An Image Element:
```
var img = new Image();
img.addEventListener('load', function() {
    Morpheus.resize(img);
});
img.src = "image.jpg";

Morpheus.resize(document.querySelector('img'));
```

A Canvas Element:
```
var canvas = document.querySelector('canvas');
canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);

Morpheus.resize(canvas);
```

A File:
```
var file = document.querySelector('input[type="file"]').files[0];
Morpheus.resize(file)
```

An Image Source (String):
```
Morpheus.resize('path/image.jpg');
```

A Base64 Code (String):
```
Morpheus.resize('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQAB...');
```

##### ``Options {Object}``

New size or scale.

**Options Properties:**

**``Width {Number}``**\
It must be a px value. If value is null, resizes width according to height.

**``Height {Number}``**\
It must be a px value. If value is null, resizes height according to width.

**``Scale {Number}``**\
It scales images in both dimensions at given ratio.


### Convert Methods
##### ``static Promise toImage(HTMLCanvasElement canvas)``
Converts the given canvas element to an image element. Returns a `Promise` that resolves an image element.

##### ``static Promise toFile(HTMLCanvasElement canvas, String fileName)``
Converts the given canvas element to a file. Returns a `Promise` that resolves a file.

##### ``static Promise toBlob(HTMLCanvasElement canvas)``
Converts the given canvas element to a blob. Returns a `Promise` that resolves a blob.

##### ``static Promise toBase64(HTMLCanvasElement canvas)``
Converts the given canvas element to base64. Returns a `Promise` that resolves base64.

## IE Support
IE 10 is not supported and patches to fix problems will not be accepted.

## License
Morpheus Image Resize is provided under the [MIT License](https://opensource.org/licenses/MIT).