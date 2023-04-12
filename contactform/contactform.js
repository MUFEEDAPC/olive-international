$(document).ready(function () {
  $("#contact_form").submit(function (event) {
    let $this = $(this);
    swal({
      title: "Sending",
      text: ".",
      icon: "info",
      button: false,
    });
    event.preventDefault();
    let town = $("#town").val();
    var url = $this.attr("action");
    var method = $this.attr("method");
    var data = $($this).serialize();
    $.ajax({
      type: 'post',
      url: "https://mail-sender.vingb.com/send/d1d94b2b-04ec-40f1-9c0c-7cea921085e7",
      dataType: 'json',
      data: data,
      success: function (data) {
        console.log(data['status'])

        console.log("success");
        if (data['status']) {
          swal({
            title: "Thank you",
            text: "Your message has been successfully sent.\n We will contact you very soon!",
            icon: "success",
            button: false,
          });

          setTimeout(function () {
            swal.close();
          }, 1000)
        } else {
          swal({
            title: "Try Again !",
            text: "something went wrong",
            icon: "warning",
            button: "OK",
          });
        }

      },
      error: function (data) {
        swal({
          title: "Try Again !",
          text: "something went wrong",
          icon: "warning",
          button: "OK",
        });

      }
    });
  });
});