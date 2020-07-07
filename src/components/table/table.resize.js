import {$} from '@core/dom';

export function resizeHandler($root, e) {
    const $resizer = $(e.target);
    const resizeType = $resizer.data.resize;
    const $parent = $resizer.closest('[data-type="resizable"]');
    const cords = $parent.getCoords();
    let value;

    if (resizeType === 'col') {
        document.onmousemove = e => {
            const delta = e.pageX - cords.right;

            value = delta + cords.width;
            $resizer.css({
                right: -delta + 'px',
                opacity: 1,
                bottom: '-100vh'
            });
        };
    } else {
        document.onmousemove = e => {
            const delta = e.pageY - cords.bottom;
            $resizer.css({
                bottom: -delta + 'px',
                opacity: 1,
                right: '-100vw'
            });

            value = delta + cords.height;
        };
    }

    document.onmouseup = () => {
        if (resizeType === 'col') {
            $root
                .findAll(`[data-col="${$parent.data.col}"]`)
                .forEach(node => $(node).css({width: value + 'px'}));
        } else {
            $parent.css({height: value + 'px'});
        }

        $resizer.css({
            right: 0,
            opacity: 0,
            bottom: 0
        });

        document.onmousemove = null;
        document.onmouseup = null;
    };
}