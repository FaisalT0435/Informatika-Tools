<template>
  <div ref="vantaRef" style="width:100vw; height:100vh; position:fixed; left:0; top:0; z-index:-1"></div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import { storeToRefs } from 'pinia';
import { useStyleStore } from '@/stores/style.store'; // ganti jika path-mu beda

const vantaRef = ref<HTMLDivElement | null>(null);
let vantaEffect: any = null;

// Ambil reactive dark/light dari store
const styleStore = useStyleStore();
const { isDarkTheme } = storeToRefs(styleStore);

// Parameter dinamis (boleh kamu ubah sesuai selera)
function getVantaProps() {
  if (isDarkTheme.value) {
    return {
      color: 0x1877a0,       // Biru, dark mode
      waveHeight: 25,
      shininess: 60,
    };
  } else {
    return {
      color: 0xa3e56,        // Hijau, light mode
      waveHeight: 15,
      shininess: 30,
    };
  }
}

function loadScript(src: string) {
  return new Promise<void>((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = reject;
    document.body.appendChild(script);
  });
}

async function initVanta() {
  await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js');
  await loadScript('https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.waves.min.js');
  // @ts-ignore
  if (window.VANTA && window.VANTA.WAVES && vantaRef.value) {
    // Destroy sebelumnya supaya nggak double
    if (vantaEffect) vantaEffect.destroy();
    // @ts-ignore
    vantaEffect = window.VANTA.WAVES({
      el: vantaRef.value,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      waveSpeed: 1,
      zoom: 1,
      ...getVantaProps(),
    });
  }
}

onMounted(initVanta);
onBeforeUnmount(() => { if (vantaEffect) vantaEffect.destroy(); });

// Watch theme, langsung update efek jika theme berubah
watch(isDarkTheme, () => {
  initVanta();
});
</script>
