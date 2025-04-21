
import 'leaflet/dist/leaflet.css';
//import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup} from 'react-leaflet'
import { TileLayer } from 'react-leaflet';

const LIGHT_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
const DARK_URL  = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"

const MapView =({geoLatLong}) => {

  // const [isDark, setIsDark] = useState(false);
  // const [tileUrl, setTileUrl] = useState(LIGHT_URL)

    return (
        <div className="flex-col w-full">
            <div className="text-2xl py-2 ">
                <strong className="text-slate-700 dark:text-white">Localização</strong>
            </div>
            <MapContainer center={geoLatLong} zoom={50} scrollWheelZoom={false} className="aspect-video rounded-2xl">
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url={DARK_URL}
                    />
                <Marker position={geoLatLong}>
                    <Popup>
                        Essa foto foi tirada exatamente aqui as
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}

export default MapView;