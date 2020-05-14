$("ul").on("click","li",function(){
    $(this).toggleClass("strike");
});
$("ul").on("click","span",function(event){
    $(this).parent().fadeOut(500,function(){
        $(this).remove();
    });
    event.stopPropagation();
});
$("input[type='text']").keypress(function(event){
    if(event.which===13){
        let value = $(this).val();
        $(this).val("");
        $("ul").append("<li><span><i class='fa fa-trash'></i> </span>"+value+"</li>");

    }
});
$(".fa-plus").click(function(){
    $("input[type='text']").fadeToggle();
});
