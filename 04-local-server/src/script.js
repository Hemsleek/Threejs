import * as THREE from 'three'

console.log(THREE);

const canvas = document.querySelector("canvas.webgl")


const scene = new THREE.Scene()

const geometry = new THREE.BoxGeometry(1, 1, 1)

const material = new THREE.MeshBasicMaterial({ color: 'red' })

const mesh = new THREE.Mesh(geometry, material)

mesh.position.x = 0.7
mesh.position.y = -0.7
mesh.position.z = 0.7

//distance/length from center of scene to mesh/object/cube
console.log(mesh.position.length());

//normalise mesh- reduce it's length to 1
//mesh.position.length() will equals 1 
mesh.position.normalize()

mesh.position.set(0.7, - 1, 1)

//AxesHelper
const axesHelper = new THREE.AxesHelper(3)

//scale
mesh.scale.set(2, 0.5, 0.5)

mesh.rotation.reorder("YXZAt")
// rotation
mesh.rotation.x = Math.PI * 0.25
mesh.rotation.y = Math.PI * 0.25

scene.add(axesHelper)

scene.add(mesh)


const sizes = {
    width: 800,
    height: 600
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)

camera.position.z = 3
// look At

camera.lookAt(mesh.position)
//distance between the object/mesh/cube and camerq
console.log(mesh.position.distanceTo(camera.position));

scene.add(camera)



const renderer = new THREE.WebGLRenderer({
    canvas
})

renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)