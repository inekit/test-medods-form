//  Содержит функции визуализации полей форм
export const date = {
  data() {
    return {
      date: null,
      month: null,
      year: null,
      lastDay: null,
    };
  },
  methods: {
    // Узнаем, сколько дней в месяце
    getDatesArray() {
      var year = this.year == null ? new Date().getYear() + 1900 : this.year;
      var month = this.month == null ? new Date().getMonth() + 1 : this.month;

      var date1 = new Date(year, parseInt(month) - 1, 1);
      var date2 = new Date(year, parseInt(month), 1);

      this.lastDay = Math.round((date2 - date1) / 1000 / 3600 / 24);
    },

    // Преобразуем значения из селекторов в дату в текстовом виде
    initBDate(name, e) {
      console.log(1);
      this.year = this.year == null ? new Date().getYear() + 1900 : this.year;
      this.month = this.month == null ? new Date().getMonth() + 1 : this.month;
      this.form[name] = this.date + "." + this.month + "." + this.year;
      console.log(this.form[name]);
      this.showErrorSpan(name, e.target);
    },
  },
};

export const phone = {
  data() {
    return {
      formattedPhone: "",
    };
  },
  methods: {
    formatPhone(e) {
      if ((e.key >= 0 && e.key <= 9) || e.key === "Backspace") {
        var number = e.target.value;
        number = number[0] != "7" ? "7" + number : number;

        number = number.replace(/[^\d]/g, "");

        number = number.substr(0, 11);
        this.form.phone = number;

        var ptrn =
          number.length < 2
            ? "$1"
            : number.length < 4
            ? "$1 ($4)"
            : number.length < 7
            ? "$1 ($2) $4"
            : number.length < 9
            ? "$1 ($2) $3-$4"
            : "$1 ($2) $3-$4-$5";
        number = number.replace(
          /(\d{1})(\d{3})?(\d{3})?(\d{1,2})?(\d{2})?/,
          ptrn
        );
        if (e.key != "Backspace") e.target.value = number;
        this.formattedPhone = number;
        console.log(number);
      } else if (
        e.target.value != this.formattedPhone &&
        e.key != "Backspace"
      ) {
        console.log(e.key);
        e.target.value = this.formattedPhone;
      }
    },
  },
};
