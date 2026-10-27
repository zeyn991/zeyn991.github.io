/*global jQuery */
"use strict";

jQuery(function ($) {

    var slider = $("#gallery-slider");
    var pager = $("#gallery-pager");

    function updatePager() {
        var dots = $("#gallery-dots li");
        var total = dots.length;
        var current = dots.index(dots.filter(".slick-active")) + 1;

        if (current < 1) {
            current = 1;
        }
        pager.text("Страница " + current + " из " + total);
    }

    slider.on("init reInit afterChange breakpoint", updatePager);

    slider.slick({
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: false,
        dots: true,
        appendDots: $("#gallery-dots"),
        prevArrow: "<button type=\"button\" class=\"gallery-arrow gallery-prev\" aria-label=\"Назад\">&#8592;</button>",
        nextArrow: "<button type=\"button\" class=\"gallery-arrow gallery-next\" aria-label=\"Вперёд\">&#8594;</button>",
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

});
