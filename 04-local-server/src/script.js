import * as THREE from 'three'

console.log(THREE);

const canvas = document.querySelector("canvas.webgl")


const scene = new THREE.Scene()


const group = new THREE.Group()

group.scale.y = 2
group.rotation.y = 1
group.position.y = 1
scene.add(group)

const cube1 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0xff0000 }))

group.add(cube1)

const cube2 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 'blue' }))

cube2.position.x = -2
group.add(cube2)


const cube3 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 'green' }))

cube3.position.x = 2

group.add(cube3)

const sizes = {
    width: 800,
    height: 600
}
//AxesHelper
const axesHelper = new THREE.AxesHelper(3)
scene.add(axesHelper)

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)

camera.position.z = 3
// look At




scene.add(camera)



const renderer = new THREE.WebGLRenderer({
    canvas
})

renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)