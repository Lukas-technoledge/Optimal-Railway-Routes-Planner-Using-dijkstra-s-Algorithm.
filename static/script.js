document.addEventListener("DOMContentLoaded", function () {
    const pathForm = document.getElementById("path-form");
    const resultDiv = document.getElementById("result");

    pathForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        const startLocation = document.getElementById("start_location").value;
        const destination = document.getElementById("destination").value;

        const response = await fetch("/calculate", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `start_location=${startLocation}&destination=${destination}`,
        });

        const data = await response.json();

        if (data.error) {
            resultDiv.textContent = data.error;
        } else {
            resultDiv.innerHTML = `Shortest distance from ${startLocation} to ${destination}: ${data.shortest_dist} km<br>
                                   Estimated travel time: ${data.estimated_time}<br>
                                   Shortest path: ${data.shortest_path}`;
        }
    });
});
