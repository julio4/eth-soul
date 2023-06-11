export function cropTextInTheMiddle(text: string, length: number) {
	if (text.length <= length) return text
	return text.slice(0, length / 2) + '...' + text.slice(text.length - length / 2)
}
