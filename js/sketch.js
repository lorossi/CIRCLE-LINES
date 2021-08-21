class Sketch extends Engine {
  preload() {
    this._recording = false;
    this._duration = 900;
    this._lines_num = 10;
    this._max_line_len = Math.PI;
    this._scl = 0.9;
  }

  setup() {
    // noise setup
    this._simplex = new SimplexNoise();
    // capturer setup
    if (this._recording) {
      this._capturer = new CCapture({ format: "png" });
    }
    this._capturer_started = false;
    // lines setup
    this._lines = [];
    for (let i = 0; i < this._lines_num; i++) {
      const r = (this.width / 2 * (i + 1)) / this._lines_num;
      this._lines.push(new Line(r, this._max_line_len, this._simplex));
    }
  }

  draw() {
    if (!this._capturer_started && this._recording) {
      this._capturer_started = true;
      this._capturer.start();
      console.log("%c Recording started", "color: green; font-size: 2rem");
    }

    const percent = (this.frameCount % this._duration) / this._duration;

    this.ctx.save();
    this.background("rgb(15, 15, 15)");
    this.ctx.translate(this.width / 2, this.height / 2);
    this.ctx.scale(this._scl, this._scl);

    this._lines.forEach(l => {
      l.move(percent);
      l.show(this.ctx);
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
}