var mainUrl = "https://dotravel.com/";
var affUrl = "";

function insertData(id) {
  //getDoTravelGeneralCSS();
  fetchJSONFile(mainUrl+"/affiliate/widget/" + id, function () {
    insertProducts(data, id);
    insertDoTravelCSS(data, id);
    // TODO
    //~ getJsonCSS(data, id);
    removeLinkContainer(data, id);
  });
}

function getDoTravelGeneralCSS() {
  var myStyle = document.createElement('link');
  myStyle.href = affUrl + 'dotravelGeneral.min.css';
  myStyle.rel = 'stylesheet';
  document.getElementsByTagName('head')[0].appendChild(myStyle);
}

function getJsonCSS(data) {
  data.setting.forEach(function (element) {

    // Background Style
    var DoTravelContainer = document.querySelectorAll('.DoTravel-Container');
    DoTravelContainer[0].style.backgroundColor = element.backgroundColor;

    // Button Style Background and Color
    var DoTravelButtonShow = document.querySelectorAll('.DoTravel-Button-Show');
    for (var i = 0; i < DoTravelButtonShow.length; i++) {
      DoTravelButtonShow[i].style.backgroundColor = element.buttonBackground;
      DoTravelButtonShow[i].style.color = element.buttonColor;
    }

    // Price Color
    var DoTravelProductPrice = document.querySelectorAll('.DoTravel-Product-Price');
    for (var i = 0; i < DoTravelProductPrice.length; i++) {
      DoTravelProductPrice[i].style.color = element.priceColor;
    }

    // Offer Price Color
    var DoTravelProducOffertPrice = document.querySelectorAll('.DoTravel-Product-Offer-Price');
    for (var i = 0; i < DoTravelProducOffertPrice.length; i++) {
      DoTravelProducOffertPrice[i].style.color = element.offerPriceColor;
    }

    // Dashed Price Color
    var DoTravelProductPrice = document.querySelectorAll('.DoTravel-Text-Dashed');
    for (var i = 0; i < DoTravelProductPrice.length; i++) {
      DoTravelProductPrice[i].style.color = element.dashedPriceColor;
    }

    // Text Color of Everything
    var DoTravelProductInfo = document.querySelectorAll('.DoTravel-Product-Info');
    for (var i = 0; i < DoTravelProductInfo.length; i++) {
      DoTravelProductInfo[i].style.color = element.textColor;
    }

  });
}

function insertDoTravelCSS(data) {
  console.log(data);
  var typeDirection = data.settings.shape;
  var myStyle = document.createElement('link');
  var template = data.settings.color_scheme;
  template = parseInt(template);

  if (typeDirection == "horizontal") {
    switch (template) {
      case 1:
        myStyle.href = affUrl + 'DoTravel-T1H.css';
        break;
      case 2:
        myStyle.href = affUrl + 'DoTravel-T2H.css';
        break;
      case 3:
        myStyle.href = affUrl + 'DoTravel-T3H.css';
        break;
    }
  } else if (typeDirection == "vertical") {
    switch (template) {
      case 1:
        myStyle.href = affUrl + 'DoTravel-T1V.css';
        break;
      case 2:
        myStyle.href = affUrl + 'DoTravel-T2V.css';
        break;
      case 3:
        myStyle.href = affUrl + 'DoTravel-T3V.css';
        break;
    }
  }
  myStyle.rel = 'stylesheet';
  document.getElementsByTagName('head')[0].appendChild(myStyle);
}

function fetchJSONFile(path, callback) {
  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState === 4) {
      if (httpRequest.status === 200) {
        data = JSON.parse(httpRequest.responseText);
        if (callback)
          callback(data);
      }
    }
  };
  httpRequest.open('GET', path);
  httpRequest.send();
}

