(function() {

    nunt.on(nunt.CONNECTED, function() { });

    nunt.on("log", function(e) {
        var logDom = document.getElementById("log");
        logDom.innerHTML = e.log;
    });

    nunt.on("deploys", function(e) {
        var template = "{{#deploys}}<tr data-id='{{deploy.id}}'><td><button>DEPLOY</button><td>{{deploy.repo}}</td><td>{{deploy.branch}}</td></tr>{{/deploys}}";
        var html = Mustache.to_html(template, e);
        document.querySelector(".deploys-box tbody").innerHTML = html;

        var buttons = document.querySelector(".deploys-box button");
        buttons.addEventListener("click", function() {
            var id = this.parentNode.parentNode.getAttribute("data-id");
            nunt.send("run-deploy", {id: id});
        }, false);
    });

    nunt.on("not-logged-in", function(e) {

        var logDom = document.getElementById("log");
        logDom.innerHTML = "Please login!";
        var logContainer = document.querySelector(".login-box");
        logContainer.style.display = "block";

        document.querySelector(".deploys-box").style.display = "none";
        document.querySelector(".login-box .error").style.display = "none";

        document.querySelector(".login-box button").addEventListener("click", function() {
            document.getElementById("log").innerHTML = "Trying to log in...";
            var username = document.querySelector(".login-box #username").value;
            var password = document.querySelector(".login-box #password").value;
            nunt.send("login", {username: username, password: password});
        }, false);

    });

    nunt.on("login-error", function(e) {
        document.getElementById("log").innerHTML = "Login error";
        document.querySelector(".login-box .error").style.display = "block";
    });

    nunt.on("login-succeded", function(e) {
        document.querySelector(".login-box button").removeEventListener("click");
        document.querySelector(".login-box").style.display = "none";
        document.querySelector(".deploys-box").style.display = "block";
    });

})();
