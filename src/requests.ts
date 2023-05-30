export async function fetchWords(letters: string) {
  const queryParams = new URLSearchParams();
  queryParams.append("letters", letters);

  const url = new URL("http://localhost:8000");
  url.search = queryParams.toString();
  const response = await fetch(url.toString(), {
    headers: { Accept: "application/json" },
  });
  const jsonData = await response.json();
  console.log(jsonData);
  return jsonData;
}
