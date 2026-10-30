// All sounds are synthesized locally. No recordings, requests or system speech.
export class PostAudio {
  constructor(settings) {
    this.settings = settings;
    this.context = null;
    this.timer = null;
    this.step = 0;
  }
  async unlock() {
    if (!this.context) {
      const Context = window.AudioContext || window.webkitAudioContext;
      if (!Context) return;
      this.context = new Context();
      this.master = this.context.createGain();
      this.master.connect(this.context.destination);
    }
    if (this.context.state === "suspended")
      await this.context.resume().catch(() => {});
    this.master.gain.setTargetAtTime(
      this.settings.volume * 0.4,
      this.context.currentTime,
      0.04,
    );
  }
  tone(freq, delay = 0, duration = 0.12, type = "sine", volume = 0.4) {
    if (
      !this.context ||
      this.context.state !== "running" ||
      !this.settings.sound
    )
      return;
    const time = this.context.currentTime + delay;
    const osc = this.context.createOscillator();
    const gain = this.context.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, time);
    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(volume, time + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);
    osc.connect(gain);
    gain.connect(this.master);
    osc.start(time);
    osc.stop(time + duration + 0.015);
  }
  play(kind) {
    if (!this.settings.sound) return;
    if (kind === "letter")
      this.tone(330 + Math.random() * 130, 0, 0.045, "triangle", 0.15);
    if (kind === "erase") this.tone(200, 0, 0.045, "sine", 0.1);
    if (kind === "space") {
      this.tone(470, 0, 0.055, "triangle", 0.4);
      this.tone(700, 0.055, 0.08, "triangle", 0.25);
    }
    if (kind === "capital")
      [523, 659, 784].forEach((f, i) =>
        this.tone(f, i * 0.07, 0.22, "sine", 0.3),
      );
    if (kind === "punctuation") {
      this.tone(140, 0, 0.1, "triangle", 0.65);
      this.tone(1046, 0.08, 0.24, "sine", 0.3);
    }
    if (kind === "hint") {
      this.tone(660, 0, 0.18, "sine", 0.2);
      this.tone(880, 0.12, 0.2, "sine", 0.2);
    }
    if (kind === "check") this.tone(440, 0, 0.16, "sine", 0.18);
    if (kind === "wrong") {
      this.tone(294, 0, 0.09, "triangle", 0.22);
      this.tone(247, 0.075, 0.14, "sine", 0.18);
    }
    if (kind === "click") this.tone(550, 0, 0.08, "triangle", 0.15);
    if (kind === "deliver")
      [523, 659, 784, 1046, 987, 1046].forEach((f, i) =>
        this.tone(f, i * 0.13, 0.4, "triangle", 0.28),
      );
    if (kind === "train") {
      this.tone(784, 0, 0.22, "sine", 0.3);
      this.tone(1046, 0.24, 0.38, "sine", 0.3);
    }
  }
  startMusic() {
    if (this.timer) return;
    const melody = [
      523, 0, 659, 784, 0, 659, 587, 0, 523, 0, 440, 523, 0, 587, 392, 0,
    ];
    this.timer = setInterval(() => {
      if (!this.settings.music || !this.settings.sound || document.hidden)
        return;
      const note = melody[this.step++ % melody.length];
      if (note) this.tone(note, 0, 0.32, "sine", 0.055);
    }, 400);
  }
  sync(settings) {
    this.settings = settings;
    if (this.master)
      this.master.gain.setTargetAtTime(
        settings.volume * 0.4,
        this.context.currentTime,
        0.04,
      );
  }
  pause() {
    clearInterval(this.timer);
    this.timer = null;
    this.context?.suspend().catch(() => {});
  }
}
