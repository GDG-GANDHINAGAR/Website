$(function() {
    $('.slides img:first').addClass('top');

    var change = function() {
        var cur = $('.slides img.top');
        var next = cur.next();
        //        var anim_cur =
        //        var anim_next =
        if (!next.length) {
            next = $('.slides img:first');
            // next.addClass(top);

            function top() {
                cur.removeClass('top');
                next.addClass('top');
            }

            function reset() {
                cur.css({ bottom: "120vh" })
            }
            if (window.outerHeight > window.outerHeight) {
                TweenMax.to(cur, 1, {
                    bottom: '10vh',
                    onComplete: top
                })
                TweenMax.to(next, 1, {
                    bottom: '0',
                    onComplete: reset
                })
            } else {
                TweenMax.to(cur, 1, {
                    bottom: '10vh',
                    onComplete: top
                })
                TweenMax.to(next, 1, {
                    bottom: '0',
                    onComplete: reset
                })
            }

        } else {
            if (window.outerHeight > window.outerHeight) {
                TweenMax.to(cur, 1, {
                    bottom: '10vh',
                    onComplete: top
                })
                TweenMax.to(next, 1, {
                    bottom: '0',
                    onComplete: reset
                })
            } else {
                TweenMax.to(cur, 1, {
                    bottom: '10vh',
                    onComplete: top
                })
                TweenMax.to(next, 1, {
                    bottom: '0',
                    onComplete: reset
                })
            }

            function top() {
                cur.removeClass('top');
                next.addClass('top');
            }

            function reset() {
                cur.css({ bottom: "120vh" })
            }
        }
        // console.log("loop")
    }
    setInterval(change, 2000);
});

var swiper = new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    slidesPerView: 4,
    centeredSlides: false,
    paginationClickable: true,
    spaceBetween: 10,
    grabCursor: true,
    lazyLoading: true,
    breakpoints: {
        1350: {
            slidesPerView: 3,
            spaceBetween: 10
        },
        1000: {
            slidesPerView: 2,
            spaceBetween: 10
        },
        650: {
            slidesPerView: 1,
            spaceBetween: 10
        }
    }
});
scrollknight.scroll($("li.link"), 0, "active")