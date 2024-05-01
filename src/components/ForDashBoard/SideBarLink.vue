<template>
    <li class="nav-item">
        <router-link :to="path" class="nav-link">
            
            <slot name="icon">
                <i class="bi bi-grid"></i>
            </slot>
            <span><slot> </slot></span>
        </router-link>
    </li>
</template>

<script>
export default {
    name: "SideBarLink",

    props: {
        path: {
            type: String,
            default: "/",
        },
    },
};
</script>

<style lang="css" scoped></style>
