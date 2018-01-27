export default {
	install: Vue => {
		Vue.directive('appendSearch', {
			bind(el) {
				setTimeout(() => {
					let nodes = document.querySelectorAll(`.${el.className.replace(/\s/g, '.')}`);
					nodes[nodes.length - 1].className += ' query-button-prev';
				});
			}
		})
	}
};