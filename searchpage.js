function getSearchPage(){

  var page = document.getElementById('pagecontainer');

  var mainDiv = document.createElement('div');
  mainDiv.className = 'content';
  page.appendChild(mainDiv);

  var headDiv = document.createElement('div');
  headDiv.id = 'searchHeader';
  mainDiv.appendChild(headDiv);

  var searchBar = document.createElement('input');
  searchBar.id = 'searchbar';
  searchBar.name = 'search';

  var cDrop = document.createElement('select');
  cDrop.name = 'category';
  cDrop.id = 'catas';
  populateCategories();

  function populateCategories(){

    $.ajax({
          url: 'controller.php?request=getCategories',
          type: 'get',
          //contentType: 'array',
          //dataType: 'array',
          cache: false,
          success: function(data, status) {
            var cDrop = document.getElementById('catas');
            //console.log(data);
            data = JSON.parse(data);
            for (var i = 0; i < data.length; i++){
              //console.log(cDrop.name);
              var aux = document.createElement('option');
              aux.text = data[i]['name'];
              aux.value = data[i]['id'];
              cDrop.add(aux);
            }
        }
      });
    }

  var searchButton = document.createElement('button');
  searchButton.innerHTML = 'Search';
  searchButton.id = 'searchbutton';
  searchButton.onclick = function(){
    var search = document.getElementById('searchbar').value;
    var catagory = document.getElementById('catas');
    catagory = catagory.options[catagory.selectedIndex].value;
    //catagory = catagory.value;
    alert(catagory);
    $.ajax({
      url : 'controller.php?search='+search +'&catagory=' + catagory,
      type: 'get',
      cache: false,
      success: function(data, status){
        //show listing names and prices
        var content = document.getElementById('mainDiv');
        var aux = document.createElement('div');
        aux.innerHTML += '<h1>test</h1>';
        content.add(aux);
      }

    })
  }


  headDiv.innerHTML += '<b>Find:</b>  ';
  headDiv.appendChild(searchBar);
  headDiv.innerHTML += '<br><br>';
  headDiv.appendChild(cDrop);
  headDiv.innerHTML += '<br><br>';
  headDiv.appendChild(searchButton);


}
