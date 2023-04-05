<script lang="ts" setup>
import { ref } from 'vue';

const visible = ref(false);

function open() {
  visible.value = true;
}
function close() {
  visible.value = false;
}

defineExpose({
  open,
  close,
});
</script>

<template>
  <Teleport to="body" v-if="visible">
    <div class="n-modal" @click="close">
      <div class="modal-content bg-default br-3" @click.stop>
        <slot />
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
.n-modal {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>
