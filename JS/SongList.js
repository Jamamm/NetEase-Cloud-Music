$(function () {
    $.get('./page2.json').then((response) => {
        let items = response;
        items.forEach((i) => {
            let $SongList = $(`
                    <a href="./song.html?id=${i.id}" >
                        <div class="songs">
                            <div class="song1">${i.name}</div>
                            <div class="song2">${i.singer}--${i.album}</div>
                        </div>
                        <h3 class="orderNumber">${i.ranking}</h3>
                        <img src="./img/playmini.png" alt="">
                    </a>
                `)
            $('#songLists').append($SongList)
            $("#lastesMusicLoading2").remove()
        })
    })
})
