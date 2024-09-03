import {DoubleSide, SRGBColorSpace, TextureLoader, MathUtils} from "three";
import {useFrame, useLoader} from "@react-three/fiber";
import {forwardRef, useEffect, useRef, useState} from "react";
import { Image } from "@react-three/drei";
import { easing } from "maath";
import "../utils";

export default function Card({picture, spinHelix, groupRotationY, worldSettings, cardNumber, url, ...props}) {
    const ref = useRef()
    const [hovered, hover] = useState(false)

    const { radius, turns, objPerTurn, heightStep, turn } = worldSettings
    //const pointerOver = (e) => (e.stopPropagation(), hover(true))
    //const pointerOut = () => hover(false)

    const click = (e) => (e.stopPropagation(), spinHelix(url))

    useEffect(() => {
        ref.current.scale.x = -1
    }, []);

    // console.log(Math.cos(groupRotationY)) => position sur l'axe X selon la rotation
    // console.log(Math.sin(groupRotationY)) => position sur l'axe Y selon la rotation

    // ref.current.position.x / radius => position sur l'axe x de la carte
    // ref.current.position.z / radius => position sur l'axe y de la carte

    const minIndex = cardNumber < objPerTurn - 3 ? cardNumber + 3 : objPerTurn - (cardNumber + 3)
    const maxIndex = ((cardNumber + objPerTurn) - 3) < objPerTurn ? ((cardNumber + objPerTurn) - 3) : ((cardNumber + objPerTurn) - 3) - objPerTurn

    const lol = (Math.sin((minIndex / objPerTurn) * Math.PI * 2)) //=> xMin
    const lol2 = (Math.sin((maxIndex / objPerTurn) * Math.PI * 2)) //=> xMin

    //console.log(lol < (Math.cos(groupRotationY)) < lol2)
    // console.log(cardNumber, lol, lol2)

    //0 0.9238795325112867 -0.9238795325112866

    //Math.cos(groupRotationY) > lol || Math.cos(groupRotationY) < lol2

    //const f = Math.sin((i / cardsByTurn) * Math.PI * 2) * radius
    // Math.sin((objPerTurn - 3 / cardsByTurn) * Math.PI * 2) * radius => xMax

    useFrame((state, delta) => {
        //console.log(ref.current.position.x / radius)//, Math.cos(groupRotationY))
        //console.log(palierMin, (Math.abs(groupRotationY) - (MathUtils.degToRad(360) * nbOfTurn)), palierMax)
        //const offset = (Math.cos(groupRotationY) > lol || Math.cos(groupRotationY) < lol2) ? 0 : ((heightStep / (objPerTurn - 6)) * (cardNumber))
        //ref.current.position.y = heightStep * turn + offset

        //easing.damp3(ref.current.scale, hovered ? 1.15 : 1, 0.1, delta)
        //easing.damp(ref.current.material, 'radius', hovered ? 0.25 : 0.1, 0.2, delta)
        //easing.damp(ref.current.material, 'zoom', hovered ? 1 : 1.5, 0.2, delta)
    })

    return (
        <Image ref={ref} url={picture} transparent side={DoubleSide} onClick={click} /*onPointerOver={pointerOver} onPointerOut={pointerOut}*/ {...props}>
            <bentPlaneGeometry args={[0, (16 / 9), 1, 20, 20]} />
        </Image>
    )
}
