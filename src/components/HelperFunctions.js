// Function to get correct query for feed based on url parameters
export function getQuery(cat,limit) {
    if (cat == "home" || cat==undefined) {
        var query = "SELECT * FROM articles WHERE imgurl IS NOT '' ORDER BY dateTimeScraped DESC " + limit;
    } else if (cat == "latest") {
        var query = "SELECT * FROM articles  WHERE imgurl IS NOT '' ORDER BY dateTimeScraped DESC " + limit;
    } else if (cat=="sports") {
        var query = "SELECT * FROM articles WHERE category = 'Sports' ORDER BY dateTimeScraped DESC " + limit;
    } else if (cat=="politics") {
        var query = "SELECT * FROM articles WHERE category = 'Politics' ORDER BY dateTimeScraped DESC " + limit;
    } else if (cat=="local") {
      var query = "SELECT * FROM articles WHERE category = 'Local' ORDER BY dateTimeScraped DESC " + limit;
    } else if (cat=="latest_today") {
      var query = "SELECT * FROM articles WHERE dateTimeScraped >= date('now', 'start of day') ORDER BY dateTimeScraped DESC " + limit;
    } else if (cat=="crime") {
      var query = "SELECT * FROM articles WHERE category = 'Crime' ORDER BY dateTimeScraped DESC " + limit;
    } else if (cat=="business") {
      var query = "SELECT * FROM articles WHERE category = 'Business' ORDER BY dateTimeScraped DESC " + limit;
    } else if (cat=="international") {
      var query = "SELECT * FROM articles WHERE category = 'International' ORDER BY dateTimeScraped DESC " + limit;
    }
    return query;
}

// Returns index of column as name
export function getColumn(columns) {
    var column = [];
    // Find column indices
    column.id = columns.indexOf('id');
    column.source = columns.indexOf('source');
    column.title = columns.indexOf('title');
    column.category = columns.indexOf('category');
    column.author = columns.indexOf('author');
    column.href = columns.indexOf('href');
    column.paragraph = columns.indexOf('paragraph');
    column.datetime = columns.indexOf('datetimeScraped');
    column.imgurl = columns.indexOf('imgurl');
    column.summary = columns.indexOf('summary');
    column.maintext = columns.indexOf('maintext');
    return column
}

// Shuffels an array
export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Fixes bad paragraph text
export function fixParagraph(text) {
    text = text.replaceAll("< p >", "<p>");
    text = text.replaceAll("< / p >", "</p>");
    return text;
} 

// Returns time as "timeago"
export function getTimeAgo(date) {
    const MINUTE = 60;
    const HOUR = MINUTE * 60;
    const DAY = HOUR * 24;
    const WEEK = DAY * 7;
    const MONTH = DAY * 30;
    const YEAR = DAY * 365;

    const secondsAgo = Math.round((Date.now() - Number(date)) / 1000);
  
    if (secondsAgo < MINUTE) {
      return secondsAgo + ` second${secondsAgo !== 1 ? "s" : ""} ago`;
    }
  
    let divisor;
    let unit = "";
  
    if (secondsAgo < HOUR) {
      [divisor, unit] = [MINUTE, "minute"];
    } else if (secondsAgo < DAY) {
      [divisor, unit] = [HOUR, "hour"];
    } else if (secondsAgo < WEEK) {
      [divisor, unit] = [DAY, "day"];
    } else if (secondsAgo < MONTH) {
      [divisor, unit] = [WEEK, "week"];
    } else if (secondsAgo < YEAR) {
      [divisor, unit] = [MONTH, "month"];
    } else {
      [divisor, unit] = [YEAR, "year"];
    }
  
    const count = Math.floor(secondsAgo / divisor);
    return `${count} ${unit}${count > 1 ? "s" : ""} ago`;
}

export function copyToClipBoard(url) {
  console.log(url);
  navigator.clipboard.writeText(url);
} 

export function getCatColor(cat) {
  const category = cat.toLowerCase();
  const blue = "#0ea5e9";
  const red = "#EF5350";
  const yellow = "#f8cc08";
  const green = "#1bac6d";
  const pink = "#e858a0";
  const purple = "#9575CD";

  var color = pink;

  if (category == "local") {
    color = blue;
  } else if (category == "politics") {
    color = yellow;
  } else if (category == "sports") {
    color = red;
  } else if (category == "crime") {
    color = purple;
  } else if (category == "business") {
    color = green;
  } else if (category == "international") {
    color = blue;
  } else if (category == "latest") {
    color = blue;
  } 

  return color;
}

