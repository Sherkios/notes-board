<template>
  <div class="post">
    <div class="post__info">
      <div class="post__title">{{ post.title }}</div>
      <div class="post__text">{{ post.body }}</div>
    </div>
    <div class="post__bottom">
      <div class="post__buttons">
        <div class="post__button post__button_red" @click="$emit('show-remove-dialog', post.id)">Удалить</div>
        <div class="post__button" @click="$emit('show-change-dialog', post)">Изменить</div>
      </div>
      <div class="post__user user" v-if="isShowUser">
        <div class="user__icon">
          <div class="user__short-name">{{ shortName }}</div>
        </div>
        <div class="user__full-name">
          <div class="user__first-name">{{ firstName }}</div>
          <div class="user__last-name">{{ lastName }}</div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import GetUser from '@/mixins/GetUser';
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";

export default {
  mixins: [GetUser],
  props: {
    post: {
      type: Object,
      required: true,
    },
    isShowUser: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      user: {},
    }
  },
  computed: {
    firstName() {
      return this.user.firstName;
    },
    lastName() {
      return this.user.lastName;
    },
    shortName() {
      if (this.firstName != undefined) {
        return this.firstName.slice(0,1) + this.lastName.slice(0,1);        
      }
      return "";
    }
  },
  async mounted() {
    this.user = await this.getUserById(this.post.userId);
  }
}

</script>

<style lang="scss" scoped>
.post {
  padding: 24px 24px 32px 24px;
  
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;

  border-radius: 12px;
  box-shadow: 0 4px 6px -2px rgba(16, 24, 40, 0.03);

  background-color: var(--gray);
  
  &__info {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__title {
    color: var(--white);
    font-size: 24px;
    line-height: 32px;
  }

  &__text {
    color: #9A9A9A;
    font-size: 16px;
    line-height: 24px;
  }

  &__bottom {
    margin-top: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__buttons {
    display: flex;
    gap: 12px;
  }

  &__button {
    color: var(--white);
    font-size: 16px;
    line-height: 24px;

    cursor: pointer;

    &_red {
      color: var(--red);
    }
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
  &__full-name {
    color: var(--white);
  }
}

</style>