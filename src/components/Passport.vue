<template>
  <div class="passport-info" v-bind:class="{ active: $root.activeForm == 3 }">
    <label for="dtype">Тип документа:</label><br />
    <select
      id="dtype"
      name="dtype"
      v-model="form.type"
      @input="showErrorSpan('type', $event.target)"
      required
    >
      <option disabled value="null">Выберите один из вариантов</option>
      <option v-for="val in docTypesList" v-bind:key="val">{{ val }}</option>
    </select>

    <div class="two-clm">
      <div class="clm group">
        <label for="p-series">Серия:</label>
        <input
          type="text"
          id="p-series"
          name="series"
          placeholder="Состоит из 4 цифр"
          @input="showErrorSpan('series', $event.target)"
        />
      </div>

      <div class="clm group">
        <label for="p-number">Номер:</label>
        <input
          type="text"
          id="p-number"
          name="number"
          placeholder="Состоит из 6 цифр"
          @input="showErrorSpan('number', $event.target)"
        />
      </div>
    </div>

    <label for="p-issued">Кем выдан:</label>
    <input
      type="text"
      id="p-issued"
      name="issued"
      @input="showErrorSpan('issued', $event.target)"
    />

    <label for="p-date">Дата выдачи:</label>
    <div id="p-date-group" class="form-group group">
      <select
        id="p-date"
        name="p-date"
        v-model="date"
        @input="showErrorSpan('date', $event.target)"
        @change="initBDate('date', $event)"
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
        <option value="null" disabled selected>Месяц</option>
        <option
          v-for="i in Array.from({ length: 12 }, (_, i) => i + 1)"
          v-bind:key="i"
          >{{ i }}</option
        >
      </select>

      <select id="year" name="year" @change="getDatesArray()" v-model="year">
        <option value="null" disabled selected>Год</option>
        <option
          v-for="i in Array.from({ length: 121 }, (_, i) => i + 1901).reverse()"
          v-bind:key="i"
          >{{ i }}</option
        >
      </select>
    </div>
    <button-group />
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import ButtonGroup from "./ButtonGroup.vue";
import funcs from "./mixins/func";
import { date, phone } from "./mixins/formatFunc";
import { validateDate } from "./mixins/validators";

var docTypesList = [
  "Паспорт",
  "Свидетельство о рождении",
  "Вод. удостоверение",
];

export default {
  components: {
    ButtonGroup,
  },
  mixins: [funcs, date, phone],
  data() {
    return {
      form: {
        type: "Паспорт",
        series: "",
        number: "",
        issued: "",
        date: "",
      },
      alerts: {},
      docTypesList: docTypesList,
    };
  },
  validations: {
    form: {
      type: {
        required,
        alpha: (val) => docTypesList.includes(val),
      },
      series: { alpha: (val) => /^([0-9]{4})?$/i.test(val) },
      number: { alpha: (val) => /^([0-9]{6})?$/i.test(val) },
      issued: { alpha: (val) => /^[а-яё0-9\s]*$/i.test(val) },
      date: {
        required,
        validDate: (val) => validateDate(val),
      },
    },
  },
  methods: {},
  created() {
    this.getDatesArray();
  },
};
</script>
