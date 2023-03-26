<template>
  <div>
    <h1>Video Cutter Demo</h1>
    <video ref="videoPlayer" class="video-js vjs-default-skin vjs-big-play-centered" controls preload="auto"></video>
    <div>
      <button @click="play">Play</button>
      <button @click="pause">Pause</button>
      <button @click="stop">Stop</button>
    </div>
    <hr />
    <div>
      <button @click="startTrimming">Start Trimming</button>
      <button @click="endTrimming">End Trimming</button>
      <button @click="resetTrimming">Reset Trimming</button>
      <button @click="saveTrimmedVideo">Save Trimmed Video</button>
    </div>
  </div>
</template>

<script>
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
// import VideoCutter from 'video-cutter';

export default {
  name: 'VideoCutterDemo',
  data() {
    return {
      videoPlayer: null,
      videoCutter: null,
    };
  },
  mounted() {
    this.videoPlayer = videojs(this.$refs.videoPlayer);
    this.videoPlayer.src({
      type: 'video/mp4',
      src: '/video.mp4',
    });
    this.videoPlayer.on('play', this.handlePlay);
    this.videoPlayer.on('pause', this.handlePause);
    this.videoPlayer.on('stop', this.handleStop);
    this.videoCutter = new VideoCutter(this.videoPlayer);
  },
  methods: {
    handlePlay() {
      console.log('Playing...');
    },
    handlePause() {
      console.log('Paused.');
    },
    handleStop() {
      console.log('Stopped.');
    },
    play() {
      this.videoPlayer.play();
    },
    pause() {
      this.videoPlayer.pause();
    },
    stop() {
      this.videoPlayer.trigger('stop');
      this.videoPlayer.currentTime(0);
      this.videoPlayer.pause();
    },
    startTrimming() {
      this.videoCutter.startTrimming();
    },
    endTrimming() {
      this.videoCutter.endTrimming();
    },
    resetTrimming() {
      this.videoCutter.resetTrimming();
    },
    saveTrimmedVideo() {
      const blob = this.videoCutter.getTrimmedVideoBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'trimmed_video.mp4';
      link.click();
      URL.revokeObjectURL(url);
    },
  },
  beforeUnmount() {
    this.videoPlayer.dispose();
    this.videoCutter.dispose();
  },
};
</script>
