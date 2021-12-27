var DefaultData = [];
DefaultData = [
  ["Google", "http://www.google.com/search?q={%s}", "img/searchAll/favicons/google.ico", "", "1", "0", "generalsearch"],
  [
    "Amazon",
    "http://www.amazon.com/gp/search?ie=UTF8&keywords={%s}&tag=diigo0c-20&index=aps&linkCode=ur2&camp=1789&creative=9325",
    "img/searchAll/favicons/amazon16.png",
    "",
    "1",
    "0",
    "Shopping",
  ],
  ["Bing", "http://www.bing.com/search?q={%s}", "img/searchAll/favicons/bing.ico", "", "1", "0", "generalsearch"],
  ["Baidu", "http://www.baidu.com/s?wd={%s}&rsv_bp=0&rsv_spt=3&inputT=2257", "img/searchAll/favicons/baidu.ico", "", "0", "0", "generalsearch"],
  ["Yandex", "http://yandex.com/yandsearch?text={%s}&lr=102613", "img/searchAll/favicons/yandex.ico", "", "0", "0", "generalsearch"],
  ["Wikipedia", "http://en.wikipedia.org/wiki/{%s}", "img/searchAll/favicons/wikipedia.ico", "", "1", "0", "Reference"],
  ["Dictionary", "http://dictionary.reference.com/browse/{%s}", "img/searchAll/favicons/dictionary.ico", "", "0", "0", "Reference"],
  [
    "Yahoo",
    "http://search.yahoo.com/search?fr=chr-greentree_gc&ei=utf-8&ilc=12&type=890416&p={%s}",
    "img/searchAll/favicons/yahoo.ico",
    "",
    "1",
    "0",
    "generalsearch",
  ],
  ["eBay", "http://www.ebay.com/sch/i.html?_nkw={%s}&_sacat=See-All-Categories", "img/searchAll/favicons/ebay.ico", "", "1", "0", "Shopping"],
  ["Pricewatch", "http://www.pricewatch.com/search?q={%s}", "img/searchAll/favicons/pricewatch.ico", "", "0", "0", "Shopping"],
  [
    "Price graber",
    "http://www.pricegrabber.com/social+network/products.html/form_keyword={%s}",
    "img/searchAll/favicons/pricegraber.ico",
    "",
    "0",
    "0",
    "Shopping",
  ],
  ["Shopping", "http://www.shopping.com/{%s}/products?CLT=SCH&KW=", "img/searchAll/favicons/shopping.ico", "", "0", "0", "Shopping"],
  [
    "Newegg",
    "http://www.newegg.com/Product/ProductList.aspx?Submit=ENE&DEPA=0&Order=BESTMATCH&N=-1&isNodeId=1&Description={%s}&x=0&y=0",
    "img/searchAll/favicons/neweggs.ico",
    "",
    "0",
    "0",
    "Shopping",
  ],
  ["Taobao", "http://s.taobao.com/search?q={%s}&commend=all&ssid=s5-e", "img/searchAll/favicons/taobao.ico", "", "0", "0", "Shopping"],
  ["360buy", "http://search.360buy.com/Search?keyword={%s}", "img/searchAll/favicons/360buy.ico", "", "0", "0", "Shopping"],
  ["etao", "http://s.etao.com/search?q={%s}&tbpm=t", "img/searchAll/favicons/etao.ico", "", "0", "0", "Shopping"],
  ["Facebook", "http://www.facebook.com/search/results.php?q={%s}", "img/searchAll/favicons/facebook.ico", "", "0", "0", "SocialNetwork"],
  ["Twitter", "http://twitter.com/#!/search/{%s}", "img/searchAll/favicons/twitter.ico", "", "1", "0", "SocialNetwork"],
  [
    "Linkedin",
    "http://www.linkedin.com/search/fpsearch?type=people&keywords={%s}&pplSearchOrigin=GLHD&pageKey=member-home",
    "img/searchAll/favicons/linkedin.ico",
    "",
    "0",
    "0",
    "SocialNetwork",
  ],
  ["Google plus", "https://plus.google.com/s/{%s}", "img/searchAll/favicons/googleplus.ico", "", "0", "0", "SocialNetwork"],
  ["Tumblr", "http://www.tumblr.com/tagged/{%s}", "img/searchAll/favicons/tumblr.gif", "", "0", "0", "SocialNetwork"],
  ["Flickr", "http://www.flickr.com/search/?q={%s}&f=hp", "img/searchAll/favicons/flicker.ico", "", "0", "0", "Images"],
  ["Pinterest", "http://pinterest.com/search/?q={%s}", "img/searchAll/favicons/pinterest.ico", "", "0", "0", "Images"],
  ["IMDB", "http://www.imdb.com/find?q={%s}&s=all", "img/searchAll/favicons/imdb.ico", "", "0", "0", "VideoMovie"],
  ["Youtube", "http://www.youtube.com/results?search_query={%s}", "img/searchAll/favicons/youtube.ico", "", "1", "0", "VideoMovie"],
  [
    "Slideshare",
    "http://www.slideshare.net/search/slideshow?searchfrom=header&q={%s}",
    "img/searchAll/favicons/slideshare.ico",
    "",
    "0",
    "0",
    "Documents",
  ],
  ["Scribd", "http://www.scribd.com/search?query={%s}", "img/searchAll/favicons/scribd.ico", "", "0", "0", "Documents"],
  ["ebookee", "http://ebookee.org/search.php?q={%s}&sa=Search", "img/searchAll/favicons/ebookee.ico", "", "0", "0", "Documents"],
  ["Allrecipes", "http://allrecipes.com/Search/Recipes.aspx?WithTerm={%s}", "img/searchAll/favicons/allrecipes.ico", "", "0", "0", "Recipes"],
  [
    "foodnetwork",
    "http://www.foodnetwork.com/search/delegate.do?fnSearchString={%s}&fnSearchType=site",
    "img/searchAll/favicons/foodnetwork.ico",
    "",
    "0",
    "0",
    "Recipes",
  ],
  ["Quora", "http://www.quora.com/search?q={%s}", "img/searchAll/favicons/quora.ico", "", "0", "0", "Answers"],
  ["Stackoverflow", "http://stackoverflow.com/search?q={%s}", "img/searchAll/favicons/stackoverflow.ico", "", "0", "0", "Answers"],
  ["Yahoo Answers", "http://answers.yahoo.com/search/search_result?p={%s}", "img/searchAll/favicons/yahooanswer.ico", "", "0", "0", "Answers"],
];

