import {dropzone, download} from './app.js';
import Util from './util.js';
import Morpheus from "../../../dist/morpheus.esm.js";

export default class Resize {
    constructor() {
        this.resize = document.querySelector('.resize');
        this.img = this.resize.querySelector('img');
        this.input = {
            width: this.resize.querySelector('input[model="width"]'),
            height: this.resize.querySelector('input[model="height"]'),
            scale: this.resize.querySelector('input[model="scale"]')
        };
        this.button = {
            resize: this.resize.querySelector('.button[function="resize"]'),
            cancel: this.resize.querySelector('.button[function="cancel"]')
        };

        this.button.resize.addEventListener('click', this.doResize.bind(this));
        this.button.cancel.addEventListener('click', async () => {
            await Util.closeOpacityAnimation(this.resize);
            await Util.openOpacityAnimation(dropzone.dropzone);
        });
    }

    init(file, reset) {
        return new Promise(resolve => {
            if(reset) {
                this.input.width.value = null;
                this.input.height.value = null;
                this.input.scale.value = null;
            }

            if(file) {
                this.file = file;
                var reader = new FileReader();
                reader.addEventListener('load', e => {
                    this.img.src = e.target.result;
                    resolve();
                });
                reader.readAsDataURL(file);
            } else {
                resolve();
            }
        });
    }

    async doResize() {
        var o = {};

        if(this.input.scale.value.trim()) {
            o.scale = parseInt(this.input.scale.value);
        } if(this.input.width.value.trim()) {
            o.width = parseInt(this.input.width.value);
        } if(this.input.height.value.trim()) {
            o.height = parseInt(this.input.height.value);
        }

        this.canvas = await Morpheus.resize(this.file, o);
        var base64 = await Morpheus.toBase64(this.canvas);
        download.init(base64);
        await Util.closeOpacityAnimation(this.resize);
        await Util.openOpacityAnimation(download.download);
    }
}