<template>
  <div class="h-[100px] flex items-center justify-center">
    <div class="loader"></div>
  </div>
</template>

<style scoped>
.loader {
  width: 48px;
  height: 48px;
  border: 5px solid #fff;
  border-bottom-color: #138b4d;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 0.5s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
