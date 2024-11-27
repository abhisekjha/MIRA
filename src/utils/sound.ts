import { Howl } from 'howler';

// Sound preloader to ensure sounds are ready before playing
class SoundManager {
  private sounds: Record<string, Howl>;
  private initialized: boolean = false;

  constructor() {
    this.sounds = {
      portal: new Howl({
        src: ['https://assets.codepen.io/154874/portal.mp3'],
        volume: 0.5,
        preload: true,
        onload: () => this.checkInitialization(),
        onloaderror: () => console.warn('Failed to load portal sound')
      }),
      hover: new Howl({
        src: ['https://assets.codepen.io/154874/hover.mp3'],
        volume: 0.2,
        preload: true,
        onload: () => this.checkInitialization(),
        onloaderror: () => console.warn('Failed to load hover sound')
      }),
      click: new Howl({
        src: ['https://assets.codepen.io/154874/click.mp3'],
        volume: 0.3,
        preload: true,
        onload: () => this.checkInitialization(),
        onloaderror: () => console.warn('Failed to load click sound')
      }),
      close: new Howl({
        src: ['https://assets.codepen.io/154874/close.mp3'],
        volume: 0.4,
        preload: true,
        onload: () => this.checkInitialization(),
        onloaderror: () => console.warn('Failed to load close sound')
      })
    };
  }

  private checkInitialization() {
    this.initialized = Object.values(this.sounds).every(sound => sound.state() === 'loaded');
  }

  public play(name: keyof typeof this.sounds) {
    try {
      // Check user preferences
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      // Check if sound exists and is loaded
      const sound = this.sounds[name];
      if (!sound || !this.initialized) return;

      // Play the sound
      sound.play();
    } catch (error) {
      console.warn(`Failed to play sound: ${name}`, error);
    }
  }

  public stop(name: keyof typeof this.sounds) {
    try {
      const sound = this.sounds[name];
      if (sound) {
        sound.stop();
      }
    } catch (error) {
      console.warn(`Failed to stop sound: ${name}`, error);
    }
  }
}

export const soundManager = new SoundManager();

export function playSound(name: Parameters<SoundManager['play']>[0]) {
  soundManager.play(name);
}

export function stopSound(name: Parameters<SoundManager['stop']>[0]) {
  soundManager.stop(name);
}