export default {
  data() {
    return {};
  },
  methods: {
    // Отображает сообщение о некорректности введенных данных, передает данные в form
    showErrorSpan(name, target) {
      console.log(this.form, name, target);
      var span = document.createElement("span");
      span.classList.add("alert");

      // Выбираем сообщение для подписи проблемы
      if (name != null) {
        span.innerText = this.alerts[name]
          ? this.alerts[name]
          : "Введите в правильном формате";

        console.log(target.value);

        this.$v.form[name].$touch();
        console.log(this.$v.form[name].$error);
      } else span.innerText = "Введите в правильном формате";

      // Передаем в form значения (кроме v-model полей)
      if (
        name != "bDate" &&
        name != "date" &&
        name != "sms" &&
        name != "phone" &&
        name != null
      )
        this.form[name] = target.value;

      // Ищем previosSibling для нашего span
      var rootEl = target.parentElement.classList.contains("group")
        ? target.parentElement.classList.contains("clm")
          ? target.parentElement.parentElement
          : target.parentElement
        : target;
      var re = rootEl;

      // Удаляем такие же предупреждения, как хотим добавить
      while (rootEl.nextSibling) {
        if (rootEl.nextSibling.tagName == "SPAN") {
          if (this.alerts != undefined)
            if (rootEl.nextSibling.innerText == this.alerts[name])
              rootEl.nextSibling.remove();
          if (rootEl.nextSibling.innerText == "Введите в правильном формате")
            rootEl.nextSibling.remove();
        } else break;
        rootEl = rootEl.nextSibling;
      }

      // Добавляем предупреждение
      if (name === null || this.$v.form[name].$error)
        re.parentElement.insertBefore(span, re.nextSibling);
    },

    // Показывает незаполненные обязательные поля перед отправкой формы или переходом
    checkRequired() {
      var requiredFields = document
        .getElementsByClassName("default-form")[0]
        .querySelectorAll(".active [required]");

      requiredFields.forEach((field) => {
        //console.log(field.value);
        if (
          field.value == null ||
          field.value == undefined ||
          !field.value ||
          field.value == "" ||
          field.value == "null"
        ) {
          console.log(field.value);
          this.showErrorSpan(null, field);
        }
      });
    },
  },
};
