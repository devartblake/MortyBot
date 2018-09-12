<template>
    <div style="background:#F0F2F5;margin-top: -20px;">

    </div>
</template>

<script>
import { Scene } from 'three'
const scene = new Scene()

export default {
  name: 'Page404',
  computed: {
    message() {
      return 'Network Management said this page you can not enter ...'
    }
  }
    
}
    //var scene = new THREE.Scene()
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )

    var renderer = new THREE.WebGLRenderer()
    renderer.setSize( window.innerWidth, window.innerHeight )
    document.body.appendChild( renderer.domElement )
</script>
