let url = "https://api.nationalize.io?name=";
let country_url = "https://restcountries.com/v3.1/all";
let div_1 = document.createElement("div");
div_1.setAttribute("id", "container");
div_1.setAttribute("class", "mx-auto my-5 border border-dark border-4");
document.body.append(div_1);
let form = document.createElement("form");
form.setAttribute("id", "text_cont");
form.setAttribute("onsubmit", "submit_handeler(event)");
div_1.appendChild(form);
form.innerHTML = `<div class="form-floating my-3 mx-auto" style="width: 60%;">
<input type="text" class="form-control" id="floatingInput" placeholder="Enter the Name" >
<label for="floatingInput">Enter the Name</label>
</div>
<div class="d-grid gap-2 col-2 mx-auto">
  <button class="btn btn-primary" id="submit" type="submit">Submit</button>
</div>`;
let sub_div = document.createElement("div");
sub_div.setAttribute("id", "result");
sub_div.setAttribute("class", "mx-auto my-5 border border-dark border-4");

function submit_handeler(e) {
  e.preventDefault();
}
async function getNameInfo() {
  try {
    let temp_data = await fetch(url + name_value.value);
    console.log(temp_data);
    let data1 = await temp_data.json();
    let data = data1.country;
    if (data.length >= 2) {
      let country_temp_data = await fetch(country_url);
      let country_data = await country_temp_data.json();
      const a = country_data.filter((ele) => {
        if (ele.cca2 === data[0].country_id) return ele;
      });
      const b = country_data.filter((ele) => {
        if (ele.cca2 === data[1].country_id) return ele;
      });
      div_1.appendChild(sub_div);
      sub_div.innerHTML = `<p class="text-capitalize fw-bold lh-lg">
        <h2 class="text-uppercase">Name:<mark>${name_value.value}</mark></h2>
        <h4>Possable Countries</h4>
      </p>
      <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Country Name</th>
      <th scope="col">Probability value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>${a[0].name.common}</td>
      <td>${data[0].probability.toFixed(4)}%</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>${b[0].name.common}</td>
      <td>${data[1].probability.toFixed(4)}%</td>
    </tr>
  </tbody>
</table>`;
    } else if (data.length == 1) {
      let country_temp_data = await fetch(country_url);
      let country_data = await country_temp_data.json();
      const a = country_data.filter((ele) => {
        if (ele.cca2 === data[0].country_id) return ele;
      });
      div_1.appendChild(sub_div);
      sub_div.innerHTML = `<p class="text-capitalize fw-bold lh-lg">
          <h2 class="text-uppercase">Name:<mark>${name_value.value}</mark></h2>
          <h4>Possable Countries</h4>
        </p>
        <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Country Name</th>
        <th scope="col">Probability value</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">1</th>
        <td>${a[0].name.common}</td>
        <td>${data[0].probability.toFixed(4)}%</td>
      </tr>
    </tbody>
  </table>`;
    } else {
      sub_div.innerHTML = `<p class="text-capitalize fw-bold lh-lg">
          <h2 class="text-uppercase">Name:<mark>${name_value.value}</mark></h2>
          <h4>Possable Countries</h4>
          <h4>No Data Founded</h4>
        </p>`;
    }
  } catch (error) {
    console.error(error);
    sub_div.innerText = "status: 422 statusText: Unprocessable Entity";
    
  }
}
let name_value = document.getElementById("floatingInput");
let btn = document.getElementById("submit");
btn.addEventListener("click", getNameInfo);
