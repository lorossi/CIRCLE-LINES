class Line {
  constructor(radius, max_len, simplex) {
    this._r = radius;
    this._max_len = max_len;
    this._simplex = simplex;

    this._theta = 0;
    this._theta_scl = 0.04;
    this._len_scl = 0.1;
    this._seed = Math.random() * 1000;
  }

  move(percent) {
    const nx = 1 + Math.cos(percent * Math.PI * 2);
    const ny = 1 + Math.sin(percent * Math.PI * 2);

    let n;
    n = this._noise(nx * this._theta_scl, ny * this._theta_scl, this._seed, 0);
    this._theta = n * Math.PI * 2 * 10;

    n = this._noise(nx * this._len_scl, ny * this._len_scl, 0, this._seed);
    this._len = n * this._max_len;
  }

  show(ctx) {
    ctx.save();
    ctx.rotate(this._theta);
    ctx.strokeStyle = "rgb(245, 245, 245)";
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(0, 0, this._r, 0, this._len);
    ctx.stroke();
    ctx.restore();
  }

  _noise(x = 0, y = 0, z = 0, w = 0) {
    return (this._simplex.noise4D(x, y, z, w) + 1) / 2;
  }
}