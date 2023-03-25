import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import * as dat from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
/**
 * Loaders
 */
const textureLoader = new THREE.TextureLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()


const stoneTexture = textureLoader.load('/textures/stoneWall/stone_wall_diff_4k.jpg')
const woodColorTexture = textureLoader.load('/textures/wood/wood-128_endgrain-segments-120x120cm-color2_d.jpg')
const normalWoodTexture = textureLoader.load('/textures/wood/wood-128_endgrain-segments-120x120cm_n.png')
const bumpWoodTexture = textureLoader.load('/textures/wood/wood-128_endgrain-segments-120x120cm_s.png')

const environmentMaterial = cubeTextureLoader.load([
    '/textures/environmentMaps/5/px.png',
    '/textures/environmentMaps/5/nx.png',
    '/textures/environmentMaps/5/py.png',
    '/textures/environmentMaps/5/ny.png',
    '/textures/environmentMaps/5/pz.png',
    '/textures/environmentMaps/5/nz.png'
])

/**
 * Fonts
 */
const fontLoader = new FontLoader()

fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) => {

        // Materials
        const material = new THREE.MeshStandardMaterial()
        material.metalness = 0.54
        material.roughness = 0.38
        material.map = stoneTexture

        gui.add(material, 'metalness').min(0).max(1).step(0.001).name('TorusMetalness')
        gui.add(material, 'roughness').min(0).max(1).step(0.001).name('TorusRoughness')

        const cubeMaterial = new THREE.MeshStandardMaterial()
        cubeMaterial.metalness = 0.54
        cubeMaterial.roughness = 0.38
        cubeMaterial.map = woodColorTexture
        cubeMaterial.normalMap = normalWoodTexture
        cubeMaterial.bumpMap = bumpWoodTexture

        gui.add(cubeMaterial, 'metalness').min(0).max(1).step(0.001).name('cubeMetalness')
        gui.add(cubeMaterial, 'roughness').min(0).max(1).step(0.001).name('cubeRoughness')

        const sphereMaterial = new THREE.MeshStandardMaterial({ envMap: environmentMaterial })
        sphereMaterial.metalness = 1
        sphereMaterial.roughness = 0


        // Text
        const textGeometry = new TextGeometry(
            'Hemsleek',
            {
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 5
            }
        )
        textGeometry.center()

        const text = new THREE.Mesh(textGeometry, material)
        scene.add(text)

        // Donuts
        const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 32, 64)
        const cubeGeometry = new THREE.BoxGeometry(0.7, 0.7, 0.7)
        const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32)
        console.time('time taken')
        for (let i = 0; i < 80; i++) {
            const donut = new THREE.Mesh(donutGeometry, material)
            donut.position.x = (Math.random() - 0.5) * 15
            donut.position.y = (Math.random() - 0.5) * 15
            donut.position.z = (Math.random() - 0.5) * 15
            donut.rotation.x = Math.random() * Math.PI
            donut.rotation.y = Math.random() * Math.PI
            const scale = Math.random()
            donut.scale.set(scale, scale, scale)
            scene.add(donut)
            if (i >= 70) {
                const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
                sphere.position.x = (Math.random() - 0.5) * 15
                sphere.position.y = (Math.random() - 0.5) * 15
                sphere.position.z = (Math.random() - 0.5) * 15
                sphere.rotation.x = Math.random() * Math.PI
                sphere.rotation.y = Math.random() * Math.PI
                const scaleSphere = Math.random()
                sphere.scale.set(scaleSphere, scaleSphere, scaleSphere)
                scene.add(sphere)
            }
            if (i >= 60) {
                const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
                cube.position.x = (Math.random() - 0.5) * 15
                cube.position.y = (Math.random() - 0.5) * 15
                cube.position.z = (Math.random() - 0.5) * 15
                cube.rotation.x = Math.random() * Math.PI
                cube.rotation.y = Math.random() * Math.PI
                const scaleCube = Math.random()
                cube.scale.set(scaleCube, scaleCube, scaleCube)
                scene.add(cube)
            }

        }
        console.timeEnd('time taken')


    }
)


/** 
 * Light
 */

const light = new THREE.AmbientLight(0xffffff, 0.5)
gui.add(light, 'intensity').name('lightIntensity').min(0).max(1).step(0.001)
scene.add(light)

const pointLight = new THREE.PointLight(0xffffff, 0.7)
gui.add(pointLight, 'intensity').name('pointLightIntensity').min(0).max(1).step(0.001)

pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()