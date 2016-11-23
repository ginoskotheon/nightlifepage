

$(document).ready(function(){

  // var location = $(this).find( "input[name='location']" ).val(),
  // yelpId = $(this).find( "input[name='yelpId']" ).val()
  submitForms = function(){
    document.getElementById("going").submit();
    document.getElementById("attending").submit();
    document.getElementById("path").submit();
  }



  $('#findButton').on('click', function(){
              var myloc = $('#location').val();
  });

  var path = $(".path").find("input[name='ref_path']").val();
  console.log(path);
  $(".attending").each(function(index, item){
    var match = $( this ).find("input[name='name']").val();
    var val = $( this ).find("input[name='attendence']").val();
    // console.log(val);
    // console.log(match);

  $('.going').each(function(index, item){
      event.preventDefault();
      var subButton = $( this ).find("input[type='submit']");
      var subButton1 = $( this ).find("input[name='yelpId']").val();
      // console.log(subButton1);
      // console.log(subButton.val());
      if (match == subButton1 && val > 0){
        subButton.val("Going");
      } else if (match == subButton1 && val == 0){
        subButton.val("Not Going");
        }
    });

  });


});
//   $(document).on('click', '#decision', function(){
//     // console.log($(this).val());
//     var val = $( '.attending' ).find("input[name='attendence']").val();
//   // $.ajax({
//   //   type: 'POST',
//   //   url: '/process/' + val,
//   //   success: function(data){
//   //     console.log('done');
//   //   }
//   //
//   // });
// });
$(document).on('click', '#decision', function(){
  // console.log($(this).val());
  var bar = $(this).parent().siblings('.business-name').text().replace(/\W/g, "-").toLowerCase();
  if($(this).val()==='Not Going'){
    $(this).val('Going');
  }else {
    $(this).val('Not Going');
  }


});
