<template>
  <router-view/>
</template>

<script>
  import ToastMessages from '@/components/ToastMessages.vue';
  import emitter from '@/methods/eventBus';
  import $httpMessageState from '@/methods/pushMessageState';

export default {
  provide() {
    return {
      emitter,
      $httpMessageState,
    };
  },
  components: {
    ToastMessages,
  },
};
</script>

<style lang="scss">
@import '@/assets/all';
@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.0/font/bootstrap-icons.css');
</style>
