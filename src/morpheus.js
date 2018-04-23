import 'es6-promise/auto';

export default class Morpheus {
    /**
     * Resizes the given image and returns a Promise that resolves a canvas element which can be converted to a file, image, blob or base64 code 
     * by using convert methods(toImage, toFile, toBlob, toBase64).
     *
     * @param {HTMLImageElement|HTMLCanvasElement|File|String} image
     * @param {Object} o
     * @returns {Promise}
     */
    static resize(image, o={}) {
        return new Promise(async (resolve, reject) => {
            var i = await this.getImage(image);

            if(i.error) {
                reject(i.error);
                return;
            }

            var img = i.img,
                nWidth = img.naturalWidth || img.width,
                nHeight = img.naturalHeight || img.height,
                width,
                height;

            o.scale = parseInt(o.scale);
            o.width = parseInt(o.width);
            o.height = parseInt(o.height);

            // set new size
            if(o.scale > 0) {
                width = (nWidth * o.scale) / 100;
                height = (nHeight * o.scale) / 100;
            } else if(o.width > 0 && o.height > 0) {
                width = o.width;
                height = o.height;
            } else if(o.width > 0) {
                width = o.width;
                height = nHeight / (nWidth / width);
            } else if(o.height > 0) {
                height = o.height;
                width = nWidth / (nHeight / height);
            } else {
                width = nWidth;
                height = nHeight;
            }

            width = parseInt(width);
            height = parseInt(height);

            // resize
            var canvas = document.createElement('canvas'),
                ctx = canvas.getContext('2d'),
                _canvas = document.createElement('canvas'),
                _ctx = _canvas.getContext('2d');

            canvas.extension = i.ext;
            canvas.width = nWidth;
            canvas.height = nHeight;

            if(width != nWidth || height != nHeight) {
                for(ctx.drawImage(img, 0, 0, nWidth, nHeight); canvas.width != width || canvas.height != height;) {
                    var cWidth = canvas.width / 2,
                        cHeight = canvas.height / 2;

                    if(cWidth >= width && cHeight >= height) {
                        _canvas.width = cWidth;
                        _canvas.height = cHeight;
                    } else {
                        _canvas.width = width;
                        _canvas.height = height;
                    }

                    _ctx.drawImage(canvas, 0, 0, _canvas.width, _canvas.height);
                    canvas.width = _canvas.width,
                        canvas.height = _canvas.height;
                    ctx.drawImage(_canvas, 0, 0, canvas.width, canvas.height);
                }
            } else {
                ctx.drawImage(img, 0, 0, width, height);
            }

            resolve(canvas);
        });
    }

    /**
     * Returns a Promise that resolve an image which is converted from the given type.
     *
     * @param {HTMLImageElement|HTMLCanvasElement|File|String} i
     * @returns {Promise}
     */
    static getImage(i) {
        return new Promise(resolve => {
            if(typeof i == 'string') {
                resolve(this.resolveImage(i, this.getExtension(i)));
            } else {
                var p = i.__proto__.toString();

                switch(p) {
                    case '[object HTMLImageElement]':
                    case '[object HTMLImageElementPrototype]':
                        resolve(this.resolveImage(i.src, this.getExtension(i.src)));
                        break;
                    case '[object HTMLCanvasElement]':
                    case '[object HTMLCanvasElementPrototype]':
                        resolve({
                            img: i,
                            ext: 'png'
                        });
                        break;
                    case '[object File]':
                    case '[object FilePrototype]':
                        if(!i.type.match(/image/)) {
                            resolve({
                                error: 'It is not an image file'
                            });
                        } else {
                            var reader = new FileReader();
                            reader.addEventListener('load', e => {
                                resolve(this.resolveImage(e.target.result, this.getExtension(i.name)));
                            });
                            reader.addEventListener('error', () => {
                                resolve({
                                    error: 'File not loaded',
                                });
                            });
                            reader.readAsDataURL(i);
                        }
                        break;
                    default:
                        resolve({
                            error: 'Image not found'
                        });
                }
            }
        });
    }

    /**
     * Gets the extension of an image name or base64 code.
     *
     * @param {String} i
     * @returns {String}
     */
    static getExtension(i) {
        var m;
        if(m = i.match(/data:image\/([A-z]+);base64/)) {
            return m[1];
        } else {
            var e = i.split('.');
            return e[e.length-1];
        }
    }

    /**
     * Creates a new image and returns a Promise that resolves it.
     *
     * @param {String} img
     * @param {String} ext
     * @returns {Promise}
     */
    static resolveImage(img, ext) {
        return new Promise(resolve => {
            var image = new Image();
            image.setAttribute('crossorigin', true);
            image.addEventListener('load', () => {
                resolve({
                    img: image,
                    ext
                });
            });
            image.addEventListener('error', e => {
                resolve({
                    error: 'Image not loaded'
                });
            });
            image.src = img;
        });
    }

    /**
     * Converts the given canvas element to an image element.
     *
     * @param {HTMLCanvasElement} canvas
     * @returns {Promise}
     */
    static toImage(canvas) {
        return new Promise((resolve, reject) => {
            this.toBase64(canvas)
                .then(base64 => {
                    var img = new Image();
                    img.addEventListener('load', () => {
                        img.width = img.naturalWidth;
                        img.height = img.naturalHeight;
                        resolve(img);
                    });
                    img.addEventListener('error', e => {
                        reject(e);
                    });
                    img.src = base64;
                })
                .catch(e => {
                    reject(e);
                });
        });
    }

    /**
     * Converts the given canvas element to a file.
     * Optionally, the file name can be set.
     * 
     * @param {HTMLCanvasElement} canvas
     * @param {String} fileName
     * @returns {Promise}
     */
    static toFile(canvas, fileName='morpheus') {
        return new Promise((resolve, reject) => {
            try {
                var ext = (canvas.extension || 'png').replace('jpg', 'jpeg');
                canvas.toBlob(blob => {
                    var file = new File([blob], fileName+'.'+ext, {type:'image/'+ext});
                    resolve(file);
                }, 'image/'+ext, 1);
            } catch(e) {
                reject(e);
            }
        });
    }

    /**
     * Converts the given canvas element to blob.
     *
     * @param {HTMLCanvasElement} canvas
     * @returns {Promise}
     */
    static toBlob(canvas) {
        return new Promise((resolve, reject) => {
            try {
                var ext = (canvas.extension || 'png').replace('jpg', 'jpeg');
                canvas.toBlob(blob => {
                    var url = URL.createObjectURL(blob);
                    resolve(url);
                }, 'image/'+ext, 1);
            } catch(e) {
                reject(e);
            }
        });
    }

    /**
     * Converts the given canvas element to base64 code.
     *
     * @param {HTMLCanvasElement} canvas
     * @returns {Promise}
     */
    static toBase64(canvas) {
        return new Promise((resolve, reject) => {
            try {
                var ext = (canvas.extension || 'png').replace('jpg', 'jpeg'),
                    base64 = canvas.toDataURL('image/'+ext, 1);
                resolve(base64);
            } catch(e) {
                reject(e);
            }
        });
    }
}