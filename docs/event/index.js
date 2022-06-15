const getData = async () => {
  const endpoint =
    "https://script.googleusercontent.com/macros/echo?user_content_key=U9f2NcUmhV0KMZe97gdZyV7ODzsSwDcxWJTP5T-cGCegMWq3yfDgd1j-j5YDlMptPmOrvuDhoS0lNzJi01wuM_oUbLHEqj_Tm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnGZdoPlb0IGml4_OMP16J45dKse2zz4h-WDBTs9xzMk7kkFz-Bu9aE-kz-ysEQ868d3uVCuwDB3jDPuUtGg-AA_8IR5cXPekpO6QzIpnjC14TjygBgXw9YE&lib=MabRb0sHcOdgcukW2MiMwBlocHvvcqee0";

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
      <div style="margin: 30px auto; text-align:center; display: block;">
      <h1>${event.venue}</h1>
      <p><img src = "${event.thumbnail}" width = "300"></p>
      <p style="text-align: left; display: inline-block; padding: 20px;">
      <p>住所： ${event.address}</p>
      <p>最寄駅： ${event.station}</p>
      <p>アクセス： ${event.access}</p>
      <p>休館日： ${event.closingDay}</p>
      <p>開館時間： ${event.openingTime}</p>
      <p>電話番号： ${event.telephone}</p>
      <p><a href = "${event.url}">ホームページ</a></p>
      </p>
      </div>
      `;
    }
};

getData().then((json) => renderResponse(json));
