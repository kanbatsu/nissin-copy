import { Suspense, useEffect, useRef, useState} from "react";
import {Canvas, useFrame, useLoader, useThree} from "@react-three/fiber";
import Card from "./Card";
import * as THREE from "three";
import { TextureLoader} from "three";
import {ScrollControls, useScroll} from "@react-three/drei";
import {easing} from "maath";
import "../utils";

function* pictureGenerator() {
    while (true) {
        yield 'abangyarudy.jpg';
        yield 'kuseuma.jpg';
        yield 'sorotani.jpg';
        yield 'rakusatabeteyo.jpg';
        yield 'samurai-noodles.jpg';
        yield 'zenbuhaittoru.jpg';
        yield 'taiwanmazesoba.jpg';
        yield 'moguratataki.jpg';
        yield 'goroguradesita.jpg';
        yield 'goroguradesitakinako.jpg';
        yield 'goroguradesitachoco.jpg';
        yield 'dosekuunara.jpg';
    }
}

function* cardsDataGenerator() {
    while (true) {
        yield [
            'abangyarudy.jpg',
            'https://www.youtube.com/embed/6zzzdwt3YOQ?si=qXpY1sTd9T_lGqhd'
        ];
        yield [
            'kuseuma.jpg',
            'https://www.youtube.com/embed/YkcGoztVZiI?si=9t9CdzXKqMY6iRMb'
        ];
        yield [
            'sorotani.jpg',
            'https://www.youtube.com/embed/JvSQoTbwnaI?si=1cr00HloGRU0Fh_H'
        ];
        yield [
            'rakusatabeteyo.jpg',
            'https://www.youtube.com/embed/lYvtQ-imtrY?si=8e5JBoRfveDdguQy'
        ];
        yield [
            'samurai-noodles.jpg',
            'https://www.youtube.com/embed/WNbb9qixsRQ?si=ZlDjhqyx68bj40U4'
        ];
        yield [
            'zenbuhaittoru.jpg',
            'https://www.youtube.com/embed/YkcGoztVZiI?si=9t9CdzXKqMY6iRMb'
        ];
        yield [
            'taiwanmazesoba.jpg',
            'https://www.youtube.com/embed/YkcGoztVZiI?si=9t9CdzXKqMY6iRMb'
        ];
        yield [
            'moguratataki.jpg',
            'https://www.youtube.com/embed/JvSQoTbwnaI?si=1cr00HloGRU0Fh_H'
        ];
        yield [
            'goroguradesita.jpg',
            'https://www.youtube.com/embed/YkcGoztVZiI?si=9t9CdzXKqMY6iRMb'
        ];
        yield [
            'goroguradesitakinako.jpg',
            'https://www.youtube.com/embed/lYvtQ-imtrY?si=8e5JBoRfveDdguQy'
        ];
        yield [
            'goroguradesitachoco.jpg',
            'https://www.youtube.com/embed/JvSQoTbwnaI?si=1cr00HloGRU0Fh_H'
        ];
        yield [
            'dosekuunara.jpg',
            'https://www.youtube.com/embed/lYvtQ-imtrY?si=8e5JBoRfveDdguQy'
        ];
    }
}

const pictures = pictureGenerator();
const dataGenerator = cardsDataGenerator();

const radius = 4.46;
const turns = 6;
const objPerTurn = 16;
const heightStep = 1.75;
const camPosY = 3;

const speedAnimation = 0.001;

export default function Helix({togglePlayer}) {

    return (
        <Canvas camera={{ position: [0, camPosY, 50], fov: 15, near: 1, far: 1000 }}>
            <ScrollControls pages={4} infinite>
                <Rig lookAtY={camPosY} rotation={[0, 0, 0]} togglePlayer={togglePlayer}>
                </Rig>
            </ScrollControls>
            <WhitePillarLight />
        </Canvas>
    )
}

function Rig({lookAtY, togglePlayer, ...props}) {
    const ref = useRef();
    const scroll = useScroll();

    const [spin, setSpin] = useState(false)
    /** TODO Handle cursor press */
    const [grab, setGrab] = useState(false)
    const [rotY, setRotY] = useState(0)
    const [url, setUrl] = useState('https://www.youtube.com/embed/6zzzdwt3YOQ?si=qXpY1sTd9T_lGqhd')

    const spinHelix = (url) => {
        setUrl(url)
        setSpin(true)
    }

    useFrame((state, delta) => {
        if(state.camera.position.z !== 23) {
            easing.damp3(state.camera.position, [0,camPosY,23], 0.2)
        }

        if (!spin && !grab)
        {
            if(scroll.delta === 0)
            {
                ref.current.rotation.y += speedAnimation
            }
            else
            {
                ref.current.rotation.y += scroll.delta * (Math.PI * 2)// Rotate contents
            }

            state.events.update() // Raycasts every frame rather than on pointer-move
            state.camera.lookAt(0, lookAtY, 0) // Look at center
        }
        else
        {
            easing.damp(ref.current.rotation, 'y', ref.current.rotation.y  + 2, 0.2)
            window.setTimeout(() => {
                togglePlayer(url);
                setSpin(false);
            }, 1000)
        }

        setRotY(ref.current.rotation.y)
    })

    return (<group ref={ref} {...props}>
        <Carousel heightStep={heightStep} nbTurns={turns} cardsByTurn={objPerTurn} radius={radius} spinHelix={spinHelix} rotationY={rotY} />
    </group>)
}

function Carousel({ radius = 4.46, cardsByTurn = 16 , nbTurns = 3, heightStep = 1, spinHelix, rotationY}) {

    return Array.from({length: nbTurns}, (t, turn) => {
        return Array.from({ length: cardsByTurn }, (_, i) => {
            const [picture, url] = dataGenerator.next().value;
            const xPos = Math.sin((i / cardsByTurn) * Math.PI * 2) * radius;

            const yOffset = i < 7 ? 0 : ((heightStep / (cardsByTurn - 6)) * (i - 6))

            return (
                <Card
                    key={i}
                    cardNumber={i}
                    url={url}
                    picture={'assets/'+picture}
                    groupRotationY={rotationY}
                    spinHelix={spinHelix}
                    position={[
                        xPos,
                        (heightStep * turn + yOffset),
                        Math.cos((i / cardsByTurn) * Math.PI * 2) * radius]}
                    rotation={[0, Math.PI + (i / cardsByTurn) * Math.PI * 2, 0]}
                    worldSettings={{
                        radius: radius,
                        turns: turns,
                        objPerTurn: objPerTurn,
                        heightStep: heightStep,
                        turn: turn
                    }}
                />
            )
        })
    })
}

function WhitePillarLight() {
    const cubeGradient = useLoader(TextureLoader, 'gradient.png')
    cubeGradient.colorSpace = THREE.SRGBColorSpace;

    return (
        <mesh position={[0, 2, 0]}>
            <planeGeometry args={[9, 24]}/>
            <meshBasicMaterial color={0xffffff} transparent={true} opacity={.9} alphaMap={cubeGradient} />
        </mesh>
    );
}