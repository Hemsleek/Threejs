import * as THREE from 'three'
import gsap from 'gsap'

console.log(gsap);

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: "aqua" })
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

//gsap
gsap.to(mesh.position, { x: 2, duration: 1, delay: 1 })
gsap.to(mesh.position, { x: 0, duration: 1, delay: 2 })

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)


//Clock

const clock = new THREE.Clock()


//Animations 
const tick = () => {
    const elapsedTime = clock.getElapsedTime()


    // mesh.rotation.y = elapsedTime
    // mesh.rotation.x = elapsedTime
    // mesh.rotation.z = elapsedTime
    // mesh.position.y = Math.sin(elapsedTime)
    // mesh.position.x = Math.cos(elapsedTime)


    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)

}

tick()