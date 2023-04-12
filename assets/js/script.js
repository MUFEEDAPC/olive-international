$(document).ready(function() {
    let regexEmail = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    $("body").on("click", ".btn_action_eq", function() { userActions($(this)); });
    $("body").on("focus", ".has-error", function() {
        let $me = $(this);
        $me.removeClass("has-error");
        $me.parent().find("label span").html("");
    }); 
    $("body").on("keyup blur", ".alpha", function(){ 
		var node = $(this);
		node.val(node.val().replace(/[^a-z A-Z,.?]/g,'') ); 
	});
	$("body").on("keyup blur", ".num", function() {
        if (/\D/g.test(this.value)) 
			this.value = this.value.replace(/\D/g, ''); 
    });
	$("body").on("keyup blur", ".alpha_num", function() {
        $(this).val($(this).val().replace(/[^a-z A-Z,.?-]/g,''));
    });
    window.userActions = function($me) {
        let $act = $me.data("action"),
            data = new FormData(),
            $container_tag = '#popupWin',
            $container = $($container_tag),
            $err = false; 
        data.append("action", $act);
        data.append("id", $me.data("id"));
        switch($act) {
            case 'book_submit':
                $container.find(".required").each(function(){
                    let $inp = $(this);
                    if ($inp.val() == '') {
                        $err = true;
                        $inp.addClass("has-error");
                        $inp.parent().find("label span").html("required");
                    } else {
                        if ($inp.hasClass("email") && !regexEmail.test($inp.val())) { 
                            $err = true;
                            $inp.addClass("has-error");
                            $inp.parent().find("label span").html("invalid email");
                        }
                    }
                });
                break;
        }
        if ($err) return;
        $container.find(".input").each(function(){
            let $inp = $(this);
            data.append($inp.data("id"), $inp.val());
        });
        $me.addClass("is-loading");
        $.ajax({
            url: "/assets/inc/book-now/",
    		enctype: 'multipart/form-data', 
    		processData: false, 
    		contentType: false,
    		type: "post",
    		data: data,
    		async: true 
        }).done(function (response, textStatus, jqXHR) { 
            var jsonData = JSON.parse(response);
            if (jsonData.result == "success") {
                console.log(response);
                $container.html(jsonData.html);
                switch($act) {
                    case 'book_form':
                        // console.log("aaa");
                        $("#er_tour_date").datepicker({minDate : 0});
                        break;
                }
                $.magnificPopup.open({
                    items: {
                        src: $container_tag,
                        type: 'inline',
                        closeOnBgClick: false
                    }
                }); 
            } else {
                $container.find(".d5_message").html(jsonData.html);
            }
            $me.removeClass("is-loading");
        });
    }
});