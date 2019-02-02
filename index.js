const express = require("express");
const app = express();
const port = 18500;

const bodyParser = require("body-parser");

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

const userDataList = [
  {
    name: "Mart1",
    money: 2500
  },
  {
    name: "Mart2",
    money: 3000
  },
  {
    name: "Mart3",
    money: 5000
  }
];

const fetchUserData = userList => {
  const outputData = userList.map((value, index) => {
    return {
      id: index,
      name: value.name,
      money: value.money
    };
  });
  return outputData;
};

const filterData = userList => {
  const outputData = userList.filter((value, index) => value.money < 4000);
  return outputData;
};

app.get("/", async (req, res) => {
  const fetchUser = await fetchUserData(userDataList);
  return res.status(200).json({
    code: 200,
    data: fetchUser
  });
});

app.get("/lower4k", async (req, res) => {
  const dataOut = await filterData(userDataList);
  return res.status(200).json({
    code: 200,
    data: dataOut
  });
});

app.get("/user/:name", async (req, res) => {
  const userData = userDataList.find(value => value.name === req.params.name);
  return res.status(200).json({
    code: 200,
    userData: userData ? userData : {}
  });
});

app.post("/user", async (req, res) => {
  const userData = req.body.userData;
  userDataList.push(userData);

  return res.status(200).json({
    code: 200,
    data: userDataList
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
