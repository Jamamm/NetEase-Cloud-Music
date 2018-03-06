$(function () {

    let id = location.search.match(/\bid=([^&]*)/)[1]

    $.get('./songs.json').then(function (response) {
        let songs = response
        let song = songs.filter(s => s.id === id)[0]
        let {url, name, lyric} = song

        initPlayer.call(undefined, url);
        initText(name, lyric)
        parseLyric.call(undefined,lyric)
    })

    function initText(name, lyric) {
        $('.song-description> h1').text(name)
    }

    //初始化播放器
    function initPlayer(url) {
        let audio = document.createElement('audio')
        audio.src = url
        audio.oncanplay = function () {
            audio.play()
            $('.disc-container').addClass('playing')
        }
        $(".page").on("click", function () {
            let playState = $(".disc-container").attr("class");
            if (playState === "disc-container playing") {
                audio.pause()
                $('.disc-container').removeClass('playing')

            } else {
                audio.play()
                $('.disc-container').addClass('playing')
            }
        })

             // 当前播放的秒数，然后把它变成分秒00:00:00的形式
            let seconds = audio.currentTime
            let munites = ~~(seconds / 60)
            let left = seconds - munites * 60
            let time = `${pad(munites)}:${pad(left)}`
            let $lines = $('.lines > p')
            let $whichLine
            for(let i = 0; i< $lines.length; i++){
                let currentLine = $lines.eq(i).attr('data-time')
                let nextLineTime = $lines.eq(i+1).attr('data-time')
                if($lines.eq(i+1).length !== 0 && currentLine < time && nextLineTime > time){
                    $whichLine = $lines.eq(i)
                    break
                }
            }
            if($whichLine){
                $whichLine.addClass('active').prev().removeClass('active')
                let top = $whichLine.offset().top
                let linesTop = $('.lines').offset().top
                let delta = top - linesTop - $('.lyric').height()/3
                $('.lines').css('transform',`translateY(-${delta}px)`)  //这里找了bug找了半天，你可长点心吧（``和''分不清吗！！）！！！

            }

    }

    //当前播放的秒数，把它变成分秒00:00:00的形式
    function pad(number) {
        return number>= 10 ? number + '' : '0' + number
    }
    //歌词加载
    function parseLyric(lyric) {
        let array = lyric.split('\n')
        let regex = /^\[(.+)\](.*)$/
        array = array.map(function (string, index) {
            let matches = string.match(regex)
            if (matches) {
                return {time: matches[1], words: matches[2]}
            }
        })
        let $lines = $('.lines')
        array.map(function (object) {
            if (!object) {
                return
            }
            let $p = $('<p>')
            $p.attr('data-time', object.time).text(object.words)
            $p.appendTo($lines)
        })
    }

})