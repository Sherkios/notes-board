<template>
  <header>
    <nav>
      <router-link to="/">Главная</router-link>
      <router-link to="/auth">Авторизация</router-link>
      <router-link to="/AllNotes">Все заметки</router-link>
    </nav>
  </header>
  <router-view/>
</template>

<script>
export default {
  setup () {
    

    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>