export function getImgUrl(type,source,url) {
  var imgurl = url;

  if (url=='') {
    const imgcrime = ['https://ournews.bs/wp-content/uploads/2022/12/4-23-400x240.jpg','https://ournews.bs/wp-content/uploads/2022/12/Website-Images-NEW-1600x900-23-400x240.jpg','https://ournews.bs/wp-content/uploads/2022/12/5-9-400x240.jpg','https://ournews.bs/wp-content/uploads/2022/12/5214CAA4-EE87-4425-8AA7-C623708F600B-400x240.jpg','https://ournews.bs/wp-content/uploads/2022/07/102-min-400x240.jpg','https://ournews.bs/wp-content/uploads/2022/10/Copy-of-Website-Images-NEW-1600x900-2022-10-11T111245.566-min-400x240.jpg','https://ournews.bs/wp-content/uploads/2022/07/Website-Images-NEW-1600x900-18-min-400x240.jpg','https://ournews.bs/wp-content/uploads/2022/12/6-4-400x240.jpg','https://ournews.bs/wp-content/uploads/2022/12/Copy-of-Website-Images-NEW-1600x900-2022-12-03T112034.146-min-400x240.jpg','https://ournews.bs/wp-content/uploads/2022/12/Copy-of-Website-Images-NEW-1600x900-2022-12-01T133153.974-min-400x240.jpg','https://ournews.bs/wp-content/uploads/2022/09/Website-Images-NEW-1600x900-7-2-400x240.png','https://ournews.bs/wp-content/uploads/2022/11/Copy-of-Website-Images-NEW-1600x900-2022-11-29T132025.167-min-400x240.jpg','https://ournews.bs/wp-content/uploads/2022/11/5-12-400x240.jpg','https://ournews.bs/wp-content/uploads/2022/09/Website-Images-NEW-1600x900-5-3-400x240.png'];
    imgurl = imgcrime[Math.floor(Math.random() * imgcrime.length)];
  }

  if (type=='feed') {
    if (source=="Our news" && url.includes("ournews.bs")) {
      imgurl = url.replace("1000x600.jpg","400x240.jpg");
      imgurl = url.replace("1000x600.png","400x240.png");
    } else if (source=="The Nassau Guardian" && url.includes("thenassauguardian.com")) {
      imgurl = url.replace("780x470.jpg","220x150.jpg");
      imgurl = url.replace("390x220.jpg","220x150.jpg");
    }

  } else if (type=='head') {
    if (source=="Our news" && url.includes("ournews.bs")) {
      imgurl = url.replace("1000x600.jpg","400x240.jpg");
      imgurl = url.replace("1000x600.png","400x240.png");
    } else if (source=="The Nassau Guardian" && url.includes("thenassauguardian.com")) {
      imgurl = url.replace("780x470.jpg","780x470.jpg");
      imgurl = url.replace("390x220.jpg","780x470.jpg");
      imgurl = url.replace("220x150.jpg","780x470.jpg");
    } else if (source=="The Tribune" && url.includes("thetribune.media.clients.ellingtoncms.com")) {
      imgurl = url.replace("_t180","_t670");
    }

  } else if (type=='article') {
    if (source=="Our news" && url.includes("ournews.bs")) {
      imgurl = url.replace("400x240.jpg","400x240.jpg");
      imgurl = url.replace("1000x600.jpg","400x240.jpg");
      imgurl = url.replace("400x240.png","400x240.png");
      imgurl = url.replace("1000x600.png","400x240.png");
    } else if (source=="The Nassau Guardian" && url.includes("thenassauguardian.com")) {
      imgurl = url.replace("780x470.jpg","780x470.jpg");
      imgurl = url.replace("390x220.jpg","780x470.jpg");
      imgurl = url.replace("220x150.jpg","780x470.jpg");
    } else if (source=="The Tribune" && url.includes("thetribune.media.clients.ellingtoncms.com")) {
      imgurl = url.replace("_t180","_t670");
    }
  } 
  return imgurl
}

export function getTrimmedText(text,type) {

  const str = text;
  
  if (type=="title") {
    length = 120;
  } 
  if (type=="paragraph") {
    length = 180;
  }
  
  const trimmed =
  str.length > length
    ? str.substring(0, length) + '...'
    : str.substring(0, length);
  
  return trimmed
}

export function getSourceLogo(source) {
  var sourceurl = "logov2.svg"

  if (source=='Eye Witness News') {
    sourceurl = "eyewitness-news-logo.svg"
  } else if (source=='Bahamas Press') {
    sourceurl = 'bahamaspress-logo.svg'
  } else if (source=='The Tribune') {
    sourceurl = 'the-tribune-logo.svg'
  } else if (source=='The Nassau Guardian') {
    sourceurl = 'thenassauguardian-logo.svg'
  } else if (source=='Our news') {
    sourceurl = 'ournews-logo.svg'
  }
  
  return sourceurl
}

export function getSearchQuery(search) {
  const words = search.split(' ');
  var searchquery = "SELECT * FROM articles WHERE ("
  var q = "summary LIKE '%" + words[0] + "%'"
  for (let i = 1; i < words.length; i++) {
    q = q + " OR " + "summary LIKE '%" + words[i] + "%'";
  }
  return searchquery + q + ")" + "ORDER BY dateTimeScraped DESC";
}
