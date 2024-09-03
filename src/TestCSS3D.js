import * as THREE from 'three';
import {TransformControls} from "three/addons";

import { useEffect, useRef, useState } from "react";
import {CSS3DObject, CSS3DRenderer} from "three/examples/jsm/renderers/CSS3DRenderer";
import {InteractionManager} from "three.interactive";

function TestCSS3D() {
    const refContainer = useRef(null);
    const width = window.innerWidth, height = window.innerHeight;

    function* pictureGenerator() {
        while (true) {
            yield 'abangyarudy.jpg';
            yield 'kuseuma.jpg';
            yield 'sorotani.jpg';
        }
    }

    const pictures = pictureGenerator();

    const [planes, setPlanes] = useState([]);
    const [pauseAnimation, setPauseAnimation] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [group, setGroup] = useState(null);

    const animationSpeed = 0.001;

    const radius = 4.46;
    const turns = 2;
    const objPerTurn = 16;
    const heightStep = 2;


    const generateWhitePillarLight = () => {
        const whitePlane = new THREE.PlaneGeometry(9, 24);

        const cubeGradient = new THREE.TextureLoader().load( 'gradient.png');
        cubeGradient.colorSpace = THREE.SRGBColorSpace;

        const whiteMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: .9,
            alphaMap: cubeGradient
        });
        const cube = new THREE.Mesh(whitePlane, whiteMaterial);
        cube.position.y = 2

        return cube;
    }

    function Plane(number, x = 0, y = 0, z = 0, ry = 0 ) {

        const div = document.createElement( 'div' );
        div.style.width = '480px';
        div.style.height = '360px';
        div.style.backgroundImage = "url('assets/"+pictures.next().value+"')";

        const object = new CSS3DObject( div );
        //object.position.set( number * 480, y, z );
        //object.rotation.y = ry;

        return object;

    }

    const init = () => {
        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 5000 );
        camera.position.set( 500, 350, 750 );
        //const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
        //camera.position.set(0, 6, 8);


        const renderer = new CSS3DRenderer();
        renderer.setSize(width, height);

        // refContainer.current && refContainer.current.appendChild( renderer.domElement );
        document.querySelector('.AppThree').appendChild( renderer.domElement );

        const interactionManager = new InteractionManager(
            renderer,
            camera,
            renderer.domElement
        );

        // const geom = new THREE.PlaneGeometry( (16 / 9), 1);

        const whitePillarLight = generateWhitePillarLight();

        scene.add(whitePillarLight)

        const helix = new THREE.Group();

        const controls = new TransformControls(helix, refContainer.current);
        //controls.addEventListener( 'change', renderer.render );

        let panneaux = [];


        /**
         * On démarre de la tuile la plus a gauche
         * On fait une hélice apres la 6eme tuile
         * et au tour d'après on reprends les mêmes X et Z
         * et on fait Y = i * hauteur d'un tour pour la première
         * tuile du tour
         */
        for (let turn = 1; turn < turns; turn++) {
            for (let obj = 0; obj < objPerTurn; obj++) {
                let plane = new Plane(obj);
                //plane.scale.x = -1;

                const yOffset = obj < 7 ? 0 : ((heightStep / (objPerTurn - 6)) * (obj - 6))

                const yPos = (heightStep * turn + yOffset);

                const currentPosition = new THREE.Vector3(
                    -Math.cos((obj*Math.PI*2) / objPerTurn) * radius,
                    (heightStep * turn + yOffset),
                    Math.sin((obj*Math.PI*2) / objPerTurn) * radius
                );

                plane.position.copy(currentPosition);
                plane.lookAt(0, yPos, 0)

                plane.addEventListener('click', (e) => {
                    console.log('Plane n :'+obj)
                })

                helix.add(plane);
                interactionManager.add(plane)
                setPlanes(a => [...a, plane])
                panneaux.push(plane)
            }
        }
        //setGroup(helix)

        scene.add(helix)
        interactionManager.add(helix)

        const boundingBox = new THREE.Box3().setFromObject(helix);
        const size = new THREE.Vector3();
        boundingBox.getSize(size);

        helix.position.y = 0;

        animate(renderer, controls, scene, camera, interactionManager)
    }

    const animate = (renderer, controls, scene, camera, interactionManager) => {

        //requestAnimationFrame( animate );
        //controls.update();
        interactionManager.update();
        renderer.render( scene, camera );

    }

    useEffect(() => {
        init();
    }, [])

    return (
        <div className="AppThree">
            <div ref={refContainer}></div>
        </div>
    );
}

export default TestCSS3D;
