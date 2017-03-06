var p = 0,
    obj_array = [],
    rate_array = [],
    i_array = [],
    peralax_call = 0,
    scrollknight;
scrollknight = {
    peralax: function() {
        peralax_call = 1
    },
    scroll: function(menu, offset, active_class) {
        var l_id,
            menu_height = menu.height(),
            menu_items = menu.find("a");
        scroll_div = menu_items.map(function() {
            var item = $($(this).attr("href"));
            if (item.length) {
                return item;
            }
        });
        menu.click(function(event) {
            $("ul.links li.active").removeClass(active_class)
            $(this).addClass(active_class)
                /* Act on the event */
            event.preventDefault()
            var scroll = $(this).children('a').attr('href');
            var scroll_dist = ($(scroll).offset().top) - offset
                //  $(window).scroll(scroll_dist)
            TweenMax.to(window, 0.3, {
                scrollTo: scroll_dist
            });
        });

        $(window).scroll(function() {
            win_scroll(offset, active_class, menu_height, menu_items, scroll_div, l_id)
        });
    },
}

function win_scroll(offset, active_class, menu_height, menu_items, scroll_div, l_id) {
    var dist = $(this).scrollTop() + menu_height + offset;
    var cur = scroll_div.map(function() {
        if ($(this).offset().top < dist)
            return this;
    });
    cur = cur[cur.length - 1];
    var id = cur && cur.length ? cur[0].id : "";
    if (l_id !== id) {
        l_id = id;
        menu_items
            .parent().removeClass(active_class)
            .end().filter("[href='#" + id + "']").parent().addClass(active_class);
    }
}