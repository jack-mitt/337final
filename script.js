
function getTopBanner(){
    var page = document.getElementById('pagecontainer');
    
    var topBanner = document.createElement('div');
    topBanner.className = 'topbanner';
    
    var logoImg = document.createElement('img');
    logoImg.src='images/azlogo.png';
    logoImg.className="topbannerlogo";
    
    var titleDiv = document.createElement('div');
    titleDiv.className='topbannertitle';
    titleDiv.innerHTML='UA SWAP';
    titleDiv.onclick=function(){window.location.href = 'index.php'};
    
    let postDiv = document.createElement('div');
    postDiv.className = 'postlinkdiv';
    postDiv.innerHTML = "CREATE A LISTING";
    postDiv.onclick = function(){window.location.href = 'postPage.php'};
    
    let searchDiv = document.createElement('div');
    searchDiv.className = 'searchlinkdiv';
    searchDiv.innerHTML = "SEARCH LISTINGS";
    searchDiv.onclick = function(){window.location.href = 'searchPage.php'};    
    
    let userDiv = document.createElement('div');
    userDiv.className = 'dropdown';
    userDiv.id='userpanel';

    let accountLinkDiv = document.createElement('div');
    accountLinkDiv.className = 'dropdown-content';
    accountLinkDiv.id = 'dropdowncontent';
        
    userDiv.appendChild(accountLinkDiv);
    
    topBanner.appendChild(logoImg);
    topBanner.appendChild(titleDiv);
    topBanner.appendChild(userDiv);
    topBanner.appendChild(postDiv);
    topBanner.appendChild(searchDiv);
    
    page.appendChild(topBanner);
    
    getLoginInfo();
}

function getLoginInfo(){
    $.ajax({url: "controller.php?request=loginInfo", success: function(data){
        let dropdownContent = document.getElementById('dropdowncontent');
        dropdownContent.innerHTML = '';
        console.log(data);
        if(data){
            let accountLink = document.createElement('a');
            accountLink.innerHTML = 'My Account';
            accountLink.id = 'accountlink';
            accountLink.href = 'account.php';
            
            let logoutLink = document.createElement('a');
            logoutLink.innerHTML = 'Logout';
            logoutLink.id = 'logoutlink';
            logoutLink.href = 'controller.php?request=logout';
            
            dropdownContent.appendChild(accountLink);
            dropdownContent.appendChild(logoutLink);
        }
        else{
            let loginLink = document.createElement('a');
            loginLink.innerHTML = 'Login';
            loginLink.id = 'loginlink';
            loginLink.href = 'login.php';

            let registerLink = document.createElement('a');
            registerLink.innerHTML = 'Register';
            registerLink.id = 'registerlink';
            registerLink.href = 'register.php';
            
            dropdownContent.appendChild(loginLink);
            dropdownContent.appendChild(registerLink);
        }
    }});
}
