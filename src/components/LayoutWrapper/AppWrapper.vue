<template>
  <div class="app-layout-wrapper">
    <vl-meta-nav></vl-meta-nav>
    <vl-primary-nav :items="items"></vl-primary-nav>
    <div class="row app-main-body-wrapper">
      <div class="app-main-body col-md-12">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppWrapper',
  data () {
    return {
      items: [
        {
          name: 'Dashboard',
          active: false,
          permissions: true,
          secondary: null
        },
        {
          name: 'Programs',
          active: true,
          permissions: true,
          secondary: [
            {
              name: 'Programs',
              active: false,
              permissions: true
            },
            {
              name: 'RFPs',
              active: true,
              permissions: true
            },
            {
              name: 'POs',
              active: false,
              permissions: true
            },
            {
              name: 'WOs',
              active: false,
              permissions: false
            },
            {
              name: 'Commissions',
              active: false,
              permissions: true
            },
            {
              name: 'Invoices',
              active: false,
              permissions: true
            },
            {
              name: 'Client Invoices',
              active: false,
              permissions: true
            }
          ]
        },
        {
          name: 'Network',
          active: false,
          permissions: true,
          secondary: null
        },
        {
          name: 'Products',
          active: false,
          permissions: true,
          secondary: null
        },
        {
          name: 'Reports',
          active: false,
          permissions: true,
          secondary: null
        },
        {
          name: 'Company',
          active: false,
          permissions: true,
          secondary: null
        },
        {
          name: 'Admin',
          active: false,
          permissions: false,
          secondary: null
        }
      ]
    }
  }
}
</script>

<style lang="scss">
@import "~@/assets/sass/_variables.scss";

body {
  background: $background-default;
  height: 100vh;
}

.app-layout-wrapper {
  background: $brand-white;
  padding-bottom: 1em;
  height: 100vh;
}

.app-main-body-wrapper {
  margin:0;
}

.app-main-body {
  background:$brand-white;
  padding:1em;
}

</style>