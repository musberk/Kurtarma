class UIdevloper{
    static devcontainer = document.getElementById("devcont");

    static addDeveloper(developers){
        developers.forEach(function(developer){
            UIdevloper.devcontainer.innerHTML+=`<div class="box carousel-item">
            <a href="${developer.url}"><img class="img_logo" src="${developer.img_path}" alt=""></a>
            <h3>${developer.name}</h3>
            <p>${developer.bio}</p>
        </div>`;
        });
    }
}