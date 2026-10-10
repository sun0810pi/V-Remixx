// Web Audio API lightweight sound effects generator
let audioCtx: AudioContext | null = null;
let soundEnabled = true;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function toggleSound(enabled?: boolean): boolean {
  if (enabled !== undefined) {
    soundEnabled = enabled;
  } else {
    soundEnabled = !soundEnabled;
  }
  return soundEnabled;
}

export function isSoundEnabled(): boolean {
  return soundEnabled;
}

// Gentle tactile equip chime (inspired by traditional bamboo chimes & silk rustle)
export function playEquipSound(): void {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    // Pentatonic scale note (E5 ~ 659Hz or G5 ~ 784Hz)
    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, now); // D5
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.12); // A5

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.18);
  } catch {
    // Ignore audio failures silently
  }
}

// Subtle unequip / remove layer sound
export function playUnequipSound(): void {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(329.63, now + 0.1);

    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.12);
  } catch {
    // Ignore audio failures
  }
}

// Shutter sound for camera snapshot
export function playShutterSound(): void {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Click 1
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'square';
    osc1.frequency.setValueAtTime(1200, now);
    osc1.frequency.exponentialRampToValueAtTime(200, now + 0.04);
    gain1.gain.setValueAtTime(0.08, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.05);

    // Click 2 (shutter release)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'square';
    osc2.frequency.setValueAtTime(900, now + 0.06);
    osc2.frequency.exponentialRampToValueAtTime(150, now + 0.12);
    gain2.gain.setValueAtTime(0.08, now + 0.06);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.06);
    osc2.stop(now + 0.14);
  } catch {
    // Ignore audio failures
  }
}

// Success celebration chime
export function playCelebrationSound(): void {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    // Vietnamese traditional pentatonic chord arpeggio: C5 - D5 - E5 - G5 - A5
    const freqs = [523.25, 587.33, 659.25, 783.99, 880];
    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = now + idx * 0.06;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);
      gain.gain.setValueAtTime(0.06, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.35);
    });
  } catch {
    // Ignore audio failures
  }
}
