

$(document).ready(function(){


  $('#findButton').on('click', function(){
              var myloc = $('#location').val();
  });

  $(document).on('click', '#decision', function(){
    console.log($(this).val());
    if($(this).val()==='Not Going'){
      $(this).val('Going');
    }else {
      $(this).val('Not Going');
    }

  });
});
