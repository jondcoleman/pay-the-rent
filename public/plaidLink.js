$(document).ready(() => {

  $.post('/auth/local', {email: 'jcoleman3307@gmail.com', password: '1234'}, (err, data) => {
    console.log(err, data)

    var linkHandler = Plaid.create({
      selectAccount: true,
      env: 'tartan',
      clientName: 'Coleman Rentals',
      key: 'test_key',
      product: 'auth',
      onLoad: function() {
        // The Link module finished loading.
        console.log('loaded')
      },
      onSuccess: function(public_token, metadata) {
        // The onSuccess function is called when the user has successfully
        // authenticated and selected an account to use.
        //
        // When called, you will send the public_token and the selected
        // account ID, metadata.account_id, to your backend app server.
        //
        // sendDataToBackendServer({
        //   public_token: public_token,
        //   account_id: metadata.account_id
        // });
        $.post({
          headers: {
            Authorization: `Bearer ${data.token}`
          },
          url: '/stripe',
          data: {
            public_token,
            metadata
          }
        })
        .done((data) => console.log(data))
        .fail((err) => console.error(err))
      },
      onExit: function() {
        // The user exited the Link flow.
      },
    });

    // Trigger the standard Institution Select view
    document.getElementById('linkButton').onclick = function() {
      linkHandler.open();
    };
  })

})
