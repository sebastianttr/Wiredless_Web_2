<template>
    <NavBar :navLinks="navBarLinks"></NavBar> 
    <div id="pageContent" ref="contentSlot">
      <slot/>
    </div>
    
    <Footer :contentHeight="contentHeight"></Footer>
</template>

<script setup>
import {ref , onUpdated, computed, onMounted} from "vue"
const router = useRouter();

const footerFixed = ref(false)
const contentSlot = ref(null)
const contentHeight = ref(0)

const indexNavBarLinks = [
  {
    title:"Home",
    action:"scrollToHome"
  },
  {
    title:"Projects",
    action:"scrollToProjekts"
  },
  // {
  //   title:"Try Out",
  //   action:"scrollToTryouts"
  // },
  {
    title:"Socials",
    action:"scrollToSocials"
  },
  {
    title:"About Me",
    action:"navigateTo:/aboutme"
  },
]

const aboutMeNavBarLinks = [
  {
    title:"Home",
    action:"navigateTo:/"
  },
  {
    title:"Imprint",
    action:"navigateTo:/aboutme"
  },
]



const navBarLinks = computed(() => {
  const routerName = router.currentRoute.value.name;
  if(routerName == "index"){
    console.log("Setting index links")
    return indexNavBarLinks;
  }
  else if(routerName == "aboutme"){
    console.log("Setting about me links")
    return aboutMeNavBarLinks;
  }
  else {
    return indexNavBarLinks;
  }
   
})

// not a good solution for the footer right now.

onUpdated(() => {
  contentHeight.value = contentSlot.value.offsetHeight
  //console.log("Called update in default layout: " + router.currentRoute.value.name)
  console.log("Content height default: " + contentHeight.value)
})

onMounted(() => {
  
  contentHeight.value = contentSlot.value.offsetHeight
  //console.log("Content height: " + contentHeight.value)
  console.log("Content height default: " + contentHeight.value)

})


</script>

<style>

body {
  margin: 0;
  padding: 0;
}

@font-face {
  font-family: "MontserratSemiBold";
  src: url("/assets/fonts/montserrat/Montserrat-SemiBold.ttf");
}

@font-face {
  font-family: "Montserrat";
  src: url("/assets/fonts/montserrat/Montserrat-Medium.ttf");
}

@font-face {
  font-family: "MontserratBold";
  src: url("/assets/fonts/montserrat/Montserrat-Bold.ttf");
}

body {
  padding: 0;
  margin: 0;
  margin-top: 100px;
  background-color: rgb(17, 17, 17);
}

#pageContent{ 
  width: 100vw;
  overflow: hidden;
  overflow-y: hidden;
}


.ml-sm{
  margin-left: 12px;
}

.ml-md{
  margin-left: 26px;
}

.ml-lg{
  margin-left: 42px;
}

.mr-sm{
  margin-right: 12px;
}

.mr-md{
  margin-right: 26px;
}

.mr-lg{
  margin-right: 42px;
}


.mb-sm{
  margin-bottom: 12px;
}

.mb-md{
  margin-bottom: 26px;
}

.mb-lg{
  margin-bottom: 42px;
}


.mt-sm{
  margin-top: 12px;
}

.mt-md{
  margin-top: 26px;
}

.mt-lg{
  margin-top: 42px;
}

</style>