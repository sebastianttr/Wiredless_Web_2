<template>
  <div>
    <div id="main">
      <div class="mainContent fit column wrap justify-center items-start content-center q-ml-md q-mr-md">
        <h1 class="myHeader1">Hello!</h1>
        <h1 class="myHeader2">Welcome to WiredLess</h1>
        <div>
          <span class="text-h4 mr-sm">I'm Sebastian, a</span>
          <LoopedAnimatedText
            id="animatedText"
            :titles="animatedTextContents"
            :fontSize="'45px'"
            :color="'#bf360c'"
            :start="true"
            />
        </div>
      </div>
    </div>

     <div id="projects" class="projectsContent">
      <AnimatedText
        id="projectsTitle"
        :title="'My work.'"
        :fontSize="'50px'"
        :color="'#bf360c'"
        :start="scrollAppearElements[0].state">
      </AnimatedText> 
      <div class="myProjectsBox scrollAppearContainer">
        <div v-for="(project,index) in projectsList" :key="index*3000" class="myProjectCards scrollAppearItem" @click="redirect(project.link)">
          <img :src="project.img" alt="Picture of one of my project">
          <span>
            <p class="myProjectsCardTitle">{{project.title}}</p>
            <div class="myProjectCardSeparator"/>
            <p class="myProjectsCardDesc">{{project.desc}}</p>
          </span>
        </div>
      </div>
    </div>


    <!-- Change this design please -->
    <!-- <div id="tryouts" class="tryoutsContent fit column wrap justify-center items-center content-center q-ma-md q-mt-xl">
       <AnimatedText
        id="tryOutsTitle"
        class="q-mb-sm"
        :title="'Tryouts.'"
        :fontSize="'50px'"
        :color="'#bf360c'"
        :start="scrollAppearElements[1].state">
      </AnimatedText>
      <div class="flex column justify-center items-center content-center scrollAppearContainer">
        <div
          v-for="(item,index) in tryouts"
          :key="index"
          class="fit column wrap justify-center items-center content-center q-ma-md q-pa-md scrollAppearItem"
          style="color:white;"
        >
          <video class="tryoutVideo" autoplay loop muted webkit-playsinline playsinline>
            <source :src="item.videopath" type="video/mp4">
          </video>
          <div style="font-size:35px; margin:10px; text-align:center;">{{item.title}}</div>
          <div style="font-size:15px; margin:10px; text-align:center;">{{item.description}}</div>
           <q-btn
            class="q-ma-md"
            outline
            color="deep-orange-10"
            label="Try It Out"
            @click="redirect(item.link)"
          /> 
        </div>
      </div>
    </div> -->


    <!-- Socials Section -->
    <div id="socials" class="flexBoxColumnCenter">
      <AnimatedText
        id="socialsTitle"
        :title="'Socials.'"
        :fontSize="'50px'"
        :color="'#bf360c'"
        :start="scrollAppearElements[1].state">
      </AnimatedText> 
      <div class="flexBoxColumnCenter">
        <div class="cardSocials" @click="redirectInsta()">
          <img class="socials_icon" src="~/assets/images/instagram_logo.png">
          <div>Instagram</div>
          <div style="font-size:25px">@wired_less_maker</div>
        </div>
        <div class="cardSocials" @click="redirectGithub()">
          <img class="socials_icon" src="~/assets/images/github_logo.png">
          <div>Github</div>
          <div style="font-size:25px">wired_less_maker</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from "vue"
import ScrollAnimationHandler from "~/handler/ScrollAnimationHandler";

let intersectionObserver = ref(null)
let scrollAppearHandler = ref(null)

const projectsList = ref(
  [
    {
      title:"ThingsDash",
      desc:"An app for visualizing internet of things devices in various areas",
      img:"assets/images/pictures_frontpage/ThingsDash.png",
      link:"https://github.com/sebastianttr/ThingsDash"
    },
    {
      title:"Mecanum Wheel Robot",
      desc:"A robot with mecanum wheels able to move in any direction.",
      img:"assets/images/pictures_frontpage/MecanumWheelRobot.png",
      link:""
    },
    {
      title:"Presentr",
      desc:"A web app for sharing live captures from remote resources",
      img:"assets/images/pictures_frontpage/Presentr.png",
      link:"https://presentr.wiredless.io/"
    },
    {
      title:"Gmail2ECM",
      desc:"A web app for sharing live captures from remote resources",
      img:"assets/images/pictures_frontpage/Gmail2ECM.png",
      link:"https://www.gmail2ecm.com/"
    },
    {
      title:"Room Quality Mobile/Web App",
      desc:"A roomquality Mobile/Web App for monitoring the Temps & CO2-Levels in classrooms",
      img:"assets/images/pictures_frontpage/RaumklimaAppPNG.png",
      link:"https://github.com/sebastianttr/raumklima_mobile_app"
    },
    {
      title:"EXOCars",
      desc:"A static website for buying/selling special kinds of cars",
      img:"assets/images/pictures_frontpage/EXOCars.png",
      link:"https://cc211004.students.fhstp.ac.at/iwt/index.html"
    },
  ]
)

// load with fetch next time
const animatedTextContents = ref([
  "Web Developer.",
  "Student.",
  "Maker.",
  "Web Designer.",
  "Developer."
])

let scrollAppearElements = ref([
  {
    id:"projectsTitle",
    state: false
  },
  // {
  //   id:"tryOutsTitle",
  //   state: false
  // },
  {
    id:"socialsTitle",
    state: false
  },
])

function getDOMel(id){
  return document.getElementById(id);
}

function redirectInsta() {
  window.location.href = "https://www.instagram.com/wired_less_maker/";
}
function redirectGithub() {
  window.location.href = "https://github.com/sebastianttr";
}

