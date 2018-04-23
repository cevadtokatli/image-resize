import {resize} from './app.js';
import Util from './util.js';

export default class Dropzone {
    constructor() {
        this.dropzone = document.querySelector('.dropzone');
        this.input = this.dropzone.querySelector('input');
        this.i = 0;

        this.input.addEventListener('change', this.changed.bind(this));
        this.dropzone.addEventListener('dragenter', e => {
            e.preventDefault();
            this.i += 1;
        });
        this.dropzone.addEventListener('dragleave', e => {
            e.preventDefault();
            this.i -= 1;
        });
        this.dropzone.addEventListener('dragover', e => {
            e.preventDefault();
        });
        this.dropzone.addEventListener('drop', this.dropped.bind(this));
    }

    get i() {
        return this._i;
    }

    set i(v) {
        this._i = v;

        if(v > 0 && !this.dropzone.classList.contains('dropzone-active')) {
            this.dropzone.classList.add('dropzone-active');
        } else if(v == 0 && this.dropzone.classList.contains('dropzone-active')) {
            this.dropzone.classList.remove('dropzone-active');
        }
    }

    changed(e) {
        e.preventDefault();
        this.i = 0;

        if(this.input.files.length != 0) {
            this.checkFile(this.input.files[0]);
            this.input.value = null;
        }
    }

    dropped(e) {
        e.preventDefault();
        this.i = 0;

        if(e.dataTransfer.files.length != 0) {
            this.checkFile(e.dataTransfer.files[0]);
        }
    }

    async checkFile(file) {
        if(file.type.match(/image/)) {
            await resize.init(file, true);
            await Util.closeOpacityAnimation(this.dropzone);
            await Util.openOpacityAnimation(resize.resize);
        }
    }
}