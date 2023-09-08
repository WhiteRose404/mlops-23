import anime from 'animejs/lib/anime.es.js';




export default function globeAnimation(loading) {
    let sphereEl = document.querySelector('.sphere-animation');
    let spherePathEls = sphereEl.querySelectorAll('.sphere path');
    let pathLength = spherePathEls.length;
    let aimations = [];
    let breathAnimation = anime({
        begin: function () {
            for (var i = 0; i < pathLength; i++) {
                aimations.push(anime({
                        targets: spherePathEls[i],
                        stroke: {
                            value: ['rgba(255,75,75,1)', 'rgba(0,10,0,.35)'],
                            duration: 500,
                        },
                        translateX: [2, -4],
                        translateY: [2, -4],
                        easing: 'easeOutQuad',
                        autoplay: false,
                }));    
            }
        },
        update: function (ins) {
            aimations.forEach(function (animation, i) {
                const divider = loading ? 20 : 4;
                var percent = (1 - Math.sin(i * 0.35 + 0.0022 * ins.currentTime)) / divider;
                animation.seek(animation.duration * percent);
            });
        },
        // change: function (ins) {
        //     aimations.forEach(function (animation, i) {
        //         const divider = loading ? 20 : 2;
        //         var percent = (1 - Math.sin(i * 0.35 + 0.0022 * ins.currentTime)) / loading;
        //         animation.seek(animation.duration * percent);
        //     });
        // },
        end: function () {
            aimations.forEach(function (animation) {
                animation.pause();
            });
        },
        duration: Infinity,
        autoplay: false,
    });
    let introAnimation = anime.timeline({autoplay: false}).add({
        targets: spherePathEls,
        strokeDashoffset: {
            value: [anime.setDashoffset, 0],
            duration: 3900,
            easing: 'easeInOutCirc',
            delay: anime.stagger(190, { direction: 'reverse' }),
        },
        duration: 2000,
        delay: anime.stagger(60, { direction: 'reverse' }),
        easing: 'linear',
    }, 0);
    const shadowAnimationDuration = loading ? 30000 : 6000;
    let shadowAnimation = anime({
        targets: '#sphereGradient',
        x1: '25%',
        x2: '25%',
        y1: '0%',
        y2: '75%',
        duration: shadowAnimationDuration,
        easing: 'easeOutQuint',
        autoplay: false,
    }, 0);
    return { breathAnimation, introAnimation, shadowAnimation };
}