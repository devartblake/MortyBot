<template>
  <nav class="Titlebar">
    <!-- Menu -->
    <div class="Icon-wrapper Icon-wrapper--titlebar Icon-wrapper--single" style="position: absolute;" @click="toggleDrawer">
      <div class="Menu-wrapper" :class="drawerOpen ? 'is-collapsed' : ''">
        <div class="Menu-line"></div>
        <div class="Menu-line"></div>
      </div>
    </div>

  <div class="topBar">
    Backlog v{{version}}
    <div class="actionBtn-container">
      <div class="minimize actionBtn"
           @click="minimize">
        <Icon type="ios-minus-outline"></Icon>
      </div>
      <div class="close actionBtn"
           @click="closeApp">
        <Icon type="ios-close-outline"></Icon>
      </div>
    </div>
  </div>
</nav>
</template>

<script>
  const remote = require('electron').remote

  export default {
    name: 'TopBar',
    computed: {
      version () {
        return this.$store.state.modals.settings.currentVersion
      },
      drawerOpen () {
        return this.$store.getters.drawerOpen
      }
    },
    methods: {
      toggleDrawer () {
        this.$store.dispatch('toggleDrawer')
      },
      closeApp () {
        remote.app.quit()
      },
      minimize () {
        remote.BrowserWindow.getFocusedWindow().minimize()
      }
    }
  }
</script>

<style scoped>
  .topBar {
    -webkit-app-region: drag;
    background-color: #ffffff;
    height: 30px;
    position: fixed;
    z-index: -1;
    top: 1px;
    left: 1px;
    width: 100%;
    padding: 5px;
    -webkit-transition: all .3s;
    transition: all .3s;
    user-select: none;
    text-align: center;
    font-size: 1.1em;
    border-bottom: 1px solid #f9f9f9;
  }

  .actionBtn-container {
    position: fixed;
    right: 0;
    top: 0;
    display: flex;
  }

  .actionBtn {
    -webkit-app-region: no-drag;
    font-size: 16px;
    width: 25px;
    height: 30px;
    text-align: center;
    opacity: .4;
    -webkit-transition: all .3s;
    transition: all .3s;
    color: #272822;
    line-height: 2em;
  }

  .actionBtn:hover {
    opacity: 1;
  }

  .actionBtn.close:hover {
    color: #c5281b;
  }

  .Menu-line {
    background-color: #858C99;
    display: inline-block;
    transition: all .3s ease;
    width: 20px;
    height: 2px;
    & :last-child {
      width: 10px;
    }
  }

  .Menu-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 80%;
    & .is-collapsed {
      & .Menu-line:first-child {
        transform: rotate(-45deg);
        width: 12px;
      }
      & .Menu-line:last-child {
        transform: rotate(45deg);
        width: 12px;
      }
    }
  }
  
  .Titlebar {
    letter-spacing: .05em;
    margin-bottom: 18px;
    position: relative;
    text-align: center;
    height: 25px;
    -webkit-app-region: drag;
  }

  .Icon-wrapper--titlebar {
    -webkit-app-region: no-drag;
    & :hover .Menu-line {
      background-color: #FF4E4D;
    }
    & :hover .Icon--close line, & :hover .Icon--minimize line {
      stroke: #FF4E4D;
    }
  }
</style>
