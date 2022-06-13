const getData = async () => {
  const endpoint =
    "https://script.googleusercontent.com/macros/echo?user_content_key=l7eaf9Pz5HsRoUnKGKSmmGpHJDHOxodUyfQpfS7F0iKKIpGX_CKIZ0SsYoM3LIVH7MsWAYyl510r-VO7YHE3shRKsEsi8xfkm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnEmHHJxhC_oe1Qmd2R-eXjoXgTxWUu4HYlJom6QacPSgNEmyKwSz32FPG-bn2sJSQBMlTA-c0F3yHHty0meKf-_VOxuX8xhGctz9Jw9Md8uu&lib=MabRb0sHcOdgcukW2MiMwBlocHvvcqee0";

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

const renderResponse = (json) => {

    for (const event of json.filter(d => d.id == id)) {
		document.getElementById("content").innerHTML =`
      <h1>${event.name}</h1>
      <a>住所： ${event.address}</a>
      <a>最寄駅： ${event.station}</a>
      <a>${event.access}</a>
      <p>休館日： ${event.closingDay}</p>
      <p>開館時間： ${event.openingTime}</p>
      <p>電話番号： ${event.telephone}</p>
      `;
    }
};

getData().then((json) => renderResponse(json));