<template>
  <div class="l-sidebar">
    <profile v-for="(p, index) in profiles" :data="p" :index="index" :key="index"></profile>
    <action icon="user-plus" :func="addProfile"></action>
    <action icon="plus-circle" :func="addColumn"></action>
  </div>
</template>

<script>
import Action from './Sidebar/Action'
import Profile from './Sidebar/Profile'
import { mapGetters } from 'vuex'
export default {
  computed: mapGetters({
    profiles: 'allProfiles'
  }),
  methods: {
    addColumn (e) {
      this.$modal.show('column-modal')
    },
    addProfile (e) {
      this.$modal.show('profile-modal')
    }
  },
  components: {
    Action,
    Profile
  },
  name: 'sidebar'
}
</script>

<style>
.l-sidebar {
  background-color: #202020;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 50px;
  z-index: 200;
}
</style>