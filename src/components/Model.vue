<template>
    <Teleport to="body">
        <div class="modelBg" @click.stop="closeModel">
        <div class="modelContent" @click.stop>
            <slot></slot>
            <component :is="currentComponent"></component>
        </div>
        </div>
    </Teleport>
</template>

<script>
import useLayoutStore from '@/store/layoutStore';
import Empty from './Empty.vue';
import CustomerCreateForm from './ForCartPage/CustomerCreateForm.vue';
import StaffCreateForm from './ForCartPage/StaffCreateForm.vue';
export default {
    name: "Model",

    components: {
        Empty, 
        CustomerCreateForm,
        StaffCreateForm
    },

    props: {
        propComponent: {
            type: String,
            default: "Empty"
        },
    },

    data () {
        return {
            currentComponent: this.propComponent
        }
    },

    methods: {
        closeModel () {
            const layoutStore = useLayoutStore();
            layoutStore.controlModel(false);    
        }
    }, 

    mounted () {
        const layoutStore = useLayoutStore();
        layoutStore.close();
    }
};
</script>

<style lang="css" scoped>
    .modelBg {
        position: fixed;
        width: 100vw;
        height: 100vh;
        display: grid;
        place-items: center;
        z-index: 500;
        background-color: rgba(0, 0, 0, 0.5);
        top: 0;
        left: 0;
        backdrop-filter: blur(5px);
        overflow-y: auto;
    }

    .modelContent {
        background-color: white;
        width: fit-content;
        height: fit-content;
        padding: 10px 20px;
        border-radius: 30px;
    }
</style>
