<template>
  <div class="layout-wrapper">
    <div v-if="$route.meta.authLayout">
      <auth-wrapper>
        <router-view/>
      </auth-wrapper>
    </div>
    <div v-else>
      <app-wrapper>
        <router-view/>
      </app-wrapper>
    </div>
  </div>
</template>

<script>
import AuthWrapper from '@/components/LayoutWrapper/AuthWrapper'
import AppWrapper from '@/components/LayoutWrapper/AppWrapper'

export default {
  name: 'LayoutWrapper',
  components: {
    'auth-wrapper': AuthWrapper,
    'app-wrapper': AppWrapper
  }
}
</script>

<style>
</style>