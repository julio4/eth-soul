import { useEffect, useState } from 'react'

export default function GoogleMapsMarker({
	onDrag,
	...options
}: google.maps.MarkerOptions & { onDrag?: (e: google.maps.KmlMouseEvent) => void }) {
	const [marker, setMarker] = useState<google.maps.Marker>()

	useEffect(() => {
		if (!marker) {
			setMarker(new google.maps.Marker())
		}
		return () => {
			if (marker) {
				marker.setMap(null)
			}
		}
	}, [marker])

	useEffect(() => {
		if (marker) {
			marker.setOptions(options)
			if (onDrag) {
				marker.addListener('dragend', onDrag)
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [marker])

	return null
}
