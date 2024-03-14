<template>
  <div class="wrapper users">
    <title-box>
      <template #default>Список пользователей</template>
      <template #button><my-button @click="showDialog('add')">Зарегестрировать пользователя +</my-button></template>
    </title-box>
    
    <div class="users__table table" v-if="users.length > 0">
      <div class="table__header">
        <div class="table__first td">
          <label class="table__th-checkbox checkbox" :class="{'parts' : !fullCheckedUser}">
            <input type="checkbox" :checked="checkedUser" @input="setGlobalCheckbox">

            <svg class="checkbox__choise" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.6663 3.5L5.24967 9.91667L2.33301 7" stroke="#005FF9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>

              <svg class="checkbox__parts" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.91699 7H11.0837" stroke="#005FF9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>

          </label>
          <div class="table__name">Имя и фамилия пользователя</div>
        </div>
        <div class="table__th td">Кол-во заметок</div>
        <div class="table__th td">Статус пользователя</div>
        <div class="table__th td">Роль</div>
        <div class="table__th td"></div>
      </div>
      <div class="table__body">
        <div class="table__element element" v-for="user in users" :key="user.id">
          <div class="element__first td">
            <label class="element__checkbox checkbox">
              <input type="checkbox" v-model="choisesUser[user._id]">

              <svg class="checkbox__choise" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.6663 3.5L5.24967 9.91667L2.33301 7" stroke="#005FF9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>


            </label>
            <div class="element__short-name short-name">
              <div class="short-name__text">{{ getShortName(user.firstName, user.lastName) }}</div>
            </div>
            <div class="element__name">{{ user.firstName + " " + user.lastName }}</div>
          </div>
          <div class="element__count-note td">{{ user.notes.length + " " + countForm(user.notes.length, ['заметка', 'заметки', 'заметок']) }}</div>
          <div class="element__status td">
            <!-- <my-select
            :user="user"
            :options="user.optionsStatus"
            @change-status="changeStatus"
            ></my-select> -->
          </div>
          <div class="element__role td">
            <my-select
            :user="user"
            :options="user.optionsRole"
            @change-status="changeStatus"
            ></my-select>
          </div>
          <div class="element__instrument td">
            <div 
            class="element__delete"
            @click="onDeleteUser(user.id)">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.5 5.00001H4.16667M4.16667 5.00001H17.5M4.16667 5.00001V16.6667C4.16667 17.1087 4.34226 17.5326 4.65482 17.8452C4.96738 18.1577 5.39131 18.3333 5.83333 18.3333H14.1667C14.6087 18.3333 15.0326 18.1577 15.3452 17.8452C15.6577 17.5326 15.8333 17.1087 15.8333 16.6667V5.00001H4.16667ZM6.66667 5.00001V3.33334C6.66667 2.89131 6.84226 2.46739 7.15482 2.15483C7.46738 1.84227 7.89131 1.66667 8.33333 1.66667H11.6667C12.1087 1.66667 12.5326 1.84227 12.8452 2.15483C13.1577 2.46739 13.3333 2.89131 13.3333 3.33334V5.00001M8.33333 9.16667V14.1667M11.6667 9.16667V14.1667" stroke="#FCFCFC" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div 
            class="element__redact"
            @click="setUpdateUserInDialog(user);showDialog('change')"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_436_466)">
                <path d="M14.167 2.5C14.3859 2.28113 14.6457 2.10752 14.9317 1.98906C15.2176 1.87061 15.5241 1.80965 15.8337 1.80965C16.1432 1.80965 16.4497 1.87061 16.7357 1.98906C17.0216 2.10752 17.2815 2.28113 17.5003 2.5C17.7192 2.71887 17.8928 2.97871 18.0113 3.26468C18.1297 3.55064 18.1907 3.85714 18.1907 4.16667C18.1907 4.4762 18.1297 4.7827 18.0113 5.06866C17.8928 5.35463 17.7192 5.61447 17.5003 5.83334L6.25033 17.0833L1.66699 18.3333L2.91699 13.75L14.167 2.5Z" stroke="#FCFCFC" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
                <defs>
                <clipPath id="clip0_436_466">
                <rect width="20" height="20" fill="white"/>
                </clipPath>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <my-dialog v-model:is-show="isShowDialog">
    <add-form
    v-if="typeDialog == 'add'"
    @hide="hideDialog"
    @create-user="createUser"></add-form>

    <change-form
    v-if="typeDialog == 'change'"
    v-model:userEl="updateUser"
    @hide="hideDialog"
    @update-user="onUpdateUser"></change-form>
  </my-dialog>

</template>

<script>
import CountForm from "@/mixins/CountForm";
import AddForm from "@/components/users/AddForm.vue";
import ChangeForm from "@/components/users/ChangeForm.vue";
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import Dialog from "@/mixins/Dialog";

