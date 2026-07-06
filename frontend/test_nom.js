async function test() {
    const res = await fetch('https://nominatim.openstreetmap.org/search?format=json&q=del&countrycodes=in&featuretype=settlement&addressdetails=1&limit=15');
    const data = await res.json();
    console.log(JSON.stringify(data, null, 2));
}
test();
