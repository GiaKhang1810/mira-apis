function DOMContentLoaded() {
    const expiredMS = 5 * 60 * 1000;
    
    function refresh() {
        fetch("/refresh", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + document.querySelector("#token").value
            }
        })
        .then(res => res.json())
        .then(function (res) {
            if (res.token) 
                document.querySelector("#token").value = res.token;

            setTimeout(refresh, expiredMS - 5000);
        })
        .catch(console.error);
    }
    setTimeout(refresh, expiredMS - 5000);
}
document.addEventListener("DOMContentLoaded", DOMContentLoaded);