// ana fonksiyon
function tdclick(elem){ 

    // tıkladığımız hücre boş değilse geri dön
    if(elem.innerHTML!="&nbsp;")
        return;

    // o an tahtadaki olabilecek sosları bul
    var potentialSoses = findSOSes();

    // oyuncu hamlesini yap
    elem.innerHTML = selectedText;
    
    // oyuncu tarafından bulunan sosları kontrol et
    for(var i = 0; i < potentialSoses.length; i++){
        
        // sos bulunan hücrenin id'si (integer)
        var sos_id = potentialSoses[i][1];
        
        // tıklanılan elemanın id'si (string)
        var elem_id = elem.id.substring(1);

        if(sos_id == elem_id){
            var coordinates = potentialSoses[i][0];
            drawLine(coordinates);
            addScore(turn);
            return;
        }
    }

    changeTurn();

    // sıra bilgisayardayken oyuncunun tıklama işlevini kapat
    $("body").css("pointer-events", "none");

    // 1 saniye sonra AIMove fonksiyonunu çağır
    setTimeout(AIMove, 1000); 
};

function AIMove(){

    // sosları bul
    soses = findSOSes();

    // tahtada sos olduğu sürece
    while(soses.length!=0){
        // sosları yerine koy
        placeSoses(soses);
        // ve yeniden sosları bul (çünkü yeni sos oluşmuş olabilir)
        soses = findSOSes();
    }
    // Oyunun bitip bitmediğini kontrol et
    checkAIEnd();

    // bitmediyse sırayı oyuncuya ver
    changeTurn();

    // oyuncu tıklamasını tekrar etkinleştir
    $("body").css("pointer-events", "");
}

function checkAIEnd(){
    // boş hücreleri say
    emptyCount = countEmpties();

    // boş hücre yoksa oyun bitmiş demektir
    if(emptyCount == 0){
        endGame();
        return;
    }
    // 1 tane boş hücre kalmışsa rastgele bir hareket yap ve oyunu bitir
    else if(emptyCount == 1){
        makeRandomMove();
        endGame();
    }
    // boş hücreler var ise rastgele hareket yap ve oyuna devam et 
    else{
        makeRandomMove();
    }
}