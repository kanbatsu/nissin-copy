import {useRef, useState} from "react";

export default function Player({url, togglePlayer}) {
    const ref = useRef()
    const width = window.innerWidth, height = window.innerHeight;

    const [loaded, setLoaded] = useState(false)

    const displayPlayer = (e) => {
        if (ref.current)
        {
            setLoaded(true)
        }
    }

    return (
        <div style={{
            backgroundColor: 'white',
            width: width,
            height: height,
            opacity: 1
        }} ref={ref}>
            <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <iframe width={width / 2} height={height / 2} src={url}
                        title="YouTube video player" frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen onLoad={displayPlayer}
                ></iframe>
                <div style={{
                    backgroundColor: "red",
                    width: "3rem",
                    height: "3rem",
                    color: "white",
                    fontSize: "3rem",
                    fontWeight: "bold",
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '1.5rem',
                    cursor: 'pointer'
                }} onClick={togglePlayer}>
                    &times;
                </div>
            </div>
        </div>
    )
}