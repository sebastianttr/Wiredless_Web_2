<template>
    <div class="customLink">
        <div class="customLinkWrapper">
            <div class="customLinkText">
                {{props.text}}
            </div>
            <div class="customLinkLineWrapper">
                <div class="customLinkExpandLine"></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

const props = defineProps({
  text: String,
})

</script>

<style>

@font-face {
  font-family: "MontserratLight";
  src: url("assets/fonts/montserrat/Montserrat-Regular.ttf");
}

.customLink {
    color: white;
    cursor: pointer;
}

.customLinkWrapper{
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2px 5px 2px 5px;
    border-radius: 10px;
    overflow:hidden;
    background: transparent;
    transition: background 0.4s cubic-bezier(.03,1.12,.82,.99);
}

.customLinkText {
    font-family: "MontserratLight";
    font-size: 25px;
}

.customLinkLineWrapper {
    position: absolute;
    height: 5%;
    width: 100%;
    bottom: 0;
    transition: 0.3s;
    z-index: -1;
    display:flex;
    justify-content: center;
    align-items: center;
}

.customLinkExpandLine{
    background-color: #bf360c;
    border-radius:2px;
    height: 100%;
    width: 0%;
    transition: width 0.4s cubic-bezier(.03,1.12,.82,.99);
}

.customLink:hover .customLinkExpandLine {
    width: 100%;
}

.customLink:hover .customLinkWrapper{
    background: rgba(0, 0, 0, 0.1);
}

</style>
