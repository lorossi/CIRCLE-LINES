class Sketch extends Engine {
  preload() {
    this._recording = false;
    this._duration = 900;

  }

  setup() {
    // noise setup
    this._simplex = new SimplexNoise();
    // capturer setup
    if (this._recording) {
      this._capturer = new CCapture({ format: "png" });
    }
    this._capturer_started = false;
  }

  draw() {
    if (!this._capturer_started && this._recording) {
      this._capturer_started = true;
      this._capturer.start();
      console.log("%c Recording started", "color: green; font-size: 2rem");
    }


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