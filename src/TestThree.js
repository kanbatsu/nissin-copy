import * as THREE from 'three';
import {TransformControls} from "three/addons";

import { useEffect, useRef, useState } from "react";

function TestThree() {
    const refContainer = useRef(null);

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
    const [group, setGroup] = useState(null);

    const animationSpeed = 0.001;

    const radius = 4.46;
    const turns = 20;
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

    const init = () => {
        const width = window.innerWidth, height = window.innerHeight;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
        camera.position.set(0, 6, 8);


        const renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setSize(width, height);
        renderer.setClearColor(0xffffff);
        refContainer.current && refContainer.current.appendChild( renderer.domElement );

        const geom = new THREE.PlaneGeometry( (16 / 9), 1);

        const whitePillarLight = generateWhitePillarLight();

        scene.add(whitePillarLight)

        const helix = new THREE.Group();

        const controls = new TransformControls(helix, refContainer.current);
        controls.addEventListener( 'change', renderer.render );

        let panneaux = [];
        let firstRisingPanelXPos = 0;


        /**
         * On démarre de la tuile la plus a gauche
         * On fait une hélice apres la 6eme tuile
         * et au tour d'après on reprends les mêmes X et Z
         * et on fait Y = i * hauteur d'un tour pour la première
         * tuile du tour
         */
        for (let turn = 1; turn < turns; turn++) {
            for (let obj = 0; obj < objPerTurn; obj++) {
                const texture = new THREE.TextureLoader().load( 'assets/' + pictures.next().value);
                texture.colorSpace = THREE.SRGBColorSpace;

                let plane = new THREE.Mesh(geom, new THREE.MeshBasicMaterial({
                    map: texture,
                    side: THREE.DoubleSide
                }));
                plane.scale.x = -1;

                const yOffset = obj < 7 ? 0 : ((heightStep / (objPerTurn - 6)) * (obj - 6))

                const yPos = (heightStep * turn + yOffset);

                const currentPosition = new THREE.Vector3(
                    -Math.cos((obj*Math.PI*2) / objPerTurn) * radius,
                    (heightStep * turn + yOffset),
                    Math.sin((obj*Math.PI*2) / objPerTurn) * radius
                );

                if(obj === 7 && turn === 1) {
                    firstRisingPanelXPos = currentPosition.x
                }

                plane.position.copy(currentPosition);
                plane.lookAt(0, yPos, 0)

                helix.add(plane);
                setPlanes(a => [...a, plane])
                panneaux.push(plane)
            }
        }
        setGroup(helix)

        scene.add(helix)

        const boundingBox = new THREE.Box3().setFromObject(helix);
        const size = new THREE.Vector3();
        boundingBox.getSize(size);

        helix.position.y = 0;

        const revolution = (objPerTurn / 2);

        renderer.setAnimationLoop(() => {
            if (helix.rotation.y <= (revolution)) {
                helix.rotation.y += animationSpeed;

                panneaux.forEach((plane, index) => {
                    //const yOffset = index < 7 ? 0 : ((heightStep / (objPerTurn - 6)) * (obj - 6))
                    let nextPlane = (index + 1) === panneaux.length ? 0 : index + 1;

                    plane.position.y -= 0.0001;
                })
                /*if(helix.position.y > ((turns - 4) * (heightStep + 1 )) / -2)
                {
                    helix.position.y -= animationSpeed;
                }
                else
                {
                    helix.position.y = 0;
                }*/
            }

            renderer.render(scene, camera)
        });
    }

    useEffect(() => {
        init();
    }, [])

    function displayInfo() {
        group.rotation.y += 0.5;
        setPauseAnimation(!pauseAnimation)
    }

    window.addEventListener("keypress", function (e) {
        if(e.key === "e") {
            console.log(group.rotation.y)
        }
    })

    return (
        <div className="App">
            <div ref={refContainer}></div>
        </div>
    );
}

export default TestThree;
