const ts = 32;

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
    function refresh(data) {
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(tiles, 0, 0, width, height, 0, 0, width, height);
        if (data !== undefined) {
            // fill
            ctx.fillStyle = 'rgba(0, 0, 0,.4)';
            ctx.fillRect(data.x * ts, data.y * ts, ts, ts);
            // border
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'red';
            ctx.strokeRect(data.x * ts, data.y * ts, ts, ts);
            // write
            ctx.font = '16px serif';
            ctx.fillStyle = 'lime';
            ctx.fillText(data.x.toString(), data.x * ts + 2, data.y * ts + 14);
            ctx.fillText(data.y.toString(), data.x * ts + 2, data.y * ts + 28);
        }
    }

    const { width, height } = tiles;
    const canvas = document.getElementById('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    refresh();

    function move(e) {
        const x = Math.floor(e.offsetX / ts);
        const y = Math.floor(e.offsetY / ts);
        refresh({ x, y });
        console.log(x, y);
    }

    canvas.addEventListener('mousemove', move);
}

// run

(function () {
    loadImage('./../img/tiles.png').then(draw);
})();
