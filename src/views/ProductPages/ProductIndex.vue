<template>
    <div v-if="loading.main || loading.error" class="mainLoaderContainer">
        <div class="mainLoader"></div>
    </div>
    <template v-else>
        <div class="cartCreateContainer">
            <div class="cartContainer">
                <button @click="() => { $router.push('/cart'); }" class="btn btn-primary"> Cart ({{ totalProductsInCart }})</button>
            </div>
            <div class="buttonContainer">
                <button @click="openModel" class="btn btn-success">
                    Create New Product
                </button>
            </div>
        </div>
        <div class="cardContainer">
            <ProductCard
                v-for="item in products"
                :key="item.ProductId"
                :item="item"
                @delete-product="deleteProduct"
                @openEditModel="openEditModel"
            ></ProductCard>
        </div>
    </template>
    <Transition>
        <template>
            <Model v-if="showModel">
                <ProductForm
                    :oldProduct="productToBeUpdate"
                    :method="modelMethod"
                    :categories="categories"
                ></ProductForm>
            </Model>
        </template>
    </Transition>
</template>

<script src="./ProductIndex.js"></script>

<style lang="css" scoped>
.mainLoaderContainer {
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    padding: 200px 10px;
}

.cartCreateContainer {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    padding: 0px 20px;
    margin: 30px auto;
}



/* HTML: <div class="loader"></div> */
.mainLoader {
    width: 120px;
    height: 22px;
    border-radius: 40px;
    color: #514b82;
    border: 2px solid;
    position: relative;
}
.mainLoader::before {
    content: "";
    position: absolute;
    margin: 2px;
    width: 25%;
    top: 0;
    bottom: 0;
    left: 0;
    border-radius: inherit;
    background: currentColor;
    animation: l3 1s infinite linear;
}
@keyframes l3 {
    50% {
        left: 100%;
        transform: translateX(calc(-100% - 4px));
    }
}

.cardContainer {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 2rem;
}

.card {
    margin: 0px !important;
}
</style>
