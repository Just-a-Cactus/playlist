;
(function () {
    const tmpl = document.querySelector('#tmpl').innerHTML;
    let list = document.querySelector('.ba-list__list');
    list.innerHTML = "";
    var playList = [{
            author: "led zeppelin",
            song: "stairway-to-heaven",
            duration: "7:32"
        },
        {
            author: "queen",
            song: "bohemian-rhapsody",
            duration: "5:53"
        },
        {
            author: "lynyrd skynyrd",
            song: "free-bird",
            duration: "6:14"
        },
        {
            author: "deep purple",
            song: "smoke-on-the-water",
            duration: "5:41"
        },
        {
            author: "jimi hendrix",
            song: "all-along-the-watchtower",
            duration: "4:01"
        },
        {
            author: "AC/DC",
            song: "back-in-black",
            duration: "4:15"
        },
        {
            author: "queen",
            song: "we-will-rock-you",
            duration: "3:54"
        },
        {
            author: "metallica",
            song: "enter-sandman",
            duration: "5:32"
        }
    ];

    playList.forEach(element => {
        let li = tmpl;

        li = li
            .replace(/{{author}}/ig, element.author)
            .replace(/{{song}}/ig, element.song)
            .replace(/{{duration}}/ig, element.duration);
        list.innerHTML += li;
    });

    let playButtons = document.querySelectorAll('.playButton');
    playButtons.forEach(element => {
        element.addEventListener('click', play);
    });

    let pauseButtons = document.querySelectorAll('.pauseButton');
    pauseButtons.forEach(element => {
        element.addEventListener('click', pause);
    });

    var audio;

    function play(params) {

        //stop first sound
        if (audio != null) {
            audio.pause();
        }

        let searching = this.closest('li');
        searching = searching.nextElementSibling;
        searching = searching.querySelector('progress');
        let duration = this.closest('.ba-flex').getAttribute('seconds');
        duration = duration.split(':');
        duration = duration[0] * 60 + duration[1] * 1;

        searching.max = duration;

        this.style.cssText = "display: none;";

        //found pause button
        let flex = this.closest('.ba-flex');
        flex.querySelector('.pauseButton').style.cssText = "display: block;";

        //if new song drop all progress
        let tryAudio = 'music/' + flex.getAttribute("song") + '.mp3';

        if (audio === undefined) {

            audio = new Audio('../music/' + flex.getAttribute("song") + '.mp3');
            audio.play();

        } else {

            if (audio.src.indexOf(tryAudio) > -1) {
                audio.play();
            } else {
                audio = new Audio('../music/' + flex.getAttribute("song") + '.mp3');
                audio.play();
            }
        }

        hideZeroProgress();
        progress(searching);
    }

    function pause(params) {
        audio.pause();

        this.style.cssText = "display: none;";

        //found play button
        let flex = this.closest('.ba-flex');
        flex.querySelector('.playButton').style.cssText = "display: block;";
    }

    function progress(pr) {
        pr.style.cssText = "display: block;";

        if (!audio.paused) {
            pr.value++;
            if (pr.value < pr.max)
                setTimeout(function () {
                    progress(pr);
                }, 1000);
        }
    }

    function makeZeroProgress(params) {
        let allProgress = document.querySelectorAll('progress');
        allProgress.forEach(element => {
            element.value = 0;
        });
    }

    function hideZeroProgress(params) {
        let allProgress = document.querySelectorAll('progress');
        allProgress.forEach(element => {
            element.style.cssText = "display: none;";
        });
    }
})();