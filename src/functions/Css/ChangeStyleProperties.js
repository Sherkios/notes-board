export default function changeStyleProperties(object, use = document.documentElement) {
	for (const prop of Object.entries(object)) {
		use.style.setProperty(prop[0], prop[1]);	
	}
}