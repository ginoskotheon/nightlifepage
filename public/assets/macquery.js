

$(document).ready(function(){


  $('#findButton').on('click', function(){
              var myloc = $('#location').val();
  });

  $(document).on('click', '#decision', function(){
    console.log($(this).val());
    var bar = $(this).parent().siblings('.business-name').text().replace(/\W/g, "-").toLowerCase();
    if($(this).val()==='Not Going'){
      $(this).val('Going');
    }else {
      $(this).val('Not Going');
    }
    $.ajax({
      type: 'POST',
      url: '/process/' + bar,

      success: function(data){
        location.reload;
        console.log(data);
      }

    })

  });
});
