function showOrHidden(element) {
    let table = element;
    if (table.style.display == 'none') {
        table.style.display = 'block'

    } else {
        table.style.display = 'none';

    }

}

function checkUnCheckShowHidde(check, element){
    if (check.checked == true){
        element.style.display = 'block';

    }else{
        element.style.display = 'none';
    }

}
    (function($) {
    "use strict";

    // Add active state to sidbar nav links
    var path = window.location.href; // because the 'href' property of the DOM element is the absolute path
        $("#layoutSidenav_nav .sb-sidenav a.nav-link").each(function() {
            if (this.href === path) {
                $(this).addClass("active");
            }
        });

    // Toggle the side navigation
    $("#sidebarToggle").on("click", function(e) {
        e.preventDefault();
        $("body").toggleClass("sb-sidenav-toggled");
    });
})(jQuery);
