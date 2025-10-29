import { ref, onMounted, onUnmounted } from 'vue'

export function useDarkMode() {
  // Initial state: Check the current preference when the composable is first called
  const isDarkMode = ref(window.matchMedia('(prefers-color-scheme: dark)').matches)

  // Variable to hold the MediaQueryList object for cleanup
  let mediaQueryList: MediaQueryList | null = null

  // Handler function to update the state when the system preference changes
  const handler = (e: MediaQueryListEvent) => {
    isDarkMode.value = e.matches
  }

  onMounted(() => {
    // Check if the browser supports the API
    if (window.matchMedia) {
      mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)')

      // Add the listener
      mediaQueryList.addEventListener('change', handler)
    }
  })

  onUnmounted(() => {
    // Clean up the listener when the component using this composable is unmounted
    if (mediaQueryList) {
      mediaQueryList.removeEventListener('change', handler)
    }
  })

  return { isDarkMode }
}