export default {
  components: {
    AddForm,
    ChangeForm
  },
  data() {
    return {
      choisesUser: {},
      newUser: {
        firstName: "test",
        lastName: "test",
        gender: 'female',
      },
      users: {},
      updateUser: {},
    }
  },
  mixins: [
  CountForm,
  Dialog
  ],
  computed: {
    ...mapGetters({
      stateUsers: 'users/getUsers',
    }),
    checkedUser() {
      let check = false;
      for (const value of Object.values(this.choisesUser)) {
        if (value) {
          check = true;
        }
      }
      return check;
    },
    fullCheckedUser() {
      let full = true;
      for (const value of Object.values(this.choisesUser)) {
        if (value && full) {
          full = true;
        } else {
          return false
        }
      }
      return full
    },
  },
  methods: {
    ...mapActions({
      getUsers: 'users/getUser',
      upadateUsers: 'users/upadateUsers',
      deleteUser: 'users/deleteUser',
      createUser: 'users/createUser',
    }),
    getShortName(firstName = "", lastName = "") {
      return firstName.slice(0,1) + lastName.slice(0,1);
    },
    changeStatus(option, className, value, user) {
      option.current = value;
      option.currentClass= className;
      console.log(option, user)
      this.upadateUsers(user)
    },
    onDeleteUser(id) {
      this.deleteUser(id);
      delete this.choisesUser[id];
    },
    setGlobalCheckbox(e) {
      for (const key of Object.keys(this.choisesUser)) {
        this.choisesUser[key] = e.target.checked;
      }
    },
    setChoisesUsers() {
      for (const key in this.users) {
        this.choisesUser[this.users[key]._id] = (this.choisesUser[this.users[key]._id]) ? this.choisesUser[this.users[key]._id] : false;
      }
    },
    setOptionsRole() {
      for (const user of this.users) {
        let role = 'Пользователь';
        let color = 'green'

        // console.log(user);
        for (const userRole of user.roles) {
        // console.log(userRole);
          if (userRole.value == 'admin') {
            role = "Администратор";
            color = "blue";
          }
        }


      user.optionsRole = {
          current: role,
          currentClass: color,
          option: [
            {
              value: "Администратор",
              class: "blue"
            },
            {
              value: "Пользователь",
              class: "green",
            },
            
          ]
        }
      }

    },
    setUpdateUserInDialog(user) {
      this.updateUser = user;
    },
    onUpdateUser(user) {
      this.upadateUsers(user);
    }
  },
  
  async mounted() {
    this.users = await this.getUsers();
    this.setChoisesUsers();
    this.setOptionsRole();
  },
}
</script>

<style lang="scss" scoped>
.users {
  padding-top: 60px;

  &__table {
    margin-top: 38px;
  }
}

.table {
  border-radius: 8px;
  padding-bottom: 60px;
  overflow: hidden;

  color: var(--white);
  font-size: 12px;
  line-height: 1.5em;

  & .checkbox {
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;

    width: 20px;
    height: 20px;

    border-radius: 6px;
    border: 2px solid #D0D5DD;

    background-color: var(--white);
    outline: none;

    transition: all 0.5s ease;

    &__choise, &__parts {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      opacity: 0;
      transition: all 0.5s ease;
    }
    

    &:has(input[type='checkbox']:checked) {
      border: 2px solid var(--blue);
    }

    &:has(input[type='checkbox']:checked):not(.parts) .checkbox__choise {
      opacity: 1;
    }

    &:has(input[type='checkbox']:checked).parts .checkbox__parts {
      opacity: 1;
    }

    & input {
      display: none;
    }
  }

		&__header {
      display: flex;
      background-color: var(--gray);

      & > div {
        flex: 1 1 0;
      }
		}

		&__first {
      display: flex;
      gap: 12px;
		}

		&__th-checkbox {
      
		}

		&__name {
		}

		&__th {
		}

		&__body {
      font-size: 14px;
		}

		&__element {
		}
}
.td {
  padding: 12px 24px;
}
.element {
  
  display: flex;
  align-items: center;
  
  background-color: var(--gray);

  & > div {
    flex: 1 1 0;
  }
  &__first {
    display: flex;
    align-items: center;
    gap: 12px;
  }

		&__name {
		}

		&__checkbox {
		}

		&__count-note {
		}

		&__status {
		}

		&__role {
		}

		&__instrument {
      display: flex;
      justify-content: flex-end;
      gap: 4px;
      
      & > div {
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
      }
		}

		&__delete {
		}

		&__redact {
		}
}

.short-name {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--white);

  &__text {
    color: var(--blue);
  }
}

</style>