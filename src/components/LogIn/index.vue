<template>
  <div class="login-wrapper">
    <h4>Log In</h4>
    <vl-input field-label="Email" type="email" placeholder="Your email address" v-model="email"/>
    <vl-input field-label="Password" type="password" placeholder="Your password" show-password v-model="password"/>
    <vl-button href="/#/dashboard" class="text-right">Log In</vl-button>
  </div>
</template>

<script>
export default {
  name: 'LogIn',
  data () {
    return {
      email: '',
      password: '',
      number: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
