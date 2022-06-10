import { getData } from "./modules/getdata.js";

// const getData = async () => {
//     const endpoint =
//         "https://script.google.com/macros/s/AKfycbxhZ4ww0rLhp6A72xu4HznL5g-cA6BqosnggI2xlzzqrQKqVbq2HTLZO8MpdnaIkZLG_Q/exec?sheet=group3";
//     try {
//         const response = await fetch(endpoint);
//         if (response.ok) {
//             const json = await response.json();
//             return json;
//         }
//     } catch (error) {
//         console.log(error);
//     }
// };

const renderVenues = (res, group3) => {
    document.getElementsByClassName(
        "split right-box"
    )[0].innerHTML = `<ul id="venues" class="columns is-multiline is-gapless"></ul>`;  //is-multilineで折り返す、is-gaplessで余白無し

    const venues = document.getElementById("venues");

    for (const venue of res.filter(d => d.name !== '')) {
        // const photo = venue.photo !== '' ? venue.photo : 'images/dummy_3.jpeg';
        const photo = group3.find(d => d.id == venue.id)?.photo || 'images/dummy_3.jpeg';
        const venueNode = document.createElement("li");
        venueNode.className = 'column is-one-third';  //is-half=半分、is-one-third:1/3

        venueNode.innerHTML = `
        <div class = "card">
            <figure class = "image is-one-third">
            </figure>
            <div class = "content">
            </div>

            <div class = "box">

                <a href="event/?id=${venue.id}" class="event-link">
                <figure class="image is-square is-one-quarter poster" style="background-image:url(${photo})">
                </figure>
                </a>

                <h3 class = "subtitle">
                    ${venue.name}
                </h3>
                </a>
            <div>
        </div>`;
        venues.appendChild(venueNode);
    }
}

const renderResponse = (res) => {

    getData("group3").then((group3) => renderVenues(res, group3));
    //変なボックス削除
    //document.getElementById("response").value = JSON.stringify(res, null, 2);

};



//個々のページに飛ぶ
const renderEvent = (json) => {
    if (!id) {  //もしidがなかったら
        renderEventList(json);
        const eventLinks = document.querySelectorAll('.event-link');
        for (const eventLink of eventLinks) {
            eventLink.onmouseover = (e) => {
                document.querySelector('.preview').style.backgroundImage = e.target.style.backgroundImage;
            };
        }
        return;
    }

    //個別のイベントを表示
    const event = json.find((d) => d.id === id);  //idが完全に一致していたら
    if (event) {
        document.title = `${event.title} | tama.potari`;
        document.getElementById("content").innerHTML = `
      <h1>${event.abc}</h1>
      <a href="../venue/?id=${event.venueId}">${event.venue}</a>
      <figure>
        <img src="${event.thumbnail}" alt="${event.title}">
      </figure>`;
    }
};

getData("venues").then((json) => renderResponse(json));



//会場一覧のtop pageからそれぞれの会場のページに飛んで、そこにその会場の住所や、その会場でやっているイベントを表示させたい