onMounted(() => {
  intersectionObserver.value = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        scrollAppearElements.value.filter(item => entry.target.id == item.id)[0].state = true;
      }
    });
  });

  scrollAppearElements.value.forEach(item => {
    console.log(getDOMel(item.id) instanceof HTMLElement)
    intersectionObserver.value.observe(getDOMel(item.id));
  });

  scrollAppearHandler.value = new ScrollAnimationHandler(0,40);

  addLinkScrollEventHandler();

})

const scrollToSection = (sectionId) => {
  const yOffset = -60;
  const ele = document.getElementById(sectionId); // You need to get your element here
  const y = ele.getBoundingClientRect().top + window.pageYOffset + yOffset;
  window.scrollTo({ top: y, behavior: "smooth" });
}

const addLinkScrollEventHandler = () => {
  window.addEventListener("scrollToHome",() => {
    scrollToSection("main")
  })
  window.addEventListener("scrollToProjekts",() => {
    scrollToSection("projects")
  })
  window.addEventListener("scrollToSocials",() => {
    scrollToSection("socials")
  })
}



</script>

<style>

h1{
  margin: 0;
  padding: 0;
}

.fullSize{
  width: 100%;
  height: 20vh;
}

.text-h4 {
  font-size:x-large;
}

#main {
  position: relative;
  width: 100%;
  height: calc(100vh - 100px);
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  flex-direction: column;
  flex-wrap: wrap;
  overflow: hidden;
}


.myHeader1{
  font-size: 4em;
  margin:0;
  font-family: "MontserratSemiBold";
  color:#bf360c;
}

.myHeader2{
  margin:0;
  font-size: 4em;
  color: white;
  font-family: "MontserratBold";
}


#animatedText{
  display: inline;
  opacity: 1;
  transition: opacity 0.2s ease-in-out;
}

.mainContent{
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  overflow:hidden;
  color:white;
}


.projectsContent{
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
}

.myProjectsBox{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: row wrap;
  overflow: hidden;
}

.tryoutsContent{
  width: 100%;
  overflow: hidden;
}

#projectsTitle{
  margin: 32px;
  overflow: hidden;
}

.myProjectCards{
  position: relative;

  height: 300px;
  flex-grow: 1;
  padding: 0;

  min-width: 500px;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column nowrap;

  overflow:hidden;
  cursor:pointer;
}

.myProjectCards:hover span{
  opacity: 1;
  background-color: rgba(0, 10, 12, 0.6);
  padding-top:0px;
}

.myProjectCards:hover img{
  filter: blur(2px);
}

.myProjectCards:hover span .myProjectCardSeparator{
  width: 40%;
}

.myProjectCards img{
  position: absolute;
  top:0;
  object-fit: fill;
  width: 100%;
  filter: none;
  transition: filter 0.3s ease-in-out;
}

.myProjectCards span{
  position: absolute;
  width:100%;
  height: 100%;
  padding-top:50px;

  display:flex;
  justify-content: center;
  align-items: center;
  flex-flow:column nowrap;

  color:white;

  opacity: 0;
  background-color: transparent;
  transition:
    opacity 0.3s ease-in-out,
    background-color 0.2s ease-in-out,
    padding-top 0.8s cubic-bezier(.03,1.12,.82,.99);

}

.myProjectsCardTitle{
  font-family: "MontserratBold";
  margin:0;
  padding: 0;
  bottom: 0;
  font-size: 2.8em;
  width:80%;
  text-align: center;
  overflow-wrap: break-word;
  overflow: hidden;
}

.myProjectCardSeparator{
  background-color:#bf360c;
  height: 2px;
  width: 0;
  transition: width 0.5s cubic-bezier(.03,1.12,.82,.99) 0.3s;
  border-radius: 100px;
}

.myProjectsCardDesc{
  font-family: "MontserratSemiBold";
  bottom: 0;
  margin:0;
  padding: 0;
  font-size: 1.6em;
  width:80%;
  text-align: center;
  overflow-wrap: break-word;
  overflow: hidden;
}

.flexBoxColumnCenter{
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  flex-direction: column;
  flex-wrap: wrap;
}

.cardSocials {
  border: solid #151515;
  background: #151515;
  border-radius: 10px;
  margin: 10px;
  box-shadow: 2px 2px 15px rgba(0, 10, 12, 0.8);
  color: white;
  width: 400px;
  padding: 10px;
  transition: 500ms;
  cursor: pointer;
}

#socials{
  margin: 32px;
}

.cardSocials:hover {
  box-shadow: 2px 2px 15px #bf360c;
  transition: 500ms;
}

.socialsTitle{
  margin: 32px;
  overflow: hidden;
}

.socials_icon {
  margin-left: -3px;
  margin-top: -3px;
  margin-bottom: -1px;
  margin-right: 10px;
  border-style: hidden;
  border-radius: 10px;
  max-width: 120px;
  float: left;
  width: 100px;
  height: 100;
  object-fit: cover;
}









@media only screen and (max-width: 768px) {
  .card {
    width: 100%;
    height: auto;
  }
  .wiredlessTitle {
    font-size: 30px;
  }

  .cardSocials {
    width: 100%;
  }

  .contentViewPicture {
    width: 100%;
    height: auto;
    background-color: white;
  }

  .contentView3D {
    width: 100%;
  }

  .chipStyle {
    max-width: 100%;
  }

  .stackDesc {
    display: none;
  }

  .tryoutVideo {
    max-width: 92vw;
  }

  .myHeader1{
    font-size: 3em;
  }
  .myHeader2{
    font-size: 5em;
  }
}


</style>