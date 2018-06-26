$(document).ready(function() {
  $('#hamburger').click(function() {
    if ($('#header-menu ul').is(':visible')) {
      $('#header-menu ul').slideUp()
    } else {
      $('#header-menu ul').slideDown()
    }
    // $('#header-menu ul').slideDown()
  })

  // var feed = new Instafeed({
  //     get: 'user',
  //     userId: '2105335798',
  //     clientId: '0e4feb4ab05a479c8b325c646e0d959a'
  //   });
  //   feed.run();

  const CAPTION_LIMIT = 200;

  // Instagram photo
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  var token = '2105335798.0e4feb4.a4d8e7da0c4f4f978943a661df73f961',
      userid = 2105335798,
      num_photos = 1;

  if ($('body').is('#index')) {
    $.ajax({
      url: 'https://api.instagram.com/v1/users/' + userid + '/media/recent', // or /users/self/media/recent for Sandbox
      dataType: 'jsonp',
      type: 'GET',
      data: { access_token: token, count: num_photos },
      success: function(data){
        var x = data.data[0]

        date = new Date(Number(x.created_time + '000'))

        $('#instagram').css('background-image', 'url(' + x.images.standard_resolution.url + ')');

        $('#instagram .content').append(`<p>${ x.caption.text.substring(0, CAPTION_LIMIT) }&hellip;</p>`)

        $('#instagram .social').prepend(`<small class="uppercase mb-15">${ months[date.getMonth()] } ${ date.getDate() }, ${ date.getFullYear() }</small>`)
      },
      error: function(data){
        console.log(data); // send the error notifications to console
      }
    });
  } else if ($('body').is('#gallery')) {
    $.ajax({
      url: 'https://api.instagram.com/v1/users/' + userid + '/media/recent', // or /users/self/media/recent for Sandbox
      dataType: 'jsonp',
      type: 'GET',
      data: { access_token: token },
      success: function(data){
        for (x of data.data) {
          date = new Date(Number(x.created_time + '000'))

          $('#insta').append(
            "<a href='" + x.link + "' style='background-image: url(" + x.images.standard_resolution.url + ")' class='instagram tile' id='instagram'>" +
              "<div class='overlay'></div>" +
              "<div class='content'>" +
                "<div class='social'>" +
                  "<small class='uppercase mb-15'>" + `${ months[date.getMonth()] } ${ date.getDate() }, ${ date.getFullYear() }`  + "</small>" +
                "</div>" +
                "<p>" + x.caption.text.substring(0, CAPTION_LIMIT) + "&hellip;</p>" +
              "</div>" +
            "</a>"
          )
          // $('#instagram').css('background-image', 'url(' + data.data[0].images.standard_resolution.url + ')');
          // //     // data.data[x].images.thumbnail.url - URL of image 150х150
          // //     // data.data[x].images.standard_resolution.url - URL of image 612х612
          // //     // data.data[x].link - Instagram post URL
          // $('#instagram .content').append(`<p>${ data.data[0].caption.text }</p>`)
        }
      },
      error: function(data){
        console.log(data); // send the error notifications to console
      }
    });
  }
})