import axios from "axios";


export default async function handler(req, res) {

  const { playerId } = req.query;

  try {
    const response = await axios({
      method: "GET",
      url: `https://dev-api.cwcloud.in/digitalsignage/player/${playerId}`,
      headers: {
        "Content-Type": "application/json",
        "auth_token": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjdyIsInJvbGUiOiJBOEY3RkI3MDI2QkI0MUNBQjdEOEZDMTM1MDI2NjBEMyIsImV4cCI6MTcwNzg5MzQwNywiaWF0IjoxNzA3ODA3MDA3fQ.TavUMn_pNswJjIDF4cfMFZ0uk2sfI_V59f3hrUx-oQpJtJVkk645Hq7qPb9YCxLcscDWX6KPY8TXcjqDJriaxA"
      }
    });
    const menuList = response.data;
    res.status(200).json(menuList);
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    res.status(500).json({ error: "Internal Server Error" });
  };
};