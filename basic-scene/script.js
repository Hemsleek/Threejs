
// Threejs Classes
console.log(THREE);

// elements


//start by creating a scene/container for the whole 3D

// Scene
const scene = new THREE.Scene()


// Red Cube(need to create a Mesh(cube or mesh if there is only one visual object), a Mesh consists of   geometry(shape) and Material(example:color))

// since it's a cube , create a box type geometry/shape
const geometry = new THREE.BoxGeometry(1, 1, 1)

// A material, e.g color
const material = new THREE
    .MeshBasicMaterial({ color: 'red' })


//mesh(the object- a cube)
const mesh = new THREE.Mesh(geometry, material)


// adding the object/cube to the scene/container
scene.add(mesh)

//not visible, you need to create camera, serves as point of view when rendering
//Parameters
// - Field of View(in degree-75)
// - Aspect ratio

const sizes = {
    width: 800,
    height: 600
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
//move the camera backward(towards self = +ve) to make the scene visible,(z-axis points towards self in threejs)
camera.position.z = 3
scene.add(camera)

//Renderer -  will be inside the canva, we can either let threejs handle it or we can create the canva ourself
// - The renderer renders the scene through the camera point of view
const canvas = document.querySelector('canvas.webgl')
const renderer = new THREE.WebGLRenderer({
    canvas
})

//set renderer size
renderer.setSize(sizes.width, sizes.height)

//render scene from camera point of views
renderer.render(scene, camera)