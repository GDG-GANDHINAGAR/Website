document.querySelector('svg').addEventListener('click', function() {
    document.querySelector('svg').classList.toggle('animated')
    console.log("fuck")
})
$("svg").click(function() {
    this.addclass("animated")
})