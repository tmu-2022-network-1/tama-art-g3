const getData = async () => {
  const endpoint =
    "https://script.google.com/macros/s/AKfycbxhZ4ww0rLhp6A72xu4HznL5g-cA6BqosnggI2xlzzqrQKqVbq2HTLZO8MpdnaIkZLG_Q/exec?sheet=group3";
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



// urlにパラメータ
const params = new URLSearchParams(window.location.search);
const id = params.get("id");




const renderEventList = (json) => {
  document.getElementById("content").innerHTML =
    `<ul id="events" class="columns is-multiline"></ul>`;

  const events = document.getElementById("events");
  for (const event of json.filter(d => d.name !== '')) {
    const startDate = DateTime.fromJSDate(new Date(event.startDate));
    const endDate = DateTime.fromJSDate(new Date(event.endDate));
    const thumbnail = event.thumbnail !== '' ? event.thumbnail : '../images/placeholder.png';
    const item = document.createElement("li");
    item.className = 'column is-one-quarter';
    item.innerHTML = `
      <div class="card">
      <div class="card-content">
          <h3 class="title is-5">
            <a href="event/?id=${event.id}">${event.title}</a>
          </h3>
          <div class="content">
          ${event.venue}
          <div>
          <div class="content is-small">
            ${startDate.setLocale('ja').toFormat('yyyy.MM.dd')} -
            ${endDate.setLocale('ja').toFormat('yyyy.MM.dd')}
          </div>
          <a href="event/?id=${event.id}" class="event-link">
            <figure class="image is-square is-one-quarter poster" style="background-image:url(${thumbnail})">
            </figure>
          </a>
        </div>
      </div>`;
    events.appendChild(item);
  }
}

const renderEvent = (json) => {
  console.dir(json);
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
      <h1>${event.event1}</h1>
      <h1>${event.openingTime}</h1>
      <h1>${event.station}</h1>

      
      `;
  }
};

getData('events').then((json) => renderEvent(json));
