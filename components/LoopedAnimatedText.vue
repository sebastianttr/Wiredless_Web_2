<template>
    <p :style="paragraphStyle">
        {{titleProcessed}}
    </p>
</template>
<script>

const randomCharacters = [
    "$","%",">","-","#","+","~","!","?","@"
]

const maxIter = 5;

String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

export default {
    props:{
        titles: {
            type: Array,
            required: true,
        },
        fontSize: {
            type: String,
            required: true,
        },
        start:{
            type:Boolean,
            required:true
        },
        color: {
            type: String,
            required:true
        },

    },
    data(){
        return {
            titleProcessed: "",
            paragraphStyle: {},
            titlesIndex:0
        }
    },
    async beforeMount(){
        // set the styling
        this.paragraphStyle = {
            'font-size':this.$props.fontSize,
            'color':this.$props.color
        }

        this.setStartTitle();

        if(this.start){
            this.runAnimation();
        } 
    },
    methods:{
        delay(t) {
            return new Promise(resolve => {
                setTimeout(() => resolve(), t);
            })
        },
        minmax(value, min, max){
            if(value <= min)
                return min;
            else if(value >= max){
                return max;
            }
            else return value
        },
        async setStartTitle(){
            // set the default text -> a string of text with the length of the title prop
            this.titleProcessed = "";

            return new Promise((resolve) => {
                let interval = setInterval(()=> {
                    this.titleProcessed += randomCharacters[~~(Math.random()*randomCharacters.length)];
                    if(this.titleProcessed.length >= this.$props.titles[this.titlesIndex].length){
                        clearInterval(interval)
                        resolve();
                    }
                },30)
            })
        },
        refresh(){
            let procLen = this.titleProcessed.length

            let interval = setInterval(()=> {
                this.titleProcessed = this.titleProcessed.substring(0,procLen);
                
                if(this.titleProcessed.length === 0){
                    clearInterval(interval)
                    this.runAnimation();
                }
                else{
                    procLen--;
                }
            },30)
            
        },
        async runAnimation(setStart = true){
            if(setStart)
                await this.setStartTitle();

            let receivedCharsIndex = [];
            let title = this.$props.titles[this.titlesIndex];
            let newString = this.titleProcessed;
            
            while(newString !== title){
                //random index
                let randomIndex = Math.floor(Math.random()*newString.length);
                if(receivedCharsIndex.includes(randomIndex)){
                    continue;
                }    

                // decide randomly if the char gets it character
                let getsChar = Math.round(Math.random()*10);
                if(getsChar > 5){
                    receivedCharsIndex.push(randomIndex);
                    newString = newString.replaceAt(
                        randomIndex,
                        title.charAt(randomIndex)
                    );
                    //console.log(newString)
                    await this.delay(50);
                } 
                else {
                    newString = newString.replaceAt(
                        randomIndex,
                        randomCharacters[Math.floor(Math.random() * randomCharacters.length)]
                    );
                    //console.log(newString)
                    await this.delay(50);
                }

                this.titleProcessed = newString;
            }

            this.titlesIndex = (this.titlesIndex + 1) % this.$props.titles.length;
            await this.delay(3000);

            this.refresh();
        }
    },
    watch: {
        async start(newVal){
            if(newVal === true){
                this.runAnimation(false);
            }
        },
    }
}
</script>
<style>
p{
    margin: 0;
    padding: 0;
}
</style>