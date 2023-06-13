import {Map } from "leaflet";
import { useState, useCallback, useEffect, useMemo } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

interface ReactLeafletMapProps {

}

export function ReactLeafletMap({}:ReactLeafletMapProps){
    const [center,setCenter]=useState({lat:51.505,lng:-0.09});
    const zoom = 13
    const [map, setMap] = useState<Map|null>(null)

    const displayMap = useMemo(
        () => (
            <MapContainer
                center={center}
                zoom={zoom}
                scrollWheelZoom={false}
                ref={setMap}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
        ),
        [],
    )

    return (
        <div>
            {map ? <DisplayPosition map={map} center={center} zoom={zoom}/> : null}
            {displayMap}
        </div>
    )
}






interface DisplayPositionProps {
    map:Map|null;
    center:{lat:number,lng:number};
    zoom:number;
}


function DisplayPosition({ map,center,zoom }:DisplayPositionProps){
    const [position, setPosition] = useState(() => map?.getCenter())
    const onClick = useCallback(() => {
        map?.setView(center, zoom)
    }, [map])

    const onMove = useCallback(() => {
        setPosition(map?.getCenter())
    }, [map])

    useEffect(() => {
        map?.on('move', onMove)
        return () => {
            map?.off('move', onMove)
        }
    }, [map, onMove])

    return (
        <p>
            latitude: {position?.lat.toFixed(4)}, longitude: {position?.lng.toFixed(4)}{' '}
            <button onClick={onClick}>reset</button>
        </p>
    )
}


