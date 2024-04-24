import axios from 'axios'
import { defineStore } from 'pinia'

export const useStaffStore = defineStore('staff', {
    state: () => ({
        staffLists: [],
        isLoading: false,
    }),
    getters: {

    },
    actions: {
        async getStaff() {
            const staff = await axios.get("http://127.0.0.1:8000/api/staff");
            const response = staff.data
            this.staffLists = response
        }
    },
})