import { ResizeOptions } from './types'

/**
 * Creates a new image element and returns a Promise that resolves it.
 */
const createImageElement = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.addEventListener('load', () => resolve(img))
    img.addEventListener('error', reject)
    img.crossOrigin = 'true'
    img.src = src
  })
}

/**
 * Converts DOM element, image file or string (url or base64 code) to an image element and returns a Promise that resolves it.
 */
const getImageElement = (input: HTMLImageElement | HTMLCanvasElement | File | string): Promise<{ element: HTMLImageElement, extension: string }> => {
  return new Promise(async (resolve, reject) => {
    try {
      if (typeof input === 'string') {
        resolve({
          element: await createImageElement(input),
          extension: getImageExtension(input),
        })
      } else {
        const proto = (input as any).__proto__.toString()

        switch (proto) {
          case '[object HTMLImageElement]':
          case '[object HTMLImageElementPrototype]':
            return resolve({
              element: await createImageElement((input as HTMLImageElement).src),
              extension: getImageExtension((input as HTMLImageElement).src),
            })
          case '[object HTMLCanvasElement]':
          case '[object HTMLCanvasElementPrototype]':
            return resolve({
              element: await toImage(input as HTMLCanvasElement),
              extension: 'png',
            })
          case '[object File]':
          case '[object FilePrototype]':
            if (!(input as File).type.match(/image/)) {
              return reject(new Error('File is not an image'))
            }

            const reader = new FileReader()
            reader.addEventListener('load', async e => {
              resolve({
                element: await createImageElement(e.target.result as string),
                extension: getImageExtension((input as File).name),
              })
            })
            reader.addEventListener('error', reject)
            reader.readAsDataURL(input as File)

            break
          default:
            reject('Image not found')
        }
      }
    } catch(err) {
      reject(err)
    }
  })
}

/**
 * Gets image extension of the given canvas element or from the file name or base64 code.
 */
const getImageExtension = (input: HTMLCanvasElement | string): string => {
  if (input instanceof HTMLCanvasElement) {
    return input.getAttribute('data-extension')?.replace('jpg', 'jpeg') ?? 'png'
  } else {
    const match = input.match(/data:image\/([A-z]+);base64/)
    if (match) {
      return match[1]
    } else {
      const fileNameSplit = input.split('.')
      return fileNameSplit[fileNameSplit.length - 1]
    }
  }
}

/**
 * Gets image type of the given canvas element.
 */
const getImageType = (canvas: HTMLCanvasElement): string => `image/${getImageExtension(canvas)}`

/**
 * Resizes the given image and returns a Promise that resolves a canvas element which can be converted to a file, image, blob or base64 code 
 * by using convert methods (toImage, toFile, toBlob, toBase64).
 */
export const resize = (input: HTMLImageElement | HTMLCanvasElement | File | string, options: ResizeOptions = {}): Promise<HTMLCanvasElement> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { element: img, extension } = await getImageElement(input)
      const natWidth = img.naturalWidth || img.width
      const natHeight = img.naturalHeight || img.height

      let width: number
      let height: number

      if (options.scale > 0) {
        width = (natWidth * options.scale) / 100
        height = (natHeight * options.scale) / 100
      } else if (options.width > 0 && options.height > 0) {
        width = options.width
        height = options.height
      } else if (options.width > 0) {
        width = options.width
        height = natHeight / (natWidth / width)
      } else if (options.height > 0) {
        height = options.height
        width = natWidth / (natHeight / height)
      } else {
        width = natWidth
        height = natHeight
      }

      width = parseInt(width as any)
      height = parseInt(height as any)

      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const _canvas = document.createElement('canvas')
      const _ctx = _canvas.getContext('2d')

      canvas.setAttribute('data-extension', extension)
      canvas.width = natWidth
      canvas.height = natHeight
  
      if (width !== natWidth || height !== natHeight) {
        for (ctx.drawImage(img, 0, 0, natWidth, natHeight); canvas.width !== width || canvas.height !== height;) {
          const cwidth = canvas.width / 2
          const cheight = canvas.height / 2

          if (cwidth >= width && cheight >= height) {
            _canvas.width = cwidth
            _canvas.height = cheight
          } else {
            _canvas.width = width
            _canvas.height = height
          }

          _ctx.drawImage(canvas, 0, 0, _canvas.width, _canvas.height)

          canvas.width = _canvas.width
          canvas.height = _canvas.height

          ctx.drawImage(_canvas, 0, 0, canvas.width, canvas.height)
        }
      } else {
        ctx.drawImage(img, 0, 0, width, height)
      }

      resolve(canvas)
    } catch(err) {
      reject(err)
    }
  })
}

/**
 * Converts the given canvas element to base64 code.
 */
export const toBase64 = (canvas: HTMLCanvasElement): string => canvas.toDataURL(getImageType(canvas), 1)

/**
 * Converts the given canvas element to blob.
 */
export const toBlob = (canvas: HTMLCanvasElement): Promise<string> => {
  return new Promise(resolve => {
    canvas.toBlob(blob => {
      resolve(URL.createObjectURL(blob))
    }, getImageType(canvas), 1)
  })
}

/**
 * Converts the given canvas element to a file.
 * Optionally, the file name can be set.
 */
export const toFile = (canvas: HTMLCanvasElement, fileName: string = 'image'): Promise<File> => {
  return new Promise(resolve => {
    canvas.toBlob(blob => {
      const file = new File([blob], `${fileName}.${getImageExtension(canvas)}`, { type: getImageType(canvas) })
      resolve(file)
    }, getImageType(canvas), 1)
  })
}

/**
 * Converts the given canvas element to an image element.
 */
export const toImage = (canvas: HTMLCanvasElement): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.addEventListener('load', () => {
      img.width = img.naturalWidth
      img.height = img.naturalHeight
      resolve(img)
    })
    img.addEventListener('error', reject)
    img.src = toBase64(canvas)
  })
}
