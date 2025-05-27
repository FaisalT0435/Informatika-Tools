<template>
  <div ref="vantaRef"
    style="width:100vw; height:100vh; position:fixed; left:0; top:0; z-index:-1">
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import { storeToRefs } from 'pinia';
import { useStyleStore } from '@/stores/style.store';

const vantaRef = ref<HTMLDivElement | null>(null);
let vantaEffect: any = null;

const styleStore = useStyleStore();
const { isDarkTheme } = storeToRefs(styleStore);

async function loadScript(src: string) {
  if (document.querySelector(`script[src="${src}"]`)) return;
  await new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = reject;
    document.body.appendChild(script);
  });
}

async function initVanta() {
  // Hapus efek sebelumnya
  if (vantaEffect) {
    vantaEffect.destroy();
    vantaEffect = null;
  }

  // Load THREE.js (sekali saja)
  await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js');

  // DARK: NET, LIGHT: BIRDS
  if (isDarkTheme.value) {
    await loadScript('https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js');
    // @ts-ignore
    if (window.VANTA?.NET && vantaRef.value) {
      // @ts-ignore
      vantaEffect = window.VANTA.NET({
        el: vantaRef.value,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0x3f9bff,
        backgroundColor: 0x0
      });
    }
  } else {
    await loadScript('https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.birds.min.js');
    // @ts-ignore
    if (window.VANTA?.BIRDS && vantaRef.value) {
      // @ts-ignore
      vantaEffect = window.VANTA.BIRDS({
        el: vantaRef.value,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        backgroundColor: 0xffffff,
        color1: 0xc21616,
        color2: 0x4a5ac,
        colorMode: "lerpGradient",
        birdSize: 1.2,
        wingSpan: 25.0,
        quantity: 4.0
      });
    }
  }
}

onMounted(initVanta);
onBeforeUnmount(() => { if (vantaEffect) vantaEffect.destroy(); });
watch(isDarkTheme, () => { initVanta(); });
</script>
