import { defineStore } from 'pinia'
import { ref } from "vue";


export default defineStore('first', {
  state: () => {
    return {
			token: '',
      id:'',
      username:'',
      name:'STATICHIT'
		};
  },
  getters: {
  },
  action: {

  }
})

