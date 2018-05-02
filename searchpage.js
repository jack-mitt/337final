
var items = {};
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
  var specPostDiv = document.createElement('div');
  specPostDiv.id = 'specPostDiv';

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
        data = JSON.parse(data);
        for (var i = 0; i < data.length; i++){
          var aux = document.createElement('div');
          items[data[i]['id']] = data[i];
          aux.className = 'searchpost';
          aux.innerHTML += '<h5 class="searchposttitle">' + data[i]['postname'] + '<h5>';
          aux.innerHTML += '<h5>' + data[i]['location'] +'</h5>' +  '<h5>$' + data[i]['price'] + '</h5>';
          aux.innerHTML += "<div class='searchpostthumbnaildiv'><img class='searchpostthumbnail' alt='"+data[i]['name']+"' src='images/posts/" + data[i]['id'] + ".jpg'></div>";
          aux.id = data[i]['id'];
          aux.onclick = function(){
              createPostPage(this.id);
          }
          //console.log(items);
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
  mainDiv.appendChild(specPostDiv);


}

function createPostPage(id){
  item = items[id];
  //console.log(id);
  //console.log(item['id']);
  var postList = document.getElementById('postDiv');
  var postPage = document.getElementById('specPostDiv');
  postPage.innerHTML = '';
  postPage.className = 'postpage';
  postPage.style.zIndex = 2;

  var title = document.createElement('h1');
  title.className = 'postobjtitle';
  title.innerHTML = item['postname'];

  var xButton = document.createElement('img');
  xButton.src = 'images/xbutton.jpg'
  xButton.className = 'xButton';
  xButton.onclick = function(){
    closeOpenItem();
  }

  var infoDiv = document.createElement('div');
  infoDiv.className = 'postInfo';

  var postPrice = document.createElement('h3');
  postPrice.innerHTML = "$" + item['price'];

  var postDesc = document.createElement('p');
  postDesc.innerHTML = item['description'];

  var postLoc = document.createElement('p');
  postLoc.innerHTML = "<b>Location: </b>" + item['location'];

  var postEmail = document.createElement('p');
  postEmail.innerHTML = "<b>Contact: </b>" + item['email'];

  var image = document.createElement('img')
  image.className = 'postimage';
  image.alt = item['name'];
  image.src = 'images/posts/' + item['id'] + '.jpg';

  postList.style.display = 'none';
  postPage.style.display = 'block';
  postPage.appendChild(title);
  postPage.appendChild(image);
  postPage.appendChild(xButton);
  postPage.appendChild(infoDiv);
  infoDiv.appendChild(postPrice);
  infoDiv.appendChild(postDesc);
  infoDiv.appendChild(postLoc);
  infoDiv.appendChild(postEmail);
}

function closeOpenItem(){
  var postPage = document.getElementById('specPostDiv');
  var postList = document.getElementById('postDiv');

  postPage.style.display = 'none';
  postPage.innerHTML = "";
  postList.style.display = 'block';
}
