<template>
    <div class="navbar">
        <nav class="nav">
            <div class="header">
                <div class="headerWrapper">
                    <div class="headerLogo" @click="$router.push('/')">
                      <img src="/icons/favicon-512x512.png" alt="Wiredless Logo">
                      <h4 class="title">WiredLess</h4>
                    </div>
                    <div class="headerLinks" ref="headerLinks">
                      <div class="" v-for="(navLink,index) in props.navLinks" :key="index*100">
                        <CustomLink @click="goTo(navLink.action)" :text="navLink.title" />
                      </div>
                    </div>
                </div>
            </div>
        </nav>

        <div class="headerMobile">
            <div class="mobileLogo">
                <img class="mobileLogoImg" @click="$router.push('/')" src="/icons/favicon-512x512.png" alt="Wiredless Logo">
                <img class="mobileLogoDropDown" @click="showMobileMenu()" src="/assets/iconImages/menu.png" alt="Wiredless Logo">
            </div>

            <div class="responsiveNavMenu" :style="`height:${navBarLinkHeight}`">
              <div class="linksContainer">
                <div v-for="(navLink,index) in navLinks" :key="index*1000" @click="goTo(navLink.action)">
                  <h6 class="responsiveLinks">{{navLink.title}}</h6>
                  <hr class="linkSeparator ml-sm mr-sm ">
                </div>
              </div>
            </div>
        </div>
        
    </div>
</template>
<script setup lang="ts">

import CustomLink from './CustomLink.vue';
import { ref, onMounted, onBeforeMount, onBeforeUnmount } from 'vue';
import type { Ref } from 'vue'

const router = useRouter();

const myEvent = new Event('myevent', {
  bubbles: true,
  cancelable: true,
  composed: false
})

const events = [
  'scrollToTryouts',
  'scrollToSocials'
]

const emit = defineEmits(['scrollToTryouts','scrollToSocials'])

let headerLinks = ref(null)
let links: Ref<Link[]> = ref([])
let navBarLinkHeight: Ref<string> = ref("0px");

interface Link {
  title:string,
  action:string 
}

const props = defineProps({
  navLinks:{
    type: Array<Link>,
    required: true
  },
  disappearThreshold:{
    type: Number,
    default: window.innerHeight/2
  }
})

let navOpen:Boolean =  false;
let showMobileToolBarNav:Boolean = false;
let lastScrollPos: number = 0;
let isScrollingDown: Boolean = false;


watch(
  () => props.navLinks,
  (newValue, oldValue) => {
    console.log("Nav links changed.")
    if(headerLinks.value){
      (headerLinks.value as HTMLElement).style.display = "none"
      links.value = newValue;
      applyAnimation();
      (headerLinks.value as HTMLElement).style.display = "flex"

    }
  },
  { deep: true },
)


const goTo = (actionName:string) => {
  navBarLinkHeight.value = `${props.navLinks.length * 0}px`

  // if the action starts with a "scrollTo"
  if(actionName.startsWith("scrollTo")){
    const pageName = actionName.substring(actionName.indexOf(":")+1,actionName.length);
    
    window.dispatchEvent(new Event(actionName))
  }
  else if(actionName.startsWith("navigateTo")){
    // get name of the page from this format :   navigateTo:aboutme
    const pageName = actionName.substring(actionName.indexOf(":")+1,actionName.length);
    router.push(`${pageName}`);
  }
}

const showMobileMenu = () => {
  console.log("Toggling mobilenav nav menu")
  navBarLinkHeight.value = `${props.navLinks.length * 61}px`
}

const handleScroll = () => {

    // Navbar things
    let scrollPosReached = window.scrollY >= 60;
    let toolbarEl = document.getElementsByTagName("nav")[0];
    toolbarEl.style.height = scrollPosReached?"80px":"100px";
    toolbarEl.style.boxShadow = scrollPosReached?"0px 0px 28px -1px #000000":"none";

    Array.from(document.getElementsByClassName('nav') as HTMLCollectionOf<HTMLElement>)[0].style.marginTop = lastScrollPos <= window.scrollY?"-100px":"0px";

    // reduce height based on scroll
    toolbarEl.style.marginTop =
      // if scrolling down and below window height
        (window.scrollY >= lastScrollPos && window.scrollY >= props.disappearThreshold)?
        "-100px":
        "0";
    lastScrollPos = window.scrollY;


    if(navBarLinkHeight.value != "0px"){
      navBarLinkHeight.value = "0px"
    }
}


// Lifecycle hooks

onMounted(() => {
  links.value = props.navLinks
  applyAnimation();
})

