<template>
  <div class="layout-wrapper">
    <div v-if="$route.meta.authLayout">
      <auth-wrapper>
        <router-view/>
      </auth-wrapper>
    </div>
    <div v-if="$route.meta.navlessLayout">
      <navless-wrapper>
        <router-view/>
      </navless-wrapper>
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
import NavlessWrapper from '@/components/LayoutWrapper/NavlessWrapper'

export default {
  name: 'LayoutWrapper',
  components: {
    'auth-wrapper': AuthWrapper,
    'app-wrapper': AppWrapper,
    'navless-wrapper': NavlessWrapper
  }
}
</script>

<style>
</style>