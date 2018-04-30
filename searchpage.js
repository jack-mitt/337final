function getSearchPage(){

  var page = document.getElementById('pagecontainer');

  var mainDiv = document.createElement('div');
  mainDiv.className = 'content';
  page.appendChild(mainDiv);
  mainDiv.id = 'mainDiv';
  var headDiv = document.createElement('div');
  headDiv.id = 'searchHeader';
  mainDiv.appendChild(headDiv);

  var searchBar = document.createElement('input');
  searchBar.id = 'searchbar';
  searchBar.name = 'search';

  var cDrop = document.createElement('select');
  cDrop.name = 'category';
  cDrop.id = 'catas';
  cDrop.className = 'dropandsearch';
  populateCategories();
  var allOption = document.createElement('option');
  allOption.text = 'All';
  allOption.value = '0';
  cDrop.add(allOption);
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

  var postDiv = document.createElement('div');
  postDiv.id = 'postDiv';

  var searchButton = document.createElement('button');
  searchButton.innerHTML = 'Search';
  searchButton.id = 'searchbutton';
  searchButton.className = 'dropandsearch';
  searchButton.onclick = function(){
    var search = document.getElementById('searchbar').value;
    var catagory = document.getElementById('catas');
    catagory = catagory.options[catagory.selectedIndex].value;
      //console.log(search);
      //console.log(catagory);

    //catagory = catagory.value;
    $.ajax({
      url : 'controller.php?search='+ search + '&catagory=' + catagory,
      type: 'get',
      cache: false,
      success: function(data, status){
        //show listing names and prices
        var content = document.getElementById('postDiv');
        content.innerHTML = "";
        console.log(data);
        data = JSON.parse(data);
        console.log(data);
        for (var i = 0; i < data.length; i++){
          var aux = document.createElement('div');
            aux.className = 'searchpost';
            //TODO ADD LINK TO PAGE FOR A POST HERE. CALL JS FUNCTION THAT MAKES DIV
            //VISIBLE AND ADDS STUFF TO IT
          //var postLink = document.createElement('a');
          //postLink.href = "javascript:createPostPage(document.getElementById(this.id))";
          aux.innerHTML += '<h5 class="searchposttitle">' + data[i]['postname'] + '<h5>';
          aux.innerHTML += '<h5>' + data[i]['location'] +'</h5>' +  '<h5>$' + data[i]['price'] + '</h5>';
          content.appendChild(aux);
        }
      }

    })
  }


  mainDiv.appendChild(headDiv);
  headDiv.innerHTML += '<b>Find:    </b>';
  headDiv.appendChild(searchBar);
  //headDiv.innerHTML += '<br><br>';
  headDiv.appendChild(cDrop);
  //headDiv.innerHTML += '<br><br>';
  headDiv.appendChild(searchButton);
  mainDiv.appendChild(postDiv);

}
