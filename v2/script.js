function snail(_x, _y) {
    const x = _x;
    const y = _y;

    return function (n) {
        if (this.data === undefined) {
            this.data = Array();
        }
        if (this.data[n] === undefined) {
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
            this.data[n] = add;
        }
        return this.data[n];
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

const names = {
    r: snail(12, 9)
};
// const from = (n) => {
//     console.log('n', n);
//     const name = names[n];
//     console.log('name', name);
//     return {
//         x: name.x * ts,
//         y: name.y * ts
//     };
// };

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

function draw(tiles) {
    const width = ts * areaSize.width;
    const height = ts * areaSize.height;
    const canvas = document.getElementById('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, width, height);

    // const ground = snail(12, 8); // dark sand
    // const ground = snail(15, 8); // lava
    // const ground = snail(18, 8); // coal
    // const ground = snail(21, 8); // grass
    const ground = snail(24, 8); // beton
    for (let y = 0; y < areaSize.height; y++) {
        for (let x = 0; x < areaSize.width; x++) {
            const a = area[y][x];
            ctx.drawImage(tiles, ground(a).x * ts, ground(a).y * ts, ts, ts, x * ts, y * ts, ts, ts);
        }
    }

    // --------------------------------------------------
    // ctx.drawImage(tiles, ground(1).x * ts, ground(1).y * ts, ts, ts, 0 * ts, 0 * ts, ts, ts);
    // const top = ground(2);
    // const down = ground(6);
    // for (let i = 1; i < areaSize.width - 1; i++) {
    //     ctx.drawImage(tiles, top.x * ts, top.y * ts, ts, ts, i * ts, 0 * ts, ts, ts);
    //     ctx.drawImage(tiles, down.x * ts, down.y * ts, ts, ts, i * ts, (areaSize.height - 1) * ts, ts, ts);
    // }
    // ctx.drawImage(tiles, ground(3).x * ts, ground(3).y * ts, ts, ts, (areaSize.width - 1) * ts, 0 * ts, ts, ts);

    // const right = ground(4);
    // const left = ground(8);
    // for (let i = 1; i < areaSize.height - 1; i++) {
    //     ctx.drawImage(tiles, right.x * ts, right.y * ts, ts, ts, (areaSize.width - 1) * ts, i * ts, ts, ts);
    //     ctx.drawImage(tiles, left.x * ts, left.y * ts, ts, ts, 0 * ts, i * ts, ts, ts);
    // }
    // ctx.drawImage(tiles, ground(5).x * ts, ground(5).y * ts, ts, ts, (areaSize.width - 1) * ts, (areaSize.height - 1) * ts, ts, ts);
    // ctx.drawImage(tiles, ground(7).x * ts, ground(7).y * ts, ts, ts, 0 * ts, (areaSize.height - 1) * ts, ts, ts);

    // --------------------------------------------------
    // ctx.drawImage(tiles, ground(2).x * ts, ground(2).y * ts, ts, ts, 2 * ts, 0 * ts * 2, ts, ts);

    //     for (let y = 0; y < areaSize.height; y++) {
    //         for (let x = 0; x < areaSize.width; x++) {
    //             const s = from(area[y][x]);
    //             console.log('source', s);
    //             ctx.drawImage(tiles, s.x, s.y, ts, ts, x * ts, y * ts, ts, ts);
    //         }
    //     }
    //     // water
    //     ctx.drawImage(tiles, 21 * ts, 17 * ts, 3 * ts, 1 * ts, 100 - ts * 2, 100 - ts * 2, 3 * ts, 1 * ts);
    //     ctx.drawImage(tiles, 21 * ts, 17 * ts, 2 * ts, 1 * ts, 100 + ts, 100 - ts * 2, 2 * ts, 1 * ts);
    //     // wall
    //     ctx.drawImage(tiles, 21 * ts, 22 * ts, 5 * ts, 1 * ts, 100 - ts * 2, 100 - ts * 1, 5 * ts, 1 * ts);
    //     // waterfall
    //     ctx.drawImage(tiles, 21 * ts, 12 * ts, 3 * ts, 4 * ts, 100 - ts, 100 - ts, 3 * ts, 4 * ts);
    //     // rock cup
    //     ctx.drawImage(tiles, 17 * ts, 12 * ts, 1 * ts, 2 * ts, 100, 100 + ts, 1 * ts, 2 * ts);
    //     // head
    //     ctx.drawImage(tiles, 15 * ts, 12 * ts, 2 * ts, 3 * ts, 100 + ts * 2, 100, 2 * ts, 3 * ts);
}

// // run

(function () {
    loadImage('./../img/tiles.png').then(draw);
})();
