$(function () {
    setTimeout(function () {
        $.get('./songs.json', function (response) {
            let items = response;
            items.forEach((i)=>{
                let $li = $(`
            <li>
            <a href="./song.html?id=${i.id}">
            <h3>${i.name}</h3>
            <p>${i.singer}-${i.album} </p>
            <img src="./img/playmini.png" alt="播放">
            </a>
            </li>
            `)
                $('#lastesMusic').append($li)
            })
            $("#lastesMusicLoading").remove()
        })
    },300)
});