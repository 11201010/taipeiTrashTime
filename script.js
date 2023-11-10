// Initialize the map
// set location to Taipei
const map = L.map("map").setView([25.067, 121.517], 11);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);
// url to download api: https://data.taipei/dataset/detail?id=6bb3304b-4f46-4bb0-8cd1-60c66dcd1cae
const csv_url = "./垃圾車點位資訊-2023-10-27_161009-utf8.csv";
const markers = L.markerClusterGroup();

async function getData() {
  const response = await fetch(csv_url);
  const csv = await response.text();
  const json = Papa.parse(csv).data;
  for (let i = 1; i < json.length; i++) {
    markers.addLayer(
      L.marker([json[i][11], json[i][10]])
        .bindPopup(
          "抵達時間：" +
            json[i][7] +
            "<br />" +
            "離開時間：" +
            json[i][8] +
            "<br />" +
            "地點：" +
            json[i][9] +
            "<br />" +
            "緯度：" +
            json[i][11] +
            "<br />" +
            "經度：" +
            json[i][10]
        )
        .openPopup()
    );
  }
  map.addLayer(markers);
}
getData().catch((error) => console.error(error));
