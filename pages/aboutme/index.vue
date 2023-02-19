<template>
  <div>
    <div class="layoutContainer1">
        <h1>Hi!</h1>
        <p class="mainText1">
            My name is Sebastian. I am an experience developers with experience in fields such as web development, mobile development and embedded development. 
            <br>
            <br>
            I enjoy creating useful Web Apps and beautiful, eye-catching websites. I have always been interested in making good
            looking and simple user interfaces and enhancing it with a pleasant user experience.
            <br>
            <br>
            <br>
            I have been getting my hands dirty with native mobile development, web development and ui/ux design during my time in high school studying electrical engineering.
            I am currently a student at the University of Applied Sciences in St. Pölten in the Creative Computing study programme and work as junior developer in Vienna.
        </p>
    </div>

    <div class="layoutContainer2 scrollAppearContainer">
        <AnimatedText
          id="skillSetTitle"
          class="mb-md"
          :title="'skillset'"
          :fontSize="'45px'"
          :color="'#bf360c'"
          :start="scrollAppearElements[0].state">
        </AnimatedText>
        <div class="skillSetItems">
            <SkillsetItem v-for="(item,index) in skillSets" :key="index*1000" :dataSet="skillSets[index]" class="scrollAppearItem"></SkillsetItem>
        </div>
    </div>
  </div>
  
</template>

<script setup>
import { ref, onMounted  } from 'vue';
import ScrollAnimationHandler from "~/handler/ScrollAnimationHandler"
import AssetsLoader from "~/handler/AssetsLoader"

let assetsLoader = new AssetsLoader();

const skillSetData = ref([])

let startProgressBarAnimation = ref(false)
let scrollHandler = ref(null)
let intersectionObserver = ref(null)
let skillSets = ref(skillSetData)
let scrollAppearElements = ref(
  [
    {
      id:"skillSetTitle",
      state: false
    }
  ]
)

function getDOMel(id){
  return document.getElementById(id);
}

function attachAllElements(){
  scrollAppearElements.value.forEach(item => {
    intersectionObserver.value.observe(getDOMel(item.id));
  });
}

function setIntersectionObserver(){
  intersectionObserver.value = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        scrollAppearElements.value.filter(item => entry.target.id == item.id)[0].state = true;
      }
    });
  });
}

const loadSkillSetData = async () => {
  skillSetData.value = (await assetsLoader.loadFromJSON("aboutMeData")).skillSetData
}

onMounted(() => {
  scrollHandler.value = new ScrollAnimationHandler();
  setIntersectionObserver();
  attachAllElements();
  loadSkillSetData();
})




</script>

<style>

.layoutContainer1{
  display:flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  height: calc(100vh - 100px);
  color:white;
  margin: 5vh 32px 0px 32px;
}

.layoutContainer1 h1 {
  opacity: 1;
  margin-top: 0px;
  margin-bottom: 50px;
  animation: appearUp 1s ease-in-out;

}

@keyframes appearUp {
  0% {
    opacity: 0;
    margin-top: 100px;
  }
  100%{
    opacity: 1;
    margin-top: 0px;
  }
}

.layoutContainer2{
  display:flex;
  justify-content: center;
  align-items: center;
  flex-flow: column wrap;
  margin: 40vh 0vh 10vh 0;
}

.mainText1{
  opacity: 1;
  margin-top: 0px;
  text-align: center;
  font-size: 20px;
  animation: appearUp 2s ease-in-out;
  width: 50vw;
  text-align: justify;
}

.skillSetTitle{
  width: 40vw;
  text-align: center;
  color:#bf360c;
  margin-bottom: 10px;
}

.skillSetItems{
  width: 75vw;
  display:flex;
  justify-content:center;
  align-items: stretch;
  flex-wrap: wrap;
  gap:10px
}

#skillSetTitle{
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
}

@media only screen and (max-width: 768px) {
  .mainText1 {
    width: auto;
  }

  .skillSet{
    width: 100vw;
  }
}
</style>