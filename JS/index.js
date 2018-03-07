$(function () {
    setTimeout(function () {
        $.get('./songs.json', function (response) {
            let items = response;
            items.forEach((i) => {
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
    }, 300)


    //切换导航栏
    $('.narBar').on('click', 'ul.tabItems>li', function (e) {
        let $li = $(e.currentTarget).addClass('active')
        $li.siblings().removeClass('active')
        let index = $li.index()
        $li.trigger('tabChange', index)
        $('.tabContent > li').eq(index).addClass('active').siblings().removeClass('active')
    })

    //切换页面
    $('.narBar').on('tabChange', function (e, index) {
        let $li = $('.tabContent > li').eq(index)
        if ($li.attr('data-download') === 'yes') {
            return
        }
        if (index === 1) {
            $.get('./page2.json').then((response) => {

                let items = response;
                items.forEach((i) => {
                    let $ramking = $(`
                    <a href="./song.html?id=${i.id}" >
                        <div class="songs">
                            <div class="song1">${i.name}</div>
                            <div class="song2">${i.singer}--${i.album}</div>
                        </div>
                        <h3 class="orderNumber">${i.ranking}</h3>
                        <img src="./img/playmini.png" alt="">
                    </a>
                `)
                    $('#page2ranking').append($ramking)
                    $("#lastesMusicLoading2").remove()
                })
                $li.attr('data-download', 'yes')
            })
        } else if (index === 2) {
            return
            $.get('./page3.json').then((response) => {
                $li.text(response.content)
                $li.attr('data-download', 'yes')
            })
        }
    })

    let timer = undefined
    $('input#searchSong').on('input', function (e) {
        let $input = $(e.currentTarget)
        let value = $input.val().trim()
        if ($.value === '') {
            return
        }

        if (timer) {
            clearTimeout(timer)
        }

        timer = setTimeout(function () {
            search(value).then((result) => {
                timer = undefined
                if (result.length !== 0) {
                    $('#output').text(result.map((r) => r.name).join(','))
                } else {
                    $('#output').text('没有结果!我们没钱买服务器!搜索"告白气球"试试吧!')
                }
            })
        }, 300)
    })

    function search(keyword) {
        return new Promise((resolve, reject) => {
            var database = [
                {"id": "1", "name": "半岛铁盒",},
                {"id": "2", "name": "告白气球",},
                {"id": "3", "name": "安静",},
                {"id": "4", "name": "晴天",},
                {"id": "5", "name": "等你下课",},
                {"id": "6", "name": "简单爱",},
                {"id": "7", "name": "算什么男人",},
                {"id": "8", "name": "七月上",},
                {"id": "9", "name": "南",},
                {"id": "10", "name": "差三岁",},
            ]
            let result = database.filter(function (item) {
                return item.name.indexOf(keyword) >= 0
            })
            setTimeout(function () {
                resolve(result)
            }, (Math.random() * 200 + 1000))
        })
    }

    window.search = search
});
