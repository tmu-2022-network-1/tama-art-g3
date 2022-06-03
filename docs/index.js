const getData = async () => {
    const endpoint =
        "https://script.google.com/macros/s/AKfycbxYb6A56yxS_gLG_AkWxMODItAzBrzYYT8CT3Yvxel3UlgNhau-sJnH1ZbFM-Ho_GcQkA/exec";
    try {
        const response = await fetch(endpoint);
        if (response.ok) {
            const json = await response.json();
            return json;
        }
    } catch (error) {
        console.log(error);
    }
};

const renderResponse = (res) => {
    document.getElementById("response").value = JSON.stringify(res, null, 2);

    document.getElementsByClassName(
        "split right-box"
    )[0].innerHTML = `<ul id="venues"></ul>`;

    const venues = document.getElementById("venues");

    for (const venue of res) {
        const venueNode = document.createElement("li");
        venueNode.innerHTML = `<h3>${venue.name}</h3>
      <h4>${venue.address}<h4><h5>${venue.station}</h5>
      <hr>`;
        venues.appendChild(venueNode);
    }
};

getData().then((json) => renderResponse(json));
