class Sketch extends Engine {
  preload() {
    this._recording = false;
    this._duration = 900;
    this._lines_num = 11;
    this._max_line_len = Math.PI * 2;
    this._min_line_len = 0;
    this._scl = 0.8;
  }

  setup() {
    // noise setup
    this._noise = new SimplexNoise();
    // capturer setup
    if (this._recording) {
      this._capturer = new CCapture({ format: "png" });
    }

    // lines setup
    this._lines = [];
    for (let i = 0; i < this._lines_num; i++) {
      const r = ((this.width / 2) * (i + 1)) / this._lines_num;
      this._lines.push(
        new Line(r, this._min_line_len, this._max_line_len, this._noise)
      );
    }
  }

  draw() {
    if (!this._capturer_started && this._recording) {
      this._capturer_started = true;
      this._capturer.start();
      console.log("%c Recording started", "color: green; font-size: 2rem");
    }

    const percent = (this.frameCount % this._duration) / this._duration;
    const nx = 1 + Math.cos(percent * Math.PI * 2);
    const ny = 1 + Math.sin(percent * Math.PI * 2);

    // reset background
    this.ctx.save();
    this.background("rgb(15, 15, 15)");
    this.ctx.translate(this.width / 2, this.height / 2);
    this.ctx.scale(this._scl, this._scl);

    this.ctx.globalCompositeOperation = "screen";
    this._lines.forEach((l) => {
      l.show(this.ctx, nx, ny);
    });
    this.ctx.restore();

    if (this._recording) {
      if (this._frameCount < this._duration) {
        this._capturer.capture(this._canvas);
      } else {
        this._recording = false;
        this._capturer.stop();
        this._capturer.save();
        console.log("%c Recording ended", "color: red; font-size: 2rem");
      }
    }
  }

  click() {
    this.setup();
  }
}
