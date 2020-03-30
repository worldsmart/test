<template>
  <v-footer style="margin-top: 20px" padless>
    <v-col
      class="text-center"
      cols="12"
    >
      {{ new Date().getFullYear() }} — <strong>MDC©</strong>
    </v-col>
  </v-footer>
</template>

<script>
export default {
        name: 'Footer'
}
</script>