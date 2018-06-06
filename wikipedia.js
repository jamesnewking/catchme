// api from wikipedia
// thank you Paul & Martin for the assist!

function makeRequestForWikipedia(winningCity) {
    let city = winningCity.city;
    let country = winningCity.country;
    let pageTitle = null;
    let pageID = null;
    const urlSearchStr = "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch="+city+'%'+country+"&format=json&srprop=snippet";
    let descrSearchStr = null;
  
    $.ajax({
      url: urlSearchStr,
      dataType: 'jsonp',
  
      success: function getPageTitle(data) {
        pageTitle = data.query.search[0].title;
        pageID = data.query.search[0].pageid;
        descrSearchStr = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=" + pageTitle;
        getDescription();
      }
    });
  
    function getDescription() {
      $.ajax({
        url: descrSearchStr,
        dataType: 'jsonp',
  
        success: function (data) {
          var pageSummary = data.query.pages[pageID].extract;
          console.log('pageSummary:', pageSummary);
          //$('.wikipedia-text').addClass('wikipedia-text-bg');
          $('#winning_text').text(pageSummary);
        }
      });
    }
  }
  
  