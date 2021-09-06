<template>
  <div class="global-info">
    <label for="fio-group">ФИО:</label>
    <div id="fio-group" class="form-group group">
      <input
        type="text"
        id="l-name"
        name="lname"
        :value="form.lname"
        @input="showErrorSpan('lname', $event.target)"
        placeholder="Фамилия"
        required
      />

      <input
        type="text"
        id="f-name"
        name="fname"
        :value="form.fname"
        @input="showErrorSpan('fname', $event.target)"
        placeholder="Имя"
        required
      />

      <input
        type="text"
        id="patronymic"
        name="patronymic"
        :value="form.patronymic"
        @input="showErrorSpan('patronymic', $event.target)"
        placeholder="Отчество"
      />
    </div>

    <label>Дата рождения:</label>
    <div id="b-date-group" class="form-group group">
      <select
        id="date"
        name="date"
        v-model="date"
        @input="showErrorSpan('bDate', $event.target)"
        @change="initBDate('bDate', $event)"
        required
      >
        <option value="null" disabled selected>Дата</option>
        <option
          v-for="i in Array.from({ length: lastDay }, (_, i) => i + 1)"
          v-bind:key="i"
          >{{ i }}</option
        >
      </select>

      <select id="month" name="month" @change="getDatesArray()" v-model="month">
        <option value="null" disabled selected style="display:none;"
          >Месяц</option
        >
        <option
          v-for="i in Array.from({ length: 12 }, (_, i) => i + 1)"
          v-bind:key="i"
          >{{ i }}</option
        >
      </select>

      <select id="year" name="year" @change="getDatesArray()" v-model="year">
        <option value="null" disabled selected style="display:none;"
          >Год</option
        >
        <option
          v-for="i in Array.from({ length: 121 }, (_, i) => i + 1901).reverse()"
          v-bind:key="i"
          >{{ i }}</option
        >
      </select>
    </div>

    <label for="phone">Номер телефона:</label>
    <input
      type="phone"
      id="phone"
      name="phone"
      placeholder="7 (___) ___-__-__"
      v-on:keyup="formatPhone"
      @input="showErrorSpan('phone', $event.target)"
      required
    />

    <label for="sex">Пол:</label>
    <div class="rb-group group">
      <input
        type="radio"
        id="male"
        name="sex"
        value="male"
        class="nostyle-input"
        @input="showErrorSpan('sex', $event.target)"
      />

      <label for="male">Мужской</label>
      <input
        type="radio"
        id="female"
        name="sex"
        value="female"
        class="nostyle-input"
        @input="showErrorSpan('sex', $event.target)"
      />
      <label for="female">Женский</label>
    </div>
    <br />

    <div class="two-clm">
      <div class="clm group">
        <label for="cl-group">Группа клиентов:</label><br />
        <select
          id="cl-group"
          name="cl-group"
          multiple
          @change="showErrorSpan('clGroup', $event.target)"
          required
        >
          <option v-for="val in clTypesList" v-bind:key="val">{{ val }}</option>
        </select>
      </div>

      <div class="clm group">
        <label for="doctor">Лечащий врач:</label><br />
        <select
          id="doctor"
          name="doctor"
          v-model="form.doctor"
          @change="showErrorSpan('doctor', $event.target)"
        >
          <option disabled value="null">Выберите один из вариантов</option>
          <option v-for="val in doctorsList" v-bind:key="val"
            >{{ val }}
          </option>
        </select>
      </div>
    </div>

    <label for="sms">Не отправлять СМС:</label>
    <input
      type="checkbox"
      id="sms"
      name="sms"
      v-model="form.sms"
      class="nostyle-input"
      @change="showErrorSpan('sms', $event.target)"
    /><br />
    <button-group />
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import ButtonGroup from "./ButtonGroup.vue";
import funcs from "./mixins/func";
import { date, phone } from "./mixins/formatFunc";
import { validateDate } from "./mixins/validators";

var doctorsList = ["Иванов", "Захаров", "Чернышева"];
var clTypesList = ["VIP", "Проблемные", "ОМС"];
export default {
  components: {
    ButtonGroup,
  },
  mixins: [funcs, date, phone],
  data() {
    return {
      form: {
        lname: "",
        fname: "",
        patronymic: "",
        bDate: null,
        phone: null,
        sex: null,
        sms: true,
        clGroup: [],
        doctor: null,
      },
      alerts: {
        lname: "Фамилия должна содержать только русские буквы",
        fname: "Имя должно содержать только русские буквы",
        patronymic: "Отчество должно содержать только русские буквы",
        bDate: null,
        phone: "Телефон должен быть введен в формате 7 (***) ***-**-**",
        sex: null,
        clGroup: "Выберите из списка",
        index: "Индекс должен состоять из 6 цифр",
      },

      doctorsList: doctorsList,
      clTypesList: clTypesList,
    };
  },
  validations: {
    form: {
      fname: {
        required,
        alpha: (val) => /^[а-яё]*$/i.test(val),
      },
      lname: { required, alpha: (val) => /^[а-яё]*$/i.test(val) },
      patronymic: { alpha: (val) => /^[а-яё]*$/i.test(val) },
      bDate: {
        required,
        validDate: (val) => validateDate(val),
      },
      phone: {
        required,
        alpha: (val) => /^7[\d]{10}$/i.test(val),
      },
      sex: {
        alpha: (val) => ["male", "female", null].includes(val),
      },
      sms: {
        alpha: (val) => [true, false].includes(val),
      },
      clGroup: {
        $each: { alpha: (val) => clTypesList.includes(val) },
      },
      doctor: {
        alpha: (val) => val == null || doctorsList.includes(val),
      },
    },
  },
  methods: {},
  created() {
    console.log(this.$root.activeForm);
    this.getDatesArray();
  },
};
</script>
