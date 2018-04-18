
function getTopBanner(){
    var page = document.getElementById('pagecontainer');
    
    var topBanner = document.createElement('div');
    topBanner.className = 'topBanner';
    
    var logoImg = document.createElement('img');
    logoImg.src='images/azlogo.png';
    logoImg.className="topBannerLogo";
    
    
    topBanner.appendChild(logoImg);
    
    page.appendChild(topBanner);
}