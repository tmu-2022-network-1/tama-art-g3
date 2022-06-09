const getData = async () => {
    const endpoint =
        "https://script.google.com/macros/s/AKfycbxYb6A56yxS_gLG_AkWxMODItAzBrzYYT8CT3Yvxel3UlgNhau-sJnH1ZbFM-Ho_GcQkA/exec?sheet=group3";
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
    //変なボックス削除
    //document.getElementById("response").value = JSON.stringify(res, null, 2);

    document.getElementsByClassName(
        "split right-box"
    )[0].innerHTML = `<ul id="venues" class="columns is-multiline is-gapless"></ul>`;  //is-multilineで折り返す、is-gaplessで余白無し

    const venues = document.getElementById("venues");

    for (const venue of res.filter(d => d.name !== '')) {
        const photo = venue.photo !== '' ? venue.photo : 'images/placeholder.png';
        const venueNode = document.createElement("li");
        venueNode.className = 'column is-one-third';  //is-half=半分、is-one-third:1/3

        venueNode.innerHTML = `
        <div class = "card">
          <div class = "text-area">
            <h3 class = subtitle is-6>
              ${venue.name}
            </h3>
            <figure class = "image is-one-third">


            </figure>
          </div>



          <div class = "content">
          </div>

          <a href = "#">
            <figure class="image is-square is-one-quarter poster" style="background-image:url(${photo})">
            </figure>
          </a>
        </div>
        

      </div>`;
        venues.appendChild(venueNode);
    }
};

getData().then((json) => renderResponse(json));
