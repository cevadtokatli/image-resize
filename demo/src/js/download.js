import {dropzone, resize} from './app.js';
import Util from './util.js';

export default class Download {
    constructor() {
        this.download = document.querySelector('.download');
        this.img = this.download.querySelector('img');
        this.button = {
            upload: this.download.querySelector('.button[function="upload"]'),
            back: this.download.querySelector('.button[function="back"]')
        };

        this.button.upload.addEventListener('click', async () => {
            await Util.closeOpacityAnimation(this.download);
            await Util.openOpacityAnimation(dropzone.dropzone);
        });

        this.button.back.addEventListener('click', async () => {
            await resize.init(null, false);
            await Util.closeOpacityAnimation(this.download);
            await Util.openOpacityAnimation(resize.resize);
        });
    }

    init(base64) {
        this.img.src = base64;
    }
}