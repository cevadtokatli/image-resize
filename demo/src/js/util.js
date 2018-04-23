export default class Util {
    static openOpacityAnimation(elm) {
        return new Promise(resolve => {
            requestAnimationFrame(() => {
                elm.classList.add('active');

                requestAnimationFrame(() => {
                    elm.classList.add('animation-active');

                    var callback = () => {
                        elm.removeEventListener('transitionend', callback, true);
                        resolve();
                    };
                    elm.addEventListener('transitionend', callback, true);
                });
            });
        });
    }

    static closeOpacityAnimation(elm) {
        return new Promise(resolve => {
            elm.classList.remove('animation-active');

            var callback = () => {
                elm.removeEventListener('transitionend', callback, true);
                elm.classList.remove('active');
                resolve();
            };
            elm.addEventListener('transitionend', callback, true);
        });
    }
}