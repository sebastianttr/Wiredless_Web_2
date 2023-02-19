

/**
 * 
 * A class to handle the dynamic scroll animation behaviour by getting the classes of the elements
 * 
 */

/*

    An example of how it should work in HTML

    <div class="scrollAppearContainer">
      <div class="scrollAppearItem">
        Content
      </div>
      <div class="scrollAppearItem">
        Content
      </div>
    </div>

*/

export default class ScrollAnimationHandler{
    thresholdStart;    
    thresholdEnd;
    animationType;
    scrollContainers = [];

    #START_OPACTIY = 0;
    #START_MARGIN_TOP = 100;

    constructor(thresholdStart = 0, thresholdEnd = 50,animationType = "appearUpOpacity"){
        // 
        this.thresholdStart = thresholdStart;
        this.thresholdEnd = thresholdEnd;
        this.animationType = animationType;

        this.getScrollElements();
        this.setScrollListener();
    }   

    /**
     * 
     * @description Gets all the elements from the DOM and pushes it to the stack
     * 
     */
    getScrollElements() {
        let scrollContainers = document.getElementsByClassName("scrollAppearContainer");


        for (let scrollContainer of scrollContainers) {
            let scrollItems =  scrollContainer.getElementsByClassName("scrollAppearItem");
            let scrollItemStack = [];

            for(let scrollItem of scrollItems){
                this.setItemProperties(
                    scrollItem,
                    {
                        opacity: +this.#START_OPACTIY,
                        marginTop: +this.#START_MARGIN_TOP + "px"
                    }
                );
                scrollItemStack.push(scrollItem);
            }
            
            this.scrollContainers.push(scrollItemStack);
        }

    }

    setItemProperties(item,props) {
        switch(this.animationType){
            case "appearUpOpacity": 
                item.style.opacity = props.opacity;
                item.style.marginTop = props.marginTop;
                break;
            default: 
                break;
        }
    }

    map(value, min1, max1, min2, max2) {
        return ((value - min1) * (max2 - min2)) / (max1 - min1) + min2;
    }

    setScrollListener(){
        window.addEventListener("scroll",() => {
            for(let scrollContainer of this.scrollContainers){
                for(let scrollItem of scrollContainer){
                    if(scrollItem.getBoundingClientRect().y - window.innerHeight <= 0){
                        let percentageOfAppear = 
                            this.map(
                                Math.abs(scrollItem.getBoundingClientRect().y - window.innerHeight),
                                window.innerHeight * this.thresholdStart/100,
                                window.innerHeight * this.thresholdEnd/100,
                                0,
                                100,
                            )
                        if(percentageOfAppear >= 100) percentageOfAppear = 100;

                        this.setItemProperties(
                            scrollItem,
                            {
                                opacity: percentageOfAppear/100,
                                marginTop: +(this.#START_MARGIN_TOP * (1 - percentageOfAppear/100)) +"px"
                            }
                        );
                    }   
                }
            }
        })
    }
}
