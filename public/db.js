const db=firebase.firestore();
var shorturl=generate();
document.getElementById('form').addEventListener('submit',update);
function generate(){
    var digits = 'abc0d1e2f3g4hij5k6l7mnop8qrs9tuvwxyz'; 
    var short = ''; 
    for (i = 0; i < 6; i++ ) { 
        short += digits[Math.floor(Math.random() * 35)]; 
    } 
    return short; 
}
function check(fullurl){
    var docRef = db.collection("URL");
    docRef.get().then(doc=>{
        doc.docs.forEach(element => {
            if(fullurl==element.data().fullurl)
            {
                let id=element.id;
               docRef.doc(id).delete().then(function() {
                    console.log("Document successfully deleted!");
                }).catch(function(error) {
                    console.error("Error removing document: ", error);
                });
            }
        });
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });  
}
function update(e){
    e.preventDefault();
    var fullurl=document.getElementById('fullurl').value;
    check(fullurl);
    setTimeout(()=>{return submit(fullurl, shorturl)},4500);
}
function submit(fullurl, shorturl){
    var content = document.getElementsByClassName("card-disp");
    for (i = 0; i < content.length; i++) {
      content[i].style.display = "block";
    }
    document.getElementById('text').value=shorturl;
    db.collection('URL').doc(shorturl).set({
        fullurl: fullurl,
    }).then(function(){
        console.log("Database Updated!");
    }).catch(function(err){
        console.log("Error Found!",err);
    })
}
function op(){
    window.open('/'+shorturl);
}
function cop() {
    var copyText = document.getElementById('text');
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
    document.getElementById('cop').innerText='Short URL copied!'
  }