const applyAnimation = () => {

   // run header animation one by one with delay in between
  let headerLinksContainer = document.getElementsByClassName("headerLinks")[0].children;
  for(let i = 0;i<headerLinksContainer.length;i++){
    const headerLinkElement: HTMLElement = headerLinksContainer[i] as HTMLElement

    headerLinkElement.style.animation = `fadeInUp 0.8s cubic-bezier(.03,1.12,.82,.99) ${i * 0.2}s`;    
    headerLinksContainer[i].addEventListener("animationend",()=>{
      headerLinkElement.style.opacity = "1";
    })
  }
  console.log(props.navLinks);


  // get computed style in order to determine the height
  // get a element with that class name

  // get computed style height and save it.
  //navBarLinkHeight.value = Number(window.getComputedStyle(navBarEl).height.replace("px",""));
}

onBeforeUnmount(() => {
  document.removeEventListener("scroll", handleScroll);
})

onBeforeMount(() => {
  document.addEventListener("scroll", handleScroll);
})

</script>
<style>

.navbar {
  background-color: black;
  width: 100vw;
  z-index: 1000;
  position:fixed;
  top: 0;
  overflow:hidden;
  padding: 0;
  margin: 0;
}

.slide-fade-enter-active {
  transition: all 0.5s ease;
  transform: translateX(0px) rotate(0deg);
}
.slide-fade-leave-active {
  transition: all 0.5s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(200px) rotate(270deg);
}

.form {
  width: 100%;
  padding: 0 18px;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.2s ease-in-out;
}

.mobileNavs {
  font-size: 40px;
  background-color: white;
  pointer-events: none;
  margin-top: 20px;
}

.title {
  font-family: "MontserratSemiBold";
  display: flex;
  justify-content: center;
  align-items: center;
  top: 50%;
  font-size: 30px;
}

.footer {
  background-color: black;
  color: white;
}

.bg-white{
  background-color: white;
}

.mobileLogo{
  width: 100vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 0 24px 0 24px;
}

.mobileLogoImg{
  width: 64px;
}

.mobileLogoDropDown{
  width: 42px;
  transform: scaleX(-1);
  filter: brightness(0) invert(1);

}

nav{
  background-color: rgb(17, 17, 17);
  color:white;
  margin:0px;
  padding: 0px;
  position: fixed;
  height: 100px;
  box-shadow: none;
  overflow: hidden;
  transition:
    height 0.4s cubic-bezier(.03,1.12,.82,.99),
    box-shadow 0.4s cubic-bezier(.03,1.12,.82,.99),
    margin-top 0.7s cubic-bezier(.03,1.12,.82,.99);
}


.header {
  opacity: 1;
  transition: 300ms;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: row nowrap;
  height: 100%;
}

.headerWrapper{
  width: 70%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-flow: row nowrap;
  height: 100%;
}

.headerLogo{
  display:flex;
  justify-content: center;
  align-items: center;
  flex-flow: row nowrap;
  cursor: pointer;
}

.headerLogo img {
  width: 52px;
  height: 52px;
  margin-right: 12px;
}

.header h4{
  margin:0;
  padding:0;
}

.headerLinks{
  display:flex;
  align-items: center;
  justify-content: center;
  gap:15px;
  height: 100%;
}

.header:hover {
  opacity: 0.95;
  transition: 300ms;
}

.headerMobile {
  width: 100vw;
  height: 80px;
  display: none;
  transition: 0.5s ease-out;
  transition-delay: 0.5s;
}

.navigation {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 60px;
  background-color: rgba(0, 0, 0, 0.5);
  cursor:pointer;
}

.navigation:hover {
  color: #bf360c;
  transition: 500ms;
  background-color: rgba(0, 0, 0, 0.8);
}

.flexHorizontal {
  display: flex;
}

@keyframes fadeInUp {
    0%{
        margin-top: 50px;
        opacity: 0;
    }
    100%{
        margin-top: 0px;
        opacity: 1;
    }
}

.mobileToolBar{
  transition: margin-top 0.5s cubic-bezier(.03,1.12,.82,.99);
}


@media only screen and (max-width: 768px) {
  nav {
    display: none;
    background-color: #bf360c;
  }

  .headerMobile {
    display: flex;
  }
}

.responsiveNavMenu {
  position:fixed;
  display:flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width:100vw;
  overflow:hidden;
  box-shadow: 0px 5px 10px -5px rgba(255, 255, 255, 0.399);
  transition: height 1.0s cubic-bezier(.03,1.12,.82,.99);
}


.linkSeparator{
  margin: 0;
  padding: 0;
  color: azure;
}

.linksContainer{
  background-color: rgb(17, 17, 17);
  position: absolute;
}

.responsiveLinks {
  display: flex;
  justify-content: center;
  align-items: center;
  color:white;
  width:100vw;
  margin:0;
  padding:15px 0px 15px 0px;
  font-size: 1.5rem;
}



</style>
