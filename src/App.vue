<template>
  <div id="app" class="home">
    <form class="default-form" @submit="$event.preventDefault()">
      <main-info v-bind:class="{ active: $root.activeForm == 1 }" />
      <Address v-bind:class="{ active: $root.activeForm == 2 }" />
      <passport v-bind:class="{ active: $root.activeForm == 3 }" />
    </form>
  </div>
</template>

<script>
import MainInfo from "./components/MainInfo.vue";
import Address from "./components/Address.vue";
import Passport from "./components/Passport.vue";
export default {
  name: "App",
  components: {
    MainInfo,
    Passport,
    Address,
  },
  data() {
    return {
      passportDate: null,
      form: {
        MainInfo: {},
        address: {},
        passport: {},
      },
      alerts: {
        index: "Индекс должен состоять из 6 цифр",
      },
    };
  },
};
</script>

<style lang="scss">
.two-clm,
.three-clm {
  @media screen and (min-width: 768px) {
    display: flex;
    justify-content: space-between;
    & > * {
      display: block;
      flex: 1;
      max-width: 48%;
      & > input,
      select {
        margin-top: 10px;
      }
    }
  }
  @media screen and (max-width: 768px) {
    & > div.clm {
      & > * {
        margin: 15px 0;
      }
    }
  }
}

.three-clm {
  @media screen and (min-width: 768px) {
    & > * {
      max-width: 31%;
    }
  }
}

.default-form > div {
  transition: 0.3s;
  position: absolute;
  top: 50%;
  left: 40%;
  display: none;
  transform: translate(-50%, -50%);
  background: #f5f9ff;
  border-radius: 10px;
  padding: 50px;

  width: 40%;
  min-width: 400px;
  max-width: 800px;
  height: calc(100vh - 200px);

  @media screen and (max-width: 767px) {
    min-width: unset;
    width: 80%;
    padding: 10%;
    top: 0;
    left: 0 !important;
    transform: unset;
    height: fit-content;
    min-height: 100%;
  }

  &.active ~ div {
    left: 70%;
  }
  &.active {
    left: 50%;
    display: block;
  }
  & > *:not(:last-child):not(input:not(.nostyle-input), span, button),
  & > input,
  & > select {
    margin: 10px 0 20px 0;
  }
  & > label,
  & > div.two-clm label {
    color: var(--label-color);
    margin: 0 20px !important;
  }

  &:not(.button-group) {
    .form-group {
      width: 100%;
    }
    &.active {
      display: block;
    }
  }
}

input:not(.nostyle-input),
select {
  width: calc(100% - 34px);
  display: block;
  padding: 8px 16px;
  line-height: 25px;
  font-size: 14px;

  @media screen and (max-width: 767px) {
    padding: 8px 16px;
    line-height: 30px;
    font-size: 16px;
  }
  font-weight: 500;
  font-family: inherit;
  border-radius: 6px;
  -webkit-appearance: none;
  color: var(--input-color);
  border: 1px solid var(--input-border);
  background: var(--input-background);
  transition: border 0.3s ease;
  &::placeholder {
    color: var(--input-placeholder);
  }
  &:focus {
    outline: none;
    border-color: var(--input-border-focus);
  }
}

.rb-group {
  display: inline;
  vertical-align: middle;
  input.nostyle-input {
    display: inline;
    margin: 7px;
  }
  label {
    margin: 5px;
  }
}

span.alert {
  display: block;
  font-size: 0.75rem;
  line-height: 1;
  margin-left: 5px;
  margin-top: -15px;
  margin-bottom: 5px;
  color: #f57f6c;
}

span.alert + span.alert {
  margin-top: 10px;
}

select {
  width: 100%;
}

.form-group {
  display: flex;
  @media screen and (max-width: 767px) {
    display: block;
  }
  & > span,
  input,
  select {
    white-space: nowrap;
    display: block;
    &:not(:first-child):not(:last-child) {
      border-radius: 0;
    }
    &:first-child {
      border-radius: 6px 0 0 6px;
    }
    &:last-child {
      border-radius: 0 6px 6px 0;
    }
    &:not(:first-child) {
      margin-left: -1px;
    }
    &:first-child:last-child {
      border-radius: 6px;
    }
    @media screen and (max-width: 767px) {
      border-radius: 6px !important;
      margin: 15px 0 !important;
    }
  }
  input,
  select {
    position: relative;
    z-index: 1;
    flex: 1 1 auto;
    margin-top: 0;
    margin-bottom: 0;
  }
  & > span {
    text-align: center;
    padding: 8px 12px;
    font-size: 14px;
    line-height: 25px;
    color: var(--group-color);
    background: var(--group-background);
    border: 1px solid var(--group-border);
    transition: background 0.3s ease, border 0.3s ease, color 0.3s ease;
  }
  &:focus-within {
    & > span {
      color: var(--group-color-focus);
      background: var(--group-background-focus);
      border-color: var(--group-border-focus);
    }
  }
}

:root {
  --input-color: #777777;
  --input-border: #cdd9ed;
  --input-background: #fff;
  --input-placeholder: #cbd1dc;
  --label-color: #505050;

  --input-border-focus: #275efe;

  --group-color: var(--input-color);
  --group-border: var(--input-border);
  --group-background: #eef4ff;

  --group-color-focus: #fff;
  --group-border-focus: var(--input-border-focus);
  --group-background-focus: #678efe;
}

.home {
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  min-height: 100vh;
  font-family: "Mukta Malar", Arial;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

html {
  -webkit-text-size-adjust: none;
  text-size-adjust: none;
}
input[type="text"],
input[type="email"],
input[type="tel"],
input[type="number"],
textarea {
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  appearance: none;
  outline: 0;
  box-shadow: none;
}
</style>
