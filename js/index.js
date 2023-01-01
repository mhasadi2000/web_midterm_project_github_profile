const baseUrl = "https://api.github.com/users";

function setHtml(data) {
    document.getElementById("username").innerHTML = data.name;
    if (data.avatar_url) {
        document.getElementById("img-avatar").innerHTML =
            '<img src="' + data.avatar_url + '" alt="avatar" class="avatar"/>';
    } else document.getElementById("img-avatar").innerHTML = "";

    document.getElementById("blog").innerHTML = data.blog;
    if (data.bio) {
        document
            .querySelector(".main-card")
            .appendChild(document.createElement("div"));

        document.getElementById("bio").innerHTML =
            "<pre>" + data.bio + "</pre>";
    } else document.getElementById("bio").innerHTML = "";

    document.getElementById("location").innerHTML = data.location;
}

async function handleSubmit(e) {
    e.preventDefault();
    const name = document.getElementById("name").value;

    const queries = window.localStorage.getItem("queries") // already fetched queries that stored in local storage
        ? JSON.parse(window.localStorage.getItem("queries"))
        : new Map();
    document.getElementById("username-text").innerHTML = "";
    if (!queries[name]) {
        fetch(`${baseUrl}/${name}`) //fetch data from given api
            .then((response) => response.json())
            .then((data) => {
                if (data.message) {
                    // check that user exists or not
                    setDefualtHtml();
                    document.getElementById("username-text").innerHTML =
                        "User not found";
                } else {
                    setHtml(data);
                    queries[name] = data;
                    window.localStorage.setItem(
                        "queries",
                        JSON.stringify(queries)
                    );
                }
            });
    } else {
        setHtml(JSON.parse(window.localStorage.getItem("queries"))[name]);
    }
}

function setDefualtHtml() {
    // set innerHTML of our elements
    document.getElementById("username").innerHTML = "";
    document.getElementById("img-avatar").innerHTML = "";
    document.getElementById("blog").innerHTML = "";
    document.getElementById("bio").innerHTML = "";
    document.getElementById("location").innerHTML = "";
}
