<template>
  <div class="container">
    <!-- <canvas id="canvas"></canvas> -->
    <img class="profile-pic" src="../assets/img/profile-pic.png">
  </div>
</template>

<script lang="ts" setup>
  // const image = new Image();
  // image.src = '../assets/img/profile-pic.png';

  // image.onload = function() {
  //   const canvas = document.createElement('canvas');
  //   const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  //   canvas.width = image.width;
  //   canvas.height = image.height;

  //   ctx.imageSmoothingEnabled = false;
  //   ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);
  //   ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width * 0.1, canvas.height * 0.1);

  //   document.body.appendChild(canvas);
  // }
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;

  .profile-pic {
    width: 500px;
    height: 500px;
    // Top-left, top-right, bottom-right, bottom-left
    clip-path: polygon(0 0, 50% 0, 50% 100%, 0 100%);
    // filter: sepia(100%);
    image-rendering: pixelated;
    // transform: scale(100);
  }
}
</style>