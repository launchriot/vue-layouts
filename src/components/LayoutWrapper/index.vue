<template>
  <div class="layout-wrapper">
    <div v-if="$route.meta.authLayout">
      <auth-wrapper>
        <router-view/>
      </auth-wrapper>
    </div>
    <div v-else class="layout-two">
      <h1>Layout Two!</h1>
      <router-view/>
    </div>
  </div>
</template>

<script>
import AuthWrapper from '@/components/LayoutWrapper/AuthWrapper'

export default {
  name: 'LayoutWrapper',
  components: {
    'auth-wrapper': AuthWrapper
  }
}
</script>

<style>
</style>