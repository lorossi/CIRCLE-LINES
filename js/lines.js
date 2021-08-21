class Line {
  constructor(radius, min_len, max_len, simplex) {
    this._r = radius;
    this._max_len = max_len;
    this._min_len = min_len;
    this._simplex = simplex;

    this._theta = 0;
    this._theta_scl = 0.04;
    this._len_scl = 0.1;
    this._seed = Math.random() * 1000;
    this._line_width = 8;

    this._aberration = [
      {
        dx: -this._line_width / 3,
        dy: 0,
        color: new Color(255, 0, 0, 0.5),
      },
      {
        dx: this._line_width / 3,
        dy: 0,
        color: new Color(255, 255, 0, 0.5),
      },
      {
        dx: 0,
        dy: -this._line_width / 3,
        color: new Color(0, 0, 255, 0.8),
      },
      {
        dx: 0,
        dy: 0,
        color: new Color(240, 240, 240, 1),
      }
    ];
  }

  move(percent) {
    const nx = 1 + Math.cos(percent * Math.PI * 2);
    const ny = 1 + Math.sin(percent * Math.PI * 2);

    let n;
    n = this._noise(nx * this._theta_scl, ny * this._theta_scl, this._seed, 0);
    this._theta = n * Math.PI * 2 * 10;

    n = this._noise(nx * this._len_scl, ny * this._len_scl, 0, this._seed);
    this._len = n * (this._max_len - this._min_len) + this._min_len;
  }

  show(ctx) {
    ctx.save();

    ctx.save();
    ctx.rotate(this._theta);
    ctx.lineWidth = 8;

    this._aberration.forEach(c => {
      ctx.save();
      ctx.translate(c.dx, c.dy);
      ctx.strokeStyle = c.color.rgba;
      ctx.beginPath();
      ctx.arc(0, 0, this._r, 0, this._len);
      ctx.stroke();
      ctx.restore();
    });
    ctx.restore();

    ctx.rotate(this._theta + Math.PI + this._len / 2);

    this._aberration.forEach(c => {
      ctx.save();
      ctx.translate(c.dx, c.dy);
      ctx.fillStyle = c.color.rgba;
      ctx.beginPath();
      ctx.arc(this._r, 0, this._line_width, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    ctx.restore();
  }

  _noise(x = 0, y = 0, z = 0, w = 0) {
    return (this._simplex.noise4D(x, y, z, w) + 1) / 2;
  }
}