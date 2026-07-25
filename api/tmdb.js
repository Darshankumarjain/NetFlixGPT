export default async function handler(req, res) {
  const path = req.query.path || "";
  const rest = { ...req.query };
  delete rest.path;
  const queryString = new URLSearchParams(rest).toString();

  const url = `https://api.themoviedb.org/3/${path}${queryString ? "?" + queryString : ""}`;

  try {
    const response = await fetch(url, {
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + process.env.TMDB_KEY,
      },
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: "TMDB proxy failed" });
  }
}   