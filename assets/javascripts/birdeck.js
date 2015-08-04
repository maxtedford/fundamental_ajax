$(document).ready(function(){
  $.ajax({
    type: 'GET',
    url:  'http://turing-birdie.herokuapp.com/api/v1/posts.json',
    success: function(posts){
      $.each(posts, function(index, post){
        $('#latest-posts').append(
          "<div class='post' data-id='"
          + post.id
          + "'><h6>Published on"
          + post.created_at
          + "</h6>"
          + "<p>"
          + post.description
          + "</p>"
          + "<button id='delete-post' name='delete-button' class='btn btn-default btn-xs'>Delete</button>"
          + "</div>"
        )
      })
    }
  });
  
  $('#fetch-posts').on('click', function(){
    $.ajax({
      type: 'GET',
      url:  'http://turing-birdie.herokuapp.com/api/v1/posts.json',
      success: function(posts){
        $.each(posts, function(index, post){
          $('#latest-posts').append(
            "<div class='post' data-id='"
            + post.id
            + "'><h6>Published on"
            + post.created_at
            + "</h6>"
            + "<p>"
            + post.description
            + "</p>"
            + "<button id='delete-post' name='delete-button' class='btn btn-default btn-xs'>Delete</button>"
            + "</div>"
          )
        })
      }
    });
  });
  
  $('#create-post').on('click', function(){
    var postParams = { post: { description: $('#post-description').val() } };
    console.log(postParams);

    $.ajax({
      type:    'POST',
      url:     'http://turing-birdie.herokuapp.com/api/v1/posts.json',
      data:    postParams,
      success: function(newPost){
        $('#latest-posts').append(
          "<div class='post' data-id='"
          + newPost.id
          + "'><h6>Published on"
          + newPost.created_at
          + "</h6>"
          + "<p>"
          + newPost.description
          + "</p>"
          + "<button id='delete-post' name='delete-button' class='btn btn-default btn-xs'>Delete</button>"
          + "</div>"
        )
      }
    })
  });
  
  $('#latest-posts').delegate('#delete-post', 'click', function(){
    var $post = $(this).closest('.post');
    
    $.ajax({
      type:    'DELETE',
      url:     'http://turing-birdie.herokuapp.com/api/v1/posts/' + $post.attr('data-id') + '.json',
      success: function(){
        $post.remove()
      },
      error: function(){
        $post.remove()
      }
    });
  });
});
