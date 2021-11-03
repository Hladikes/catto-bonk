export class Sound {
  
  constructor(src, volume = 1, loop = false) {
    this.audio = document.createElement('audio');
    this.audio.src = src;
    this.audio.setAttribute('preload', 'auto');
    this.audio.setAttribute('controls', 'none');

    if (loop) this.audio.setAttribute('loop', 'none');
    
    this.audio.style.display = 'none';
    this.audio.volume = volume
    document.body.appendChild(this.audio);

    this.defaultVolume = volume
    this.isPlaying = false
  }

  play() {
    
    this.audio.currentTime = 0
    this.audio.play()
    this.isPlaying = true
  }

  stop() {
    this.audio.pause()
    this.isPlaying = false
  }

  mute() {
    this.audio.volume = 0
  }

  unmute() {
    this.audio.volume = this.defaultVolume
  }

  setVolume(vol) {
    this.audio.volume = vol
  }

}
