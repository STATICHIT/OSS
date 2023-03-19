import { defineStore } from 'pinia';

export const useMenuStore = defineStore('menu', {
	state: () => {
		return {
			collapse: false
		};
	},
	getters: {},
	actions: {
		handleCollapse() {
			this.collapse = !this.collapse;
		}
	}
});
