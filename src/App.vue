<template>
  <router-view/>
</template>

<script>
</script>

<style lang="scss">
:root {
  --main-dark: rgba(24, 24, 25, 1);
  --gray: rgba(42, 42, 43, 1);
  --blue: rgba(0, 95, 249, 1);
  --red: rgba(186, 1, 23, 1);
  --white: rgba(255, 255, 255, 1);
  --button-background-color: var(--blue);
  --button-color: var(--white);
}

body {
  font-family: Inter;
  background-color: var(--main-dark);
  line-height: normal;
}

.wrapper {
  padding: 0 40px;
  margin: 0 auto;
}

* {
  box-sizing: border-box;
}
</style>
