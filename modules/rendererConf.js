const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const rendConf = (renderer) => {
    renderer.shadowMap.enabled = true;
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.physicallyCorrectLights = true
}

export default rendConf