<template>
  <div class="button-group">
    <button class="back" v-if="$root.activeForm > 1" @click="move('-')">
      Назад
    </button>
    <button
      class="next"
      type="button"
      v-if="$root.activeForm < 3"
      @click="move('+')"
    >
      Далее
    </button>
    <button type="submit" v-if="$root.activeForm == 3" @click="submit()">
      Отправить форму
    </button>
  </div>
</template>

<script>
import funcs from "./mixins/func";

// Обеспечиваем навигацию по страницам и submit
export default {
  mixins: [funcs],
  methods: {
    // Проверяем верность введенных на этапе данных, выводим предупреждения, пересылаем данные в корневое хранилище
    move(group) {
      if (group === "+") {
        this.$parent.$v.$touch();
        if (this.$parent.$v.$invalid) {
          console.log(this.$parent.$v);
          this.checkRequired();
        } else {
          this.commitFormChanges();
          this.$root.activeForm += 1;
        }
      } else {
        this.undoChanges();
        this.$root.activeForm -= 1;
      }
    },

    // Пересылаем данные заполненной страницы в корневое хранилище
    commitFormChanges() {
      if (this.$root.activeForm === 1) this.$root.form = this.$parent.form;
      else if (this.$root.activeForm === 2)
        this.$root.form["address"] = this.$parent.form;
      else if (this.$root.activeForm === 3)
        this.$root.form["passport"] = this.$parent.form;
      console.log(this.$root.form);
    },

    // Удаляем данные страницы при переходе назад
    undoChanges() {
      if (this.$root.activeForm === 2) this.$root.form["address"] = null;
      else if (this.$root.activeForm === 3) this.$root.form["passport"] = null;
      console.log(this.$root.form);
    },
    submit() {
      this.$parent.$v.$touch();
      if (this.$parent.$v.$invalid) {
        this.checkRequired();
      } else {
        this.commitFormChanges();
        alert("Можете посмотреть параметры вашей форма в консоли разработчика");
      }
    },
  },
};
</script>

<style lang="scss">
.button-group {
  width: calc(100% - 100px);
  height: 50px;
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 50px;
  left: 50px;

  @media screen and (max-width: 767px) {
    position: relative;
    width: 100%;
    left: 0;
    bottom: 0;
  }

  button {
    transition: 0.2s;
    flex: 1;
    background-color: var(--input-border-focus);
    border: 1px solid;
    border-radius: 6px;
    color: white;
    font-size: 1.2rem;
    &.back {
      max-width: 48%;
      margin-right: 4%;
    }
    &:focus {
      background-color: var(--input-border);
    }
    transition: 1s;
  }
}
</style>
