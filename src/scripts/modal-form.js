(function(){

  const validateFields = (form, fieldArray) => {
  
    fieldArray.forEach((field) => {
      field.removeClass('input-error');
      if(field.val().trim() == ""){
        field.addClass('input-error');
      }
    })
    
    const errorFields = form.find(".input-error"); 
    return errorFields.length == 0;
  }
  
  
  $('.form').submit(e => {
    e.preventDefault();
  
    const form = $(e.currentTarget);
    const name = form.find("[name = 'name']");
    const phone = form.find("[name = 'phone']");
    const comment = form.find("[name = 'comment']");
    const to = form.find("[name = 'to']");
  
    const modal = $("#modal");
    const modalContent = $(".modal__content");
  
    modal.removeClass('error-modal');
  
    const isValid = validateFields(form, [name, phone, comment, to]);
  
    if(isValid){
      const request =  $.ajax ({
        url: "https://webdev-api.loftschool.com/sendmail",
        method: "post",
        data: {
          
          name: name.val(),
          phone: phone.val(),
          comment: comment.val(),
          to: to.val()
        }
      });
      
      request.done((data) => {
        modalContent.text(data.message);
      });
      
      request.fail((data) => {
        const errorMessage = data.responseJSON.message;
        modalContent.text(errorMessage);
        modal.addClass("error-modal");
      });
      
      request.always((data) => {
        Fancybox.show([{ 
          src: "#modal", 
          type: "inline" }]);
        });

      form[0].reset();
    };
  
      
  })
    
  
    $('.app-close-modal').click(e => {
      e.preventDefault();
      Fancybox.close();
    });
  
    $(".button--reset:reset").click(e => {
      $('.input-error').removeClass('input-error');
    })

    
})();
