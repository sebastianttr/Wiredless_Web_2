<template>
    <div class="skillSet">
      <div class="skillSetStack">
          <div v-for="(item,index) in dataSet.images" :key="index*2000" class="imgView">
              <img :src="item.src" :alt="item.alt">
              <p>{{item.title}}</p>
          </div>
      </div>
        
      <div class="skillSetSkillMain">
        <p class="skillSetSkillTitle">{{dataSet.title}}</p>
        <p class="skillSetSkillDesc">{{dataSet.description}}</p>
      </div>               
    </div>
</template>
<script>
export default {
    props:{
        dataSet: {
            type: Object,
            required: true,
        }
    }
}
</script>
<style>

.skillSet{
  position: relative;
  overflow: hidden;
  padding: 20px;
  width: 450px;
  background: rgb(58, 58, 58);
  border-radius: 10px;
  cursor:default;
  filter: none;
  color: white;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.377);
}

.skillSetSkillMain{
  transition: filter 0.3s ease-in-out;
}

.skillSetSkillTitle{
  margin:0;
  background: linear-gradient(to right, #fdbb2d,#bf360c); 
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-background-clip: text;  
}

.skillSetSkillDesc{
  margin:10px 0 10px 0;
}

.skillSet:hover .skillSetStack{
  opacity: 1;
}

.skillSet .skillSetStack{
  position: absolute;
  opacity: 0;
  background: rgba(0, 0, 0, 0.7);
  transition: opacity 0.3s ease-in-out;

  width:100%;
  height: 100%;
  left: 0;
  top:0;

  display: flex;
  justify-content: center;
  align-items: center;
  gap:10px;
}

.skillSetStack .imgView{
  display: flex;
  align-items: center;
  flex-flow: column;
  opacity:1;
}

.skillSetStack .imgView img{
  height: 50px;
  width: 50px;
  opacity:1;
}

.skillSetStack .imgView p{
  font-size: 1.3em;
  margin:0;
  padding: 0;
  text-align: center;
  background: rgba(255, 255, 255, 1);
  border-radius: 3px;
  color: black;
  margin-top: 4px;
  padding: 2px;
}

@media only screen and (max-width: 768px) {
  .skillSet{
    min-width: 80vw;
  }

}

</style>