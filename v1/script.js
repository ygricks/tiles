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
    1: { x: 24, y: 2 },
    2: { x: 25, y: 2 },
    3: { x: 26, y: 2 },
    4: { x: 26, y: 3 },
    5: { x: 26, y: 4 },
    6: { x: 25, y: 4 },
    7: { x: 24, y: 4 },
    8: { x: 24, y: 3 },
    9: { x: 25, y: 3 }
};
const from = (n) => {
    console.log('n', n);
    const name = names[n];
    console.log('name', name);
    return {
        x: name.x * ts,
        y: name.y * ts
    };
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

function draw(tiles) {
    const width = ts * areaSize.width;
    const height = ts * areaSize.height;
    const canvas = document.getElementById('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, width, height);

    for (let y = 0; y < areaSize.height; y++) {
        for (let x = 0; x < areaSize.width; x++) {
            const s = from(area[y][x]);
            console.log('source', s);
            ctx.drawImage(tiles, s.x, s.y, ts, ts, x * ts, y * ts, ts, ts);
        }
    }

    // water
    ctx.drawImage(tiles, 21 * ts, 17 * ts, 3 * ts, 1 * ts, 100 - ts * 2, 100 - ts * 2, 3 * ts, 1 * ts);
    ctx.drawImage(tiles, 21 * ts, 17 * ts, 2 * ts, 1 * ts, 100 + ts, 100 - ts * 2, 2 * ts, 1 * ts);
    // wall
    ctx.drawImage(tiles, 21 * ts, 22 * ts, 5 * ts, 1 * ts, 100 - ts * 2, 100 - ts * 1, 5 * ts, 1 * ts);
    // waterfall
    ctx.drawImage(tiles, 21 * ts, 12 * ts, 3 * ts, 4 * ts, 100 - ts, 100 - ts, 3 * ts, 4 * ts);
    // rock cup
    ctx.drawImage(tiles, 17 * ts, 12 * ts, 1 * ts, 2 * ts, 100, 100 + ts, 1 * ts, 2 * ts);
    // head
    ctx.drawImage(tiles, 15 * ts, 12 * ts, 2 * ts, 3 * ts, 100 + ts * 2, 100, 2 * ts, 3 * ts);
}

// run

(function () {
    loadImage('./../img/tiles.png').then(draw);
})();
