<template>
  <div class="address-info" v-bind:class="{ active: $root.activeForm == 2 }">
    <label for="index">Индекс:</label>
    <input
      type="text"
      id="index"
      name="index"
      placeholder="Состоит из 6 цифр"
      @input="showErrorSpan('index', $event.target)"
    />

    <label for="city">Город:</label>
    <div class="form-group group">
      <input
        type="text"
        id="country"
        name="country"
        placeholder="Страна"
        @input="showErrorSpan('country', $event.target)"
      />
      <input
        type="text"
        id="region"
        name="region"
        placeholder="Область"
        @input="showErrorSpan('region', $event.target)"
      />
      <input
        type="text"
        id="city"
        name="city"
        placeholder="Город"
        @input="showErrorSpan('city', $event.target)"
        required
      />
    </div>

    <label for="city">Адрес:</label>
    <div class="form-group group">
      <input
        type="text"
        id="street"
        name="street"
        placeholder="Улица"
        @input="showErrorSpan('street', $event.target)"
      />
      <input
        type="text"
        id="house"
        name="house"
        placeholder="Дом"
        @input="showErrorSpan('house', $event.target)"
      />
    </div>
    <button-group />
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import ButtonGroup from "./ButtonGroup.vue";
import funcs from "./mixins/func";

export default {
  components: {
    ButtonGroup,
  },
  mixins: [funcs],
  data() {
    return {
      form: {
        index: "",
        country: "",
        region: "",
        city: "",
        street: "",
        house: "",
      },
      alerts: {},
    };
  },
  validations: {
    form: {
      index: { alpha: (val) => /^([0-9]{6})?$/i.test(val) },
      country: { alpha: (val) => /^[а-яё\s]*$/i.test(val) },
      region: { alpha: (val) => /^[а-яё\s]*$/i.test(val) },
      city: {
        required,
        alpha: (val) => /^[а-яё]*$/i.test(val),
      },
      street: { alpha: (val) => /^[а-яё\s]*$/i.test(val) },
      house: { alpha: (val) => /^[0-9]{0,4}$/i.test(val) },
    },
  },
};
</script>
