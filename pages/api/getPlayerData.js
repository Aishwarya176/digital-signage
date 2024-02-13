import axios from "axios";


export default async function handler(req, res) {

  const { playerId } = req.query;

  try {
    const response = await axios({
      method: "GET",
      url: `https://dev-api.cwcloud.in/digitalsignage/player/${playerId}`,
      headers: {
        "Content-Type": "application/json",
        "auth_token": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjdyIsInJvbGUiOiJBOEY3RkI3MDI2QkI0MUNBQjdEOEZDMTM1MDI2NjBEMyIsImV4cCI6MTcwNzgwNTU3NSwiaWF0IjoxNzA3NzE5MTc1fQ.XzQfRqY3hgUCTK2L5KB-uZiEJjNs8cTy5fxInFz7cEBvi5Uc8iRwSCnL9FyEHhE8c6OPVmYq4w9mnJR1aLlDYQ"
      }
    });
    const menuList = response.data;
    res.status(200).json(menuList);
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    res.status(500).json({ error: "Internal Server Error" });
  };
};