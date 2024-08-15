import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useWindowSizeStore = defineStore("windowSize", () => {
  const windowSize = ref(window.innerWidth);

  const setWindowSize = (newWindowSize: number) => {
    windowSize.value = newWindowSize;
  };

  const isMobile = computed(() => windowSize.value < import.meta.env.VITE_MOBILE_SIZE);

  return {
    windowSize,
    setWindowSize,
    isMobile,
  };
});