function InsertDefaultData(h) {
  function i(c) {
    c = c.match(/\/\/(.*?)\//)[1];
    var b = "chrome://favicon/http://" + c;
    try {
      requestFile(
        b,
        function (d) {
          b = makeDataUrl(d.contentType, d.data);
        },
        true
      );
    } catch (j) {
      b = "img/searchAll/favicon.png";
    }
    return b;
  }

  function f() {
    icon = DefaultData[a][2].length < 2 ? i(DefaultData[a][1]) : DefaultData[a][2];
    data = {
      name: DefaultData[a][0],
      searchurl: DefaultData[a][1],
      icondataurl: icon,
      suggestionuri: DefaultData[a][3],
      enable: DefaultData[a][4],
      index: DefaultData[a][5],
      category: DefaultData[a][6],
    };
    console.log(data);
    DB.transaction(function (c) {
      c.executeSql(
        "INSERT INTO items (name, searchurl, icondataurl, suggestionuri, enable, sort, category) VALUES (?, ?, ?, ?, ?, ?, ?);",
        [data.name, data.searchurl, data.icondataurl, data.suggestionuri, data.enable, data.index, data.category],
        function (b) {
          if (a < k - 1) {
            a++;
            f();
          } else {
            console.log("insert default data complate");
            b.executeSql("SELECT id FROM items WHERE enable =1", [], function (j, d) {
              rows = d.rows;
              for (var l = rows.length, g = [], e = 0; e < l; e++) g.push(rows.item(e).id);
              localStorage.customize_sort_id = JSON.stringify(g);
              h();
            });
          }
        }
      );
    }, error);
  }
  var k = DefaultData.length,
    a = 0;
  f();
}
