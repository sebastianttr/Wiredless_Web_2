<template>
    <footer :class="{ 'fixedBottom' : !fixedToBottom, 'footer':true}">
      <img src="/icons/favicon-512x512.png" class="logo" alt="Wiredless Logo">
      <div class="navigation">
        <div class="navigationItems" @click="$router.push('/imprint')">Imprint</div>
        <div class="navigationItems" @click="$router.push('/aboutme')">About Me</div>
      </div>
      <div class="smallMargin">©Sebastian Tatar | sebi.tatar2@gmail.com</div>
      <div class="smallMargin">2023</div>
    </footer>
</template>

<script setup lang="ts">
import { onUpdated, ref, watch } from 'vue';

const router = useRouter();

let fixedToBottom = ref(false)

const props = defineProps({
  contentHeight:{
    type: Number,
    required: true
  }
})

watch(
  () => router.currentRoute.value.name,
  (newValue, oldValue) => {
    console.log("Router change")
    fixedToBottom.value = props.contentHeight > window.innerHeight
  },
  { deep: true },
)

onUpdated(() => {
  fixedToBottom.value = props.contentHeight > window.innerHeight
})

onMounted(() => {
  fixedToBottom.value = props.contentHeight > window.innerHeight
  console.log("Content height: " + props.contentHeight)
  console.log(fixedToBottom.value)
})

</script>

<style>

body {
    margin-bottom:50px;
}
.fixedBottom{
  position: fixed;
  background-color: aliceblue;
  bottom: 0;
}

.footer {
  background-color: black;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  overflow: hidden;
  padding: 20px 0 20px 0;
  width: 100vw;
}

.logo{
  width:64px;
  height:64px;
  margin: 10px;
}

.navigation {
    display:flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    flex-direction: row;
    width: 100%;
}

.navigationItems {
    color: white;
    font-size: 1.1rem;
    margin: 10px;
    transition-duration: 500ms;
    transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
}

.navigationItems:hover {
    color: rgb(255, 121, 121);
}

.smallMargin{
    margin: 12px;
}


</style>