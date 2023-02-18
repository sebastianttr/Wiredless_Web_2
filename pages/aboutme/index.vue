<template>
  <div>
    <div class="layoutContainer1">
        <h1>Hi!</h1>
        <p class="mainText1">
            My name is Sebastian. I am a Web Developer with a experience in frontend/backend as well as some mobile development from Austria.
            <br>
            <br>
            I enjoy creating useful Web Apps and beautiful, eye-catching websites. I have always been interested in making good
            looking and simple user interfaces and enhancing it with a pleasant user experience.
            <br>
            <br>
            <br>
            I have been programming for 7 years, eversince i started playing around with arduino. I have been getting my hands dirty with
            native mobile development, web development and ui/ux design during my time in high school studying electrical engineering.
            I am currently a student at the University of Applied Sciences in St. Pölten in the Creative Computing study programme.
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

const skillSetData = [
  {
    title: "Frontend",
    description:`
      Proficiency in HTML5, CSS and JS ES8 and Vue.
      Also have experience with other technologies such as ASP.NET Blazor and React
    `,
    images:[
      {
        src:"../assets/iconImages/HTML.png",
        title:"HTML5",
        alt:"Icon of HTML"
      },
      {
        src:"../assets/iconImages/CSS.png",
        title:"CSS",
        alt:"Icon of CSS"
      },
      {
        src:"../assets/iconImages/javascript.png",
        title:"JavaScript",
        alt:"Icon of JavaScript"
      },
      {
        src:"../assets/iconImages/vue.png",
        title:"Vue",
        alt:"Icon of Vue"
      }
    ]
  },
  {
    title: "Backend",
    description:`
      I have been using Node and Spring Boot in numerous project,
      coupled with databases to create micro services.
    `,
    images:[
      {
        src:"../assets/iconImages/node.png",
        title:"Node",
        alt:"Icon of Node"
      },
      {
        src:"../assets/iconImages/springboot.png",
        title:"Spring Boot",
        alt:"Icon of Spring Boot"
      },
      {
        src:"../assets/iconImages/MySQL.png",
        title:"MySQL",
        alt:"Icon of MySQL"
      },
      {
        src:"../assets/iconImages/postman.png",
        title:"Postman",
        alt:"Icon of Postman"
      }
    ]
  },
  {
    title: "UI/UX Design",
    description:`
      Design is one of the most important aspects of any kind of user interface.
      I like a modern responsive look that feels alive when interacting.
    `,
    images:[
      {
        src:"../assets/iconImages/figma.png",
        title:"Figma",
        alt:"Icon of Figma"
      },
      {
        src:"../assets/iconImages/illustrator.png",
        title:"Illustrator",
        alt:"Icon of Illustrator"
      }
    ]
  },
  {
    title: "Web Deployment",
    description:`
      One of the most useful tools for deploying a
      web application is Nginx and Docker, which i have been using on a DO Linux VM.
    `,
    images:[
      {
        src:"../assets/iconImages/nginx.png",
        title:"NGINX",
        alt:"Icon of NGINX"
      },
      {
        src:"../assets/iconImages/docker.png",
        title:"Docker",
        alt:"Icon of Docker"
      },
      {
        src:"../assets/iconImages/digitalOcean.png",
        title:"DigitalOcean",
        alt:"Icon of DigitalOcean"
      },
      {
        src:"../assets/iconImages/MySQL.png",
        title:"MySQL",
        alt:"Icon of MySQL"
      }
    ]
  },
]

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

onMounted(() => {
  scrollHandler.value = new ScrollAnimationHandler();
  setIntersectionObserver();
  attachAllElements();
})




</script>

<style>

.layoutContainer1{
  display:flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  margin-top: 10vh;
  height: calc(100vh - 100px);
  color:white;
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
  margin: 0vh 0vh 10vh 0;
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