<template>
    <div class="progressBar" :style="`width:100%`">
        <div id="progression" :style="`width:${currentPercentage}%;`"/>
    </div>
</template>

<script>
export default {
    props:{
        percentage:{
            type:Number,
            required:true
        },
        width:{
            type:Number,
            required:true
        },
        start:{
            type:Boolean,
            required:true
        },
    },
    data(){
        return {
            timeStep:25,
            currentPercentage:0
        }
    },
    methods:{
        delay(t) {
            return new Promise(resolve => {
                setTimeout(() => resolve(), t);
            })
        },
        async startAnimation(){
            let v = this

            for (let i = 0; i < 100; i++) {
                this.currentPercentage = (1 - Math.exp(-0.085 * i)) * this.percentage;
                await this.delay(this.timeStep);
            }

        }
    },
    watch:{
        start(newVal){
            if (newVal){
                this.startAnimation();
            }
        }
    }
}
</script>

<style>

.progressBar {
    background-color: rgb(85, 85, 85);
    /*width: 300px;*/
    height: 30px;
    overflow: hidden;
    border-radius: 15px;
}

#progression {
    position: relative;
    width: 0%;
    height: 100%;
    background: linear-gradient(to right, #fdbb2d,#bf360c); 
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}


</style>