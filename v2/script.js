function snail(_x, _y, hash = undefined) {
    const x = _x;
    const y = _y;

    return function (n) {
        if (this.data === undefined) {
            console.log('reset');
            this.data = {};
        }
        const name = `${hash}${n}`;
        if (this.data[name] === undefined) {
            let add = { x: 0, y: 0 };
            switch (n) {
                case 1:
                    add = { x, y };
                    break;
                case 2:
                    add = { x: x + 1, y };
                    break;
                case 3:
                    add = { x: x + 2, y };
                    break;
                case 4:
                    add = { x: x + 2, y: y + 1 };
                    break;
                case 5:
                    add = { x: x + 2, y: y + 2 };
                    break;
                case 6:
                    add = { x: x + 1, y: y + 2 };
                    break;
                case 7:
                    add = { x: x, y: y + 2 };
                    break;
                case 8:
                    add = { x: x, y: y + 1 };
                    break;
                case 9:
                    add = { x: x + 1, y: y + 1 };
                    break;
                default:
                    throw new Error(`Something wong wrong[${n}]`);
            }
            this.data[name] = add;
        }
        return this.data[name];
    };
}

const area = [
    [1, 2, 2, 2, 2, 2, 2, 2, 3],
    [8, 9, 9, 9, 9, 9, 9, 9, 4],
    [8, 9, 9, 9, 9, 9, 9, 9, 4],
    [8, 9, 9, 9, 9, 9, 9, 9, 4],
    [8, 9, 9, 9, 9, 9, 9, 9, 4],
    [8, 9, 9, 9, 9, 9, 9, 9, 4],
    [8, 9, 9, 9, 9, 9, 9, 9, 4],
    [8, 9, 9, 9, 9, 9, 9, 9, 4],
    [7, 6, 6, 6, 6, 6, 6, 6, 5]
];

const ts = 32;
const areaSize = {
    height: area.length,
    width: area[0].length
};

async function loadImage(src) {
    return new Promise((response, reject) => {
        var image = new Image();
        image.referrerPolicy = 'no-referrer-when-downgrade';
        image.src = src;
        image.onload = () => {
            response(image);
        };
        image.onerror = reject;
    });
}

const regions = [
    { x: 12, y: 2 },
    { x: 15, y: 2 },
    { x: 18, y: 2 },
    { x: 21, y: 2 },
    { x: 24, y: 2 },
    { x: 27, y: 2 },
    { x: 12, y: 8 },
    { x: 15, y: 8 },
    { x: 18, y: 8 },
    { x: 21, y: 8 },
    { x: 24, y: 8 },
    { x: 0, y: 11 },
    { x: 3, y: 11 },
    { x: 6, y: 11 },
    { x: 9, y: 11 },
    { x: 5, y: 17 },
    { x: 8, y: 21 },
    { x: 0, y: 22 },
    { x: 3, y: 22 },
    { x: 0, y: 28 },
    { x: 3, y: 28 },
    { x: 6, y: 26 },
    { x: 16, y: 23 },
    { x: 19, y: 23 },
    { x: 16, y: 26 },
    { x: 20, y: 26 },
    { x: 16, y: 29 },
    { x: 21, y: 29 }
];

const max = regions.length - 1;

let drawWithRegion;

function draw(tiles) {
    const width = ts * areaSize.width;
    const height = ts * areaSize.height;
    const canvas = document.getElementById('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    drawWithRegion = function (n) {
        n = Math.min(Math.max(0, n), max);
        select.value = n;
        console.log('region:', n);
        const zeroTail = regions[n];
        const ground = snail(zeroTail.x, zeroTail.y, n);
        ctx.clearRect(0, 0, width, height);

        for (let y = 0; y < areaSize.height; y++) {
            for (let x = 0; x < areaSize.width; x++) {
                const a = area[y][x];
                ctx.drawImage(tiles, ground(a).x * ts, ground(a).y * ts, ts, ts, x * ts, y * ts, ts, ts);
            }
        }
    };

    const region = Math.floor(max * Math.random());
    drawWithRegion(region);

    select.addEventListener('input', function (e) {
        drawWithRegion(select.value);
    });
    document.getElementById('up').addEventListener('click', function (e) {
        drawWithRegion(1 + parseInt(select.value));
    });
    document.getElementById('down').addEventListener('click', function (e) {
        drawWithRegion(-1 + parseInt(select.value));
    });
}

// // run

let select;
window.onload = function () {
    select = document.getElementById('select');
    console.log('select', select);
    for (let i = 0; i <= max; i++) {
        const option = document.createElement('option');
        option.setAttribute('value', i);
        option.innerHTML = i;
        select.appendChild(option);
    }
    loadImage('./../img/tiles.png').then(draw);
};
