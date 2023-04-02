<script lang="ts" setup></script>

<template>
  <div class="header-layout f fd-col">
    <header class="p-3 bg-default">
      <h1>Тестирование ЕГЭ</h1>
    </header>

    <div class="p-3 f jc-c">
      <main class="bg-default p-3 br-3">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header-layout {
  width: 100%;
  flex-grow: 1;
  main {
    max-width: 1024px;
    flex-grow: 1;
  }
}
</style>
