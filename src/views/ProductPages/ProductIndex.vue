<template>
    <main class="main" id="main">
        <div v-if="loading.main || loading.error" class="mainLoaderContainer">
            <div class="mainLoader"></div>
        </div>
        <template v-else>
            <div class="cardContainer">
                <div v-for="(item) in products" :key="item.ProductId" class="card" style="width: 18rem">
                    <div class="card-body">
                        <h5 class="card-title">{{ item.ProductName }}</h5>
                        <h6 class="card-subtitle mb-2 text-body-secondary">
                            {{ categories.find(catego => catego.ProductCategoryId === item.ProductCategoryId).ProductCategoryName }}
                        </h6>
                        <p class="card-text">
                            Price : <span class="fw-bold">{{ item.Price }}</span> MMK
                        </p>
                        <p class="card-text">
                            Product Code : <span class="fw-bold">{{ item.ProductCode }}</span> 
                        </p>
                        <a href="#" class="card-link">Card link</a>
                        <a href="#" class="card-link">Another link</a>
                    </div>
                </div>
            </div>
        </template>
    </main>
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
