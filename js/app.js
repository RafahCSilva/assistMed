const _URL = 'http://assistmed.mybluemix.net/api/';

var cont = 0;
function addMsgDele( msg ) {
  return '<li class="dele clearfix" id="item_' + (++cont) + '"><div>' + msg + '</div></li>';
}
function addMinhaMsg( msg ) {
  return '<li class="minha clearfix" id="item_' + (++cont) + '"><div>' + msg + '</div></li>';
}

$( function () {
    // recebe a mensagem de boas vindas
    $.get( {
      url: _URL +'entrei',
      type: 'GET',
      dataType: 'jsonp',
      jsonp: "callback",
      success: function ( data, status ) {
        $( '#mensagens' ).append( addMsgDele( data.text ) );
      }
    } );
    $( '#texto' ).focus();
  }
);

$( '#enviarMsg' ).click( function () {
  var texto = $( '#texto' );
  var minha_msg = texto.val();
  // nao enviar vazio
  if ( minha_msg == '' ) {
    return;
  }
  // add minha msg
  var mensagens = $( '#mensagens' );
  mensagens.append( addMinhaMsg( minha_msg ) );
  // desce ateh a ultima msg
  var scrollTo = $( '#item_' + cont );
  mensagens.animate( {
    scrollTop: scrollTo.offset().top - mensagens.offset().top + mensagens.scrollTop()
  } );
  // delete do input:text
  texto.val( '' );
  // envia a msg
  $.get( {
    url: _URL +'enviar',
    type: 'GET',
    dataType: 'jsonp',
    jsonp: "callback",
    data: {
      text: minha_msg
    },
    success: function ( data, status ) {
      var mensagens = $( '#mensagens' );
      mensagens.append( addMsgDele( data.output.text[ 0 ] ) );
      
      // desce ateh a ultima msg
      var scrollTo = $( '#item_' + cont );
      mensagens.animate( {
        scrollTop: scrollTo.offset().top - mensagens.offset().top + mensagens.scrollTop()
      } );
    }
  } )
} );

$( '#texto' ).keypress( function ( event ) {
  if ( event.which == 13 ) {
    $( '#enviarMsg' ).click();
  }
} );

$( '#showModal' ).click( function () {
  $( '#myModal' ).modal();
} );

function setActiveButton( btn ) {
  var nodes = btn.parentNode.childNodes;
  for ( var n in nodes ) {
    nodes[ n ].className = 'btn btn-default';
  }
  btn.className = 'btn btn-default active';
}