import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

let startTime = Date.now()

//Animations 
const tick = () => {
    const currentTime = Date.now()

    //deltaTime helps to manually  mitigate the effect of difference in fps(frame per seconds) on systems.
    const deltaTime = currentTime - startTime
    startTime = currentTime

    mesh.rotation.y += 0.002 * deltaTime
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)

}

tick()