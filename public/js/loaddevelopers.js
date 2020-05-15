const developers=[];

developers.push(new Developers("Mustafa Berk Keleş","Jr.MachineLearingEng at Enuygun.com","https://www.linkedin.com/in/mustafa-berk-kele%C5%9F-a8782019a/","./img/developers/mustafaberk.jpg"));
developers.push(new Developers("Aytürk Keleş","Prof.Dr at IbrahimCecen Uni.","https://www.agri.edu.tr/ozgecmis.aspx?id=477&bid=4","./img/developers/ayturk_keles.jpg"))
developers.push(new Developers("Ali Keleş","Prof.Dr at IbrahimCecen Uni.","https://www.agri.edu.tr/ozgecmis.aspx?id=476&bid=4","./img/developers/ali_keles.jpg"))

document.addEventListener("DOMContentLoaded", ()=>{
    UIdevloper.addDeveloper(developers);
});
