<template>
  <div id="wrapper" :class="classObj">
    <top-bar></top-bar>
      <transition name="slide-left" mode="out-in">
        <app-drawer v-if="drawerOpen"/>
      </transition>
      <landing-page></landing-page>
      <restart-required-cloak></restart-required-cloak>
      <update-modal></update-modal>
      <app-notification-win v-if="os === 'win32' && notifications"/>
      <app-notification v-else-if="os !== 'win32' && notifications"/>
  </div>
</template>

<script>
  import appDrawer from '@/components/drawer/Drawer'
  import LandingPage from '@/components/LandingPage'
  import appNotification from '@/components/notification/Notification'
  import appNotificationWin from '@/components/notification/Notification-win'
  import settingsRepository from '@/repositories/settingsRepository'
  import RestartRequiredCloak from '@/components/RestartRequiredCloak'
  import TopBar from '@/components/TopBar'
  import UpdateModal from '@/components/modals/UpdateModal'

  export default {
    name: 'backlog',
    components: {
      appDrawer,
      appNotification,
      appNotificationWin,
      UpdateModal,
      TopBar,
      RestartRequiredCloak,
      LandingPage
    },
    computed: {
      drawerOpen () {
        return this.$store.getters.drawerOpen
      },
      notifications () {
        return this.$store.getters.notifications
      },
      os () {
        return process.platform
      }
    },
    data () {
      return {
        settings: null
      }
    },
    created () {
      this.settings = settingsRepository.getAppSettings()
      if (this.settings.darkTheme) {
        document.querySelector('body').classList.add('darkTheme')
      }
    }
  }
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Roboto');
  @import url('~animate.css');
  @import '@/assets/darkTheme.scss';
  @import '@/styles/index.scss'; // global css
  
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    border: 1px solid rgba(90, 99, 118, 0.13);
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Droid Sans, Helvetica Neue, sans-serif;
    height: 100vh;
    background-color: #ffffff;
    padding: 10px 0;
    margin-top: 30px;
    overflow: hidden;

    #app {
      overflow: auto;
      height: 90vh!important;
      padding-right: 8px;
    }
  }

  .vb > .vb-dragger {
    z-index: 5;
    width: 8px;
    right: 0;
  }

  .vb > .vb-dragger > .vb-dragger-styler {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transform: rotate3d(0,0,0,0);
    transform: rotate3d(0,0,0,0);
    -webkit-transition:
      background-color 100ms ease-out,
      margin 100ms ease-out,
      height 100ms ease-out;
    transition:
      background-color 100ms ease-out,
      margin 100ms ease-out,
      height 100ms ease-out;
    background-color: rgba(73, 73, 73, 0.05);
    margin: 5px 5px 5px 0;
    border-radius: 20px;
    height: calc(100% - 10px);
    display: block;
  }

  .vb.vb-scrolling-phantom > .vb-dragger > .vb-dragger-styler {
    background-color: rgba(73, 73, 73, 0.3);
  }

  .vb > .vb-dragger:hover > .vb-dragger-styler {
    background-color: rgba(73, 73, 73, 0.5);
    margin: 0px;
    height: 100%;
  }

  .vb.vb-dragging > .vb-dragger > .vb-dragger-styler {
    background-color: rgba(73, 73, 73, 0.5);
    margin: 0px;
    height: 100%;
  }

  .vb.vb-dragging-phantom > .vb-dragger > .vb-dragger-styler {
    background-color: rgba(73, 73, 73, 0.5);
  }
</style>
