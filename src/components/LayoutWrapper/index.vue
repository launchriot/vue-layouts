<template>
  <div class="layout-wrapper">
    <div v-if="$route.meta.authLayout">
      <auth-wrapper>
        <router-view/>
      </auth-wrapper>
    </div>
    <div v-if="$route.meta.focusLayout">
      <focus-wrapper>
        <router-view/>
      </focus-wrapper>
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
import FocusWrapper from '@/components/LayoutWrapper/FocusWrapper'

export default {
  name: 'LayoutWrapper',
  components: {
    'auth-wrapper': AuthWrapper,
    'app-wrapper': AppWrapper,
    'focus-wrapper': FocusWrapper
  }
}
</script>

<style>
</style>