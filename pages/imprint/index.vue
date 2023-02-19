<template>
    <div class="layoutContainer1">
        <div class="imprint"><b>Imprint</b></div>
        <div class="mainText">
            Sebastian Tatar
            <br>
            Herzogenburgerstraße 60/14
            <br>
            3100 St.Pölten
            <br>
            Austria
            <br>
            <br>
            <p><b>Contact:</b></p>
            sebi.tatar2@gmail.com
            <br>
            +43 660 6618501
        </div>
    </div>
</template>

<style>

.layoutContainer1{
  color:white;
  display:flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  text-align: left;
  margin: 160px 32px 0px 32px; 
  height: 60vw;
}

.mainText{
    width: 30vw;
    text-align: left;
    font-size: 20px;
}

.imprint{
    width: 30vw;
    font-size: 30px;
    margin-top: 60px;
    margin-bottom: 30px;
}

.wiredless{
    font-size:20px;
    cursor:pointer;
}

.footer1{
    background: black;
    overflow:hidden;
}

@media only screen and (max-width: 768px) {
  .imprint {
    width: auto;
  }

  .mainText {
    width: auto;
  }

  .layoutContainer1{
    align-items:flex-start;
  }
}

</style>