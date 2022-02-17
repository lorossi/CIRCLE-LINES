class Line {
  constructor(radius, min_len, max_len, noise) {
    this._r = radius;
    this._max_len = max_len;
    this._min_len = min_len;
    this._noise = noise;

    this._theta_scl = 0.1;
    this._len_scl = 0.5;
    // unique seed for each line
    this._seed = Math.random() * 1000;
    // width of each line
    this._line_width = 6;
    // noise octaves
    this._noise_depth = 2;
    // color aberration palette
    this._palette = ["#FF00FF", "#00FFFF", "#FFFFFF"];
    // color aberration position
    this._d_pos = [-1, 1, 0];
  }

  show(ctx, nx, ny) {
    // line rotation
    const theta =
      this._generateNoise(
        nx * this._theta_scl,
        ny * this._theta_scl,
        this._seed,
        0
      ) *
      (Math.PI * 20);

    // line length
    const len =
      this._generateNoise(
        nx * this._len_scl,
        ny * this._len_scl,
        0,
        this._seed
      ) *
      (this._max_len - this._min_len + this._min_len);

    ctx.save();
    ctx.rotate(theta);
    ctx.lineWidth = this._line_width;

    for (let i = 0; i < 3; i++) {
      ctx.save();
      ctx.strokeStyle = this._palette[i];
      ctx.fillStyle = this._palette[i];
      ctx.beginPath();
      ctx.arc(this._d_pos[i], this._d_pos[i], this._r, 0, len);
      ctx.stroke();

      ctx.rotate(Math.PI + len / 2);

      ctx.beginPath();
      ctx.arc(this._r, 0, this._line_width, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    ctx.restore();
  }

  _generateNoise(x = 0, y = 0, z = 0, w = 0) {
    let n = 0;
    let a_sum = 0;
    for (let i = 0; i < this._noise_depth; i++) {
      const f = Math.pow(2, i);
      const a = Math.pow(2, -i);
      a_sum += a;
      n += ((this._noise.noise4D(x * f, y * f, z * f, w * f) + 1) / 2) * a;
    }
    return n / a_sum;
  }
}
