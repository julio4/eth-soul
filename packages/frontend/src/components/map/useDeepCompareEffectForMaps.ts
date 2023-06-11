import { useEffect, useRef, EffectCallback } from 'react'
import { CustomEqualCreatorOptions, createCustomEqual, deepEqual } from 'fast-equals'
import { isLatLngLiteral } from '@googlemaps/typescript-guards'

const deepCompareEqualsForMaps = createCustomEqual((options) => {
	return (a: any, b: any) => {
		if (
			isLatLngLiteral(a) ||
			a instanceof google.maps.LatLng ||
			isLatLngLiteral(b) ||
			b instanceof google.maps.LatLng
		) {
			return new google.maps.LatLng(a).equals(new google.maps.LatLng(b))
		}

		// use fast-equals for other objects
		return deepEqual(a, b)
	}
})

function useDeepCompareMemoize(value: any) {
	const ref = useRef()

	if (!deepCompareEqualsForMaps(value, ref.current)) {
		ref.current = value
	}

	return ref.current
}

export function useDeepCompareEffectForMaps(callback: EffectCallback, dependencies: any[]) {
	useEffect(callback, dependencies.map(useDeepCompareMemoize))
}