function insertProducts(data, id) {
  // TODO
  var doTravelCampaignContainer = document.createElement('span');
  data.products.forEach(function (element, index) {
    // data.forEach(function (element, index) {

    var myProductTitle = document.createElement('span');
    myProductTitle.setAttribute("class", "DoTravel-Product-Title");
    myProductTitle.innerHTML = element.title;

    // Description
    var myProductDescription = document.createElement('p');
    myProductDescription.setAttribute("class", "DoTravel-Product-Description");
    myProductDescription.innerHTML = element.summary;

    // Button Show
    var myButtonShow = document.createElement('a');
    myButtonShow.setAttribute("class", "DoTravel-Button-Show");
    myButtonShow.setAttribute("href", element.url);
    myButtonShow.setAttribute("target", "_blank");
    myButtonShow.innerHTML = "Book Now";

    // Duration Icon
    var myDurationIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    myDurationIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    myDurationIcon.setAttribute("width", "14");
    myDurationIcon.setAttribute("height", "14");
    myDurationIcon.setAttribute("viewBox", "0 -10 512 512");
    var myDurationPathIcon = document.createElementNS('http://www.w3.org/2000/svg', "path");
    myDurationPathIcon.setAttributeNS(null, "d", "M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm57.1 350.1L224.9 294c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h48c6.6 0 12 5.4 12 12v137.7l63.5 46.2c5.4 3.9 6.5 11.4 2.6 16.8l-28.2 38.8c-3.9 5.3-11.4 6.5-16.8 2.6z");
    myDurationPathIcon.setAttribute("fill", "#24A393");
    myDurationIcon.appendChild(myDurationPathIcon);

    // Duration
    var myProductDuration = document.createElement('span');
    myProductDuration.setAttribute("class", "DoTravel-Product-Duration");
    var myProductClockIcon = document.createElement('i');
    myProductClockIcon.setAttribute("class", "DoTravel-Icon-Clock");
    var mySpanDuration = document.createElement('span');
    mySpanDuration.setAttribute("class", "DoTravel-Span-Duration");
    mySpanDuration.innerHTML = element.duration;
    myProductDuration.appendChild(myDurationIcon);
    myProductDuration.appendChild(mySpanDuration);

    // Stars
    var myProductStars = document.createElement('span');
    myProductStars.setAttribute("class", "DoTravel-Rating-Stars");
    var ratingStars = element.rating;
    console.log(ratingStars);
    var stars = '';
    // For now, is like this until progress bar of stars is done
    if (ratingStars > 4.49) {
      stars += '&#9733 &#9733 &#9733 &#9733 &#9733';
    } else if (ratingStars > 3.49) {
      stars += '&#9733 &#9733 &#9733 &#9733 &#9734';
    } else if (ratingStars > 2.49) {
      stars += '&#9733 &#9733 &#9733 &#9734 &#9734';
    } else if (ratingStars > 1.49) {
      stars += '&#9733 &#9733 &#9734 &#9734 &#9734';
    } else if (ratingStars > 0.49) {
      stars += '&#9733 &#9734 &#9734 &#9734 &#9734';
    } else if (ratingStars < 0.49) {
      stars += '&#9734 &#9734 &#9734 &#9734 &#9734';
    }

    //myProductStars.innerHTML = element.rating;
    myProductStars.innerHTML = stars;

    // Rating
    var myProductRating = document.createElement('span');
    myProductRating.setAttribute("class", "DoTravel-Rating-Container");
    myProductRating.appendChild(myProductStars);

    var myProductPrice = document.createElement('span');
    myProductPrice.setAttribute("class", "DoTravel-Product-Price");
    myProductPrice.innerHTML = element.price + '  ' + element.currency;

    if (typeof element.offerPrice != "undefined") {
      var myProductOfferPrice = document.createElement('span');
      myProductOfferPrice.setAttribute("class", "DoTravel-Product-Offer-Price");
      myProductOfferPrice.innerHTML = element.offerPrice + '  ' + element.currency;
      myProductPrice.classList.add('DoTravel-Text-Dashed');
    }

    var myProductReviews = document.createElement('span');
    myProductReviews.setAttribute("class", "DoTravel-Product-Reviews");
    var reviewWord = '';
    if (element.reviews > 1) {
      reviewWord = 'reviews';
    } else {
      reviewWord = 'review';
    }
    myProductReviews.innerHTML = element.reviews + " " + reviewWord;

    var myProductImage = document.createElement('div');
    myProductImage.setAttribute("class", "DoTravel-Product-Image");
    myProductImage.setAttribute("style", 'background-image:url(' + element.img + ');');

    var myImageHref = document.createElement('a');
    myImageHref.setAttribute("href", element.url);
    myImageHref.setAttribute("target", "_blank");
    myImageHref.appendChild(myProductImage);

    var myProductInfo = document.createElement('div');
    myProductInfo.setAttribute("class", "DoTravel-Product-Info");
    myProductInfo.appendChild(myProductTitle);

    var containerRRD = document.createElement('div');
    containerRRD.setAttribute("class", "DoTravel-Container-RRD");

    containerRRD.appendChild(myProductRating);
    containerRRD.appendChild(myProductReviews);
    containerRRD.appendChild(myProductDuration);

    myProductInfo.appendChild(containerRRD);

    //If description is true, then insert it card
    if (data.settings.summary) {
      myProductInfo.appendChild(myProductDescription);
    }

    myProductInfo.appendChild(myButtonShow);
    if (typeof element.offerPrice != "undefined") {
      myProductInfo.appendChild(myProductOfferPrice);
    }
    myProductInfo.appendChild(myProductPrice);

    var mySpanContainer = document.createElement('span');
    mySpanContainer.setAttribute("class", "DoTravel-Span-Container");
    mySpanContainer.appendChild(myImageHref);
    mySpanContainer.appendChild(myProductInfo);

    var myProductContainer = document.createElement('a');
    myProductContainer.setAttribute("class", "DoTravel-Product-Container");
    myProductContainer.setAttribute("href", element.url);
    myProductContainer.setAttribute("target", "_blank");
    myProductContainer.setAttribute("id", "DoTravel-Product-" + (index + 1));
    myProductContainer.appendChild(mySpanContainer);

    // Put a clearfix into each product to fix CSS Style
    var clearFixDiv = document.createElement('div');
    clearFixDiv.setAttribute("class", "DoTravel-Clearfix");
    myProductContainer.appendChild(clearFixDiv);

    document.getElementById('DoTravel-Campaign').classList.add("DoTravel-Container");
    // Fix Width: Powered by DoTravel (Div)
    if (data.settings.quantity == 1) {
      document.getElementById('DoTravel-Campaign').setAttribute("style", "flex-direction:column");
    }

    // Put each product into the Container of Width 70%
    doTravelCampaignContainer.setAttribute('class', 'DoTravel-Campaign-Container');
    doTravelCampaignContainer.appendChild(myProductContainer);


  });

  var poweredBy = document.createElement('span');
  poweredBy.setAttribute("class", "DoTravel-Powered-By");
  // Fix Width: Powered by DoTravel (Div)
  if (data.settings.quantity == 1) {
    poweredBy.classList.add("DoTravel-Powered-1P");
  } else if (data.settings.quantity == 2) {
    poweredBy.classList.add("DoTravel-Powered-2P");
  } else if (data.settings.quantity == 3) {
    poweredBy.classList.add("DoTravel-Powered-3P");
  }
  poweredBy.innerHTML = "Powered by DoTravel";
  doTravelCampaignContainer.appendChild(poweredBy);

  document.getElementById('DoTravel-Campaign').appendChild(doTravelCampaignContainer);
  document.getElementById('DoTravel-Campaign').id = "DoTravel-Campaign-" + id;

}

function removeLinkContainer(data, id) {
  //data.campaign.forEach(function (campaign) {
  var campaignDiv = document.getElementById("DoTravel-Campaign-" + id);
  var parentLink = campaignDiv.parentNode;
  // Insert the content after the a href container
  parentLink.parentNode.insertBefore(campaignDiv, parentLink.nextSibling);
  // Remove the empty a link
  parentLink.parentElement.removeChild(parentLink);
  //});
}

function checkMetaViewPort() {
  if (document.querySelectorAll('meta[name="viewport"][content="width=device-width, initial-scale=1.0"]').length == 0) {
    var myStyle = document.createElement('meta');
    myStyle.name = "viewport";
    myStyle.content = "width=device-width, initial-scale=1.0";
    document.getElementsByTagName('head')[0].appendChild(myStyle);
  }
}

checkMetaViewPort();
var id = document.currentScript.getAttribute('id');
insertData(id);
