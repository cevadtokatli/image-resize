# Image Resize

JavaScript library for image resizing. It allows you to resize images to a given size or scale by using the HTML5 Canvas API.

[Click here to see the demo.](https://cevadtokatli.github.io/image-resize)

## Installation

It is available as a package on NPM for use with a module bundler.

```sh
# NPM
$ npm install --save @cevad-tokatli/image-resize

# Yarn
$ yarn add @cevad-tokatli/image-resize
```

## Usage

You can simply import the module and call `resize` method to resize an image.

```typescript
import { resize, toImage } from '@cevad-tokatli/image-resize'

resize('image.jpg', {
    scale: 50,
})
.then(canvas => toImage(canvas))
.then(image => {
    document.body.appendChild(image)
})
```

## Methods

The module provides the following methods to resize image and convert it to different formats.

### Resize

**`resize(input: HTMLImageElement | HTMLCanvasElement | File | string, options?: ResizeOptions): Promise<HTMLCanvasElement>`**

Resizes the input and returns a Promise that resolves a canvas element which can be converted to a file, image, blob or base64 code by using the provided convert methods _(`toFile`, `toImage`, `toBlob`, `toBase64`)_.

#### Method Arguments

##### **`input`**

Image to be resized. It can be given in five different ways.

An Image Element:
```typescript
import { resize } from '@cevad-tokatli/image-resize'

const img = new Image()
img.addEventListener('load', () => {
    resize(img)
})
img.src = 'image.jpg'
```

A Canvas Element:
```typescript
import { resize } from '@cevad-tokatli/image-resize'

const img = document.querySelector('img')
const canvas = document.createElement('canvas')
canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);

resize(canvas)
```

A File:
```typescript
import { resize } from '@cevad-tokatli/image-resize'

const file = document.querySelector('input[type="file"]').files[0]

resize(file)
```

An Image Source (String):
```typescript
import { resize } from '@cevad-tokatli/image-resize'

resize('image.jpg')
```

A Base64 Code (String):
```typescript
import { resize } from '@cevad-tokatli/image-resize'

resize('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQAB...')
```

##### `options`

Dimensions or scale by which to resize the image.

**Options Properties:**

**`width: number`**
It must be a px value. If it is null, resizes width according to height.

**`height: number`**
It must be a px value. If it is null, resizes height according to width.

**`scale: number`**
It scales images in both dimensions at given ratio.


### Convert Methods
##### `toFile(canvas: HTMLCanvasElement, fileName?: string): Promise<File>`
Converts the given canvas element to a file object.

##### `toImage(canvas: HTMLCanvasElement): Promise<HTMLImageElement>`

Converts the given canvas element to an image element.

##### `toBlob(canvas: HTMLCanvasElement): Promise<string>`
Converts the given canvas element to a blob URL.

##### `toBase64(canvas: HTMLCanvasElement): string`
Converts the given canvas element to base64 code.

## License
Image Resize is provided under the [MIT License](https://opensource.org/licenses/MIT).
