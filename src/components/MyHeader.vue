<template>
  <header class="header">
    <div class="wrapper header__wrapper">
      <div class="header__left">
        <router-link to="/" class="header__logo">noty</router-link>
        <nav class="header__nav nav" v-if="isAdmin">
          <router-link to="allNotes" class="nav__link">Заметки пользователей</router-link>
          <router-link to="users" class="nav__link">Пользователи</router-link>
        </nav>
      </div>
      
      <div class="header__user user">
        <div class="user__icon">
          <div class="user__short-name">{{ shortName }}</div>
        </div>
        <div class="user__info">
          <div class="user__name">{{ fullName }}</div>
          <div class="user__email">{{ email }}</div>
        </div>
        <div class="user__logout" @click="logOut">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.5 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H7.5M13.3333 14.1667L17.5 10M17.5 10L13.3333 5.83333M17.5 10H7.5" stroke="#FCFCFC" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
export default {
  setup () {
    return {}
  },
  methods: {
    ...mapActions({
      logOut: 'auth/logOut',
    }),
  },
  computed: {
    ...mapGetters({
      fullName: 'auth/fullName',
      shortName: 'auth/shortName',
      isAdmin: 'auth/isAdmin',
    }),
    ...mapState({
      email: state => state.auth.email
    })
  }
}
</script>

<style lang="scss" scoped>
.header {
  padding: 16px 0;
  color: var(--white);
  border-bottom: 1px solid var(--gray);

  &__wrapper {
    display: flex;
    justify-content: space-between;
  }
  &__left {
    display: flex;
    align-items: center;
    gap: 64px;
  }

  &__logo {
    font-size: 24px;
    line-height: 28px;
    text-transform: uppercase;
    text-decoration: none;
  }

  &__nav {
    
  }

  &__user {
  }
}
.nav {
  display: flex;
  gap: 32px;

  &__link {
    font-size: 16px;
    line-height: 24px;
  }
}
.user {
  display: flex;
  align-items: center;
  gap: 12px;

  font-size: 16px;
  line-height: 24px;

  &__icon {
    --diametr: 48px;
    width: var(--diametr);
    height: var(--diametr);
    border-radius: 50%;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: var(--white);
  }

  &__short-name {
    color: var(--blue);
    font-size: 18px;
    line-height: 28px;
    text-transform: uppercase;
  }

  &__info {
    margin-right: 8px;
  }

  &__name {
  }

  &__email {
  }

  &__logout {
    align-self: flex-start;
    cursor: pointer;
  }
}

</style>
