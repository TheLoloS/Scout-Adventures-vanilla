//config page movment


const confControls = (controls) => {
    console.log(controls)
    controls.target.set(-15, 0, -15)

    //camera set up and movment

    controls.maxDistance = 40
    controls.minDistance = 6
    controls.maxPolarAngle = 1.1
    controls.minPolarAngle = 0.9
    controls.minAzimuthAngle = 1
    controls.screenSpacePanning = 5 //right mouse click
    controls.update();
}


export default confControls