var DB;

function error(a) {
  console.log("database error", a);
}

function erroru(a) {
  console.log("database error---", a);
}
DB = openDatabase("SearchO", "", "SearchO items", 5242880, function (a) {
  a.transaction(function (b) {
    b.executeSql(
      "CREATE TABLE items (id INTEGER PRIMARY KEY,name TEXT NOT NULL,searchurl TEXT NOT NULL,icondataurl TEXT,suggestionuri TEXT,enable INTEGER,sort INTEGER,category TEXT);",
      [],
      function () {
        InsertDefaultData(function () {
          console.log("insert over");
          util.CreateContextMenu();
        });
      }
    );
  }, error);
});

function LoadItemsByList(a, b) {
  DB.readTransaction(function (c) {
    c.executeSql("SELECT * FROM items WHERE enable=?;", [a], function (d, e) {
      b(d, e);
    });
  }, erroru);
}

function LoadAllItems(a) {
  DB.readTransaction(function (b) {
    b.executeSql("SELECT * FROM items order by sort asc", [], function (c, d) {
      a(c, d);
    });
  }, error);
}

function LoadItemById(a, b) {
  DB.readTransaction(function (c) {
    c.executeSql("SELECT * FROM items WHERE id=?;", [a], function (d, e) {
      b(d, e);
    });
  }, error);
}

function LoadItemBySearchurl(a, b) {
  DB.readTransaction(function (c) {
    c.executeSql("SELECT * FROM items WHERE searchurl=?;", [a], function (d, e) {
      b(d, e);
    });
  }, error);
}

function AddCustomizeSearch(a, b, c, d) {
  DB.transaction(function (e) {
    e.executeSql(
      "INSERT INTO items (name, searchurl, icondataurl, suggestionuri, enable, sort, category) VALUES (?, ?, ?, ?, ?, ?, ?);",
      [a, b, c, "", 1, 0, "customize"],
      function (f, g) {
        d(f, g);
      }
    );
  });
}

function DeleteItemFromId(a, b) {
  DB.transaction(function (c) {
    c.executeSql("DELETE FROM items WHERE id = " + a, [], function (d, e) {
      b(d, e);
    });
  });
}

function ModifyEnable(a, b, c) {
  DB.transaction(function (d) {
    d.executeSql("UPDATE items SET enable = ? WHERE id = ?", [b, a], function (e, f) {
      c(e, f);
    });
  });
}
