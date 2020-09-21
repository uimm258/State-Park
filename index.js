/* 
input: 
  selector of states & parks

output: 
 name, description, url of the park
 max# of the output

  1. write a function that takes selector as the input
    a. need to loop through the array and prints out the selector of it
    b. adds api key 
  2. write a function that display the result
  3. create an url to fetch all the park data by using the api key

*/
'user strict';

const apiKey = 'mOd8nIn88m6LdXLugAOLVgm0VcTkfP73NceFHAzL';


//it fetch info from the url
function getParkInfo(){
  let statecode = $("#states").val();
  let maxresults = $("#maxresults").val();

  let searchURL = `https://developer.nps.gov/api/v1/parks?stateCode=${statecode}&limit=${maxresults}&start=0&api_key=mOd8nIn88m6LdXLugAOLVgm0VcTkfP73NceFHAzL`



  fetch(searchURL)
   .then(response => response.json())
   .then(responseJson => displayResults(responseJson))
   .catch(error => alert('No park found. Please try again'));
}

//get an array of states in the url and create a selector
function getArrayState(){
  let stateList = ' ';
  let states = ["al","ak","az","ar","ca","co","ct","de","fl","ga","hi","id","il","in","ia","ks","ky","la","me","md","ma","mi","mn","ms","mo","mt","ne","nv","nh","nj","nm","ny","nc","nd","oh","ok","or","pa","ri","sc","sd","tn","tx","ut","vt","va","wa","wv","wi","wy"];
  states.forEach(list =>{
    stateList += `<option value = "${list}"> ${list} </option>`
  });
  //set the html of the state list
  $("#states").html(stateList);
  watchForm()
}

function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // for each video object in the items 
  //array, add a list item to the results 
  let results = '';
  
  responseJson.data.forEach(result => {
    results +=
    `<li>
      <h3>${result.fullName}</h3>
      <p>Park Description ${result.description}</p>
      <a href='${result.url}'> Click this</a>
    </li>`
  });
  //display the results section  
  $('#results').removeClass('hidden');
  $(`#results-list`).html(results);
};



function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    getParkInfo();
  });
}


$(function() {
  console.log('App loaded! Waiting for submit!');
  getArrayState();
});
