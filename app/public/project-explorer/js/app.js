const path = window.location.href
if (path.includes("register.html")) {
    window.onload = function () {
        //Fetching programs
        let programs = document.getElementById("programs")
        fetch('/api/programs', {
            method: 'GET',
            header: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(response => {
                console.log(response)
                programs.innerHTML = '';
                for (let i = 0; i < response.length; i++) {
                    let createOption = document.createElement("option")
                    createOption.innerHTML = response[i];
                    programs.appendChild(createOption);
                }
            })
            .catch(error => {
                console.log('ERROR:', error)
            })

        //Fetching graduationYears
        let graduationYears = document.getElementById("graduationYears")
        fetch('/api/graduationYears', {
            method: 'GET',
            header: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(response => {
                console.log('gradutionYears', response)
                graduationYears.innerHTML = '';
                for (let i = 0; i < response.length; i++) {
                    let gradOptions = document.createElement("option")
                    gradOptions.innerHTML = response[i];
                    graduationYears.appendChild(gradOptions);
                }
            })
            .catch(error => {
                console.log('ERROR:', error)
            })

    }

    let signupForm = document.getElementById("signupForm")
    const alert = document.querySelector(".alert-danger")
    alert.style.display = "none";
    function postData(event) {
        event.preventDefault()
        let signupData = {
            firstname: document.getElementsByName("firstName")[0].value,
            lastname: document.getElementsByName("lastName")[0].value,
            email: document.getElementsByName("email")[0].value,
            password: document.getElementsByName("password")[0].value,
            matricNumber: document.getElementsByName("matricNumber")[0].value,
            program: document.getElementsByName("program")[0].value,
            graduationYear: document.getElementsByName("graduationYear")[0].value
        }

        fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signupData)
        })
            .then((response) => response.json())
            .then(response => {
                console.log(response)
                if (response.status == "ok") {
                    document.cookie = `uid = ${response.data.id}; expires=Wed, 30 June 2021 12:00:00 UTC"; path=/`;

                    window.location.href = "index.html"
                }
                else if (response.status != "ok") {
                    alert.style.display = "block"
                    let errors = response.errors.toString().replaceAll(",", "<br>")
                    alert.innerHTML = errors;
                    /*  for(let i = 0; i < response.errors.length; i++){
                          let para = document.createElement("p");
                          para[i].innerHTML = response.errors[i];
                          alert.appendChild(para);
                      }*/
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    signupForm.addEventListener('submit', postData)
}

if (document.cookie) {
    function getCookie(cookiename) {
        var name = cookiename + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var splitDecodedCookie = decodedCookie.split(';');
        for (var i = 0; i < splitDecodedCookie.length; i++) {
            var cook = splitDecodedCookie[i];
            while (cook.charAt(0) == ' ') {
                cook = cook.substring(1);
            }
            if (cook.indexOf(name) == 0) {
                return cook.substring(name.length, cook.length);
            }
        }
        return null;
    }

    let lookupCookie = getCookie("uid")
    console.log(lookupCookie)
    let getusername = document.getElementById("username")
    let getLogout = document.getElementById("logout")
    // let loggedinDisplay = document.getElementById("loggedinDisplay")
    let login = document.getElementById("login")
    let signup = document.getElementById("signup")

    let verifyCookie = lookupCookie ? true : false;

    if (verifyCookie === true) {
        fetch(`/api/users/${lookupCookie}`, {
            method: 'GET',
            header: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                signup.style.display = "none"
                login.style.display = "none"
                getLogout.style.display = "block"
                getusername.style.display = "block"
                getusername.innerHTML = ` Hi, ${data.firstname}`
            })
            .catch(error => {
                console.log(error)
            })
    }

    // Log out user and removes cookie
    let exitlogin = document.getElementById("logout")
    function logout(event) {
        event.preventDefault()
        document.cookie = `uid =;  expires=Sun, 30 May 1981 12:00:00 UTC"; path=/`;
        window.location.href = "index.html";
        let getNavLinkss = document.querySelector("#notLogged")
        getNavLinkss.style.display = 'block'
    }
    exitlogin.addEventListener("click", logout)
}

// Login page

if (window.location.href.includes("login.html")) {

    let loginForm = document.getElementById("loginForm")
    const loginAlert = document.querySelector(".alert-danger")
    loginAlert.style.display = "none";
    window.onload = function () {
        function sendPost(event) {
            event.preventDefault()
            let loginData = {
                email: document.getElementsByName("email")[0].value,
                password: document.getElementsByName("password")[0].value
            }

            fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            })
                .then(result => result.json())
                .then(result => {
                    console.log(result)
                    if (result.status === "ok") {
                        console.log(result.data)
                        document.cookie = `uid = ${result.data.id}; domain=; path=/`;

                        window.location.href = "index.html"
                    }
                    else if (result.status !== "ok") {
                        loginAlert.innerHTML = "Invalid email/password";
                        loginAlert.style.display = "block"
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }
        loginForm.addEventListener("submit", sendPost)
    }
}


//create project
if (window.location.href.includes("createproject.html")) {
        //check if cookie id exist
        let lookupCookie = document.cookie.split(";").some((item) => item.trim().startsWith('uid='));
        if (!lookupCookie) {
            window.location.href = "login.html"
        }
        //create and post projects
        let createProjectForm = document.getElementById("createProjectForm")
        const CPAlert = document.querySelector(".alert-danger")
        function transferPost(event) {
            event.preventDefault()
            let CPData = {
                name: document.getElementsByName("name")[0].value,
                abstract: document.getElementsByName("abstract")[0].value,
                authors: (document.getElementsByName("authors")[0].value).split(","),
                tags: (document.getElementsByName("tags")[0].value).split(",")
            }
            console.log(CPData)
            fetch('/api/projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(CPData)
            })
                .then(response => response.json())
                .then(result => {
                    console.log(result.data)
                    if (result.status === "ok") {
                       window.location.href = "index.html"
                    }
                    else if (result.status !== "ok") {
                        CPAlert.style.display = "block"
                        let CPerrs = result.errors.toString().replaceAll(",", "<br>")
                        CPAlert.innerHTML = CPerrs;
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }
        createProjectForm.addEventListener("submit", transferPost)

}



if (window.location.href.includes('index.html')) {
    window.onload = function () {
        let showcase = document.querySelector('.showcase');
        let projectTitle = document.querySelectorAll('.card-title');
        let authors = document.querySelectorAll('.card-subtitle');
        let abstract = document.querySelectorAll('.card-text');
        let tags = document.querySelectorAll('.tags');



        fetch('/api/projects', {
            method: 'GET',
            header: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(result => {
                console.log('index', result)
                for (let i = 0; i < 4; i++) {
                    projectTitle[i].innerHTML = `<a href = "viewproject.html?id=${result[i].id}">${result[i].name}</a>`
                    projectTitle[i].style.color = 'red';
                    authors[i].innerHTML = `${result[i].authors}`
                    abstract[i].innerHTML = `${result[i].abstract}`
                    tags[i].innerHTML = `${result[i].tags}`

                }
                showcase.style.visibility = 'visible'
            })
            .catch(error => {
                console.log(error)
            })
    }
}


// view project page 
if (window.location.href.includes('viewproject.html')) {
    window.onload = function () {
        let params = new URLSearchParams(document.location.search.substring(1));
        let newId = params.get("id")
        console.log(newId)
        let pName = document.getElementById('project_name')
        let pAbstract = document.getElementById('project_abstract')
        let pAuthors = document.getElementById('project_authors')
        let pTags = document.getElementById('project_tags')

        fetch(`/api/projects/${newId}`, {
            method: 'GET',
            header: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(result => {
                console.log('viewProject', result)
                pName.innerHTML = result.name;
                pAbstract.innerHTML = result.abstract;
                pTags.innerHTML = result.tags;
                pAuthors.innerHTML = ''
                for (let i = 0; i < result.authors.length; i++) {
                    let authorsPara = document.createElement('p')
                    authorsPara.innerHTML = `${result.authors[i]}`
                    pAuthors.appendChild(authorsPara)
                }

                fetch(`/api/users/${result.createdBy}`, {
                    method: 'GET',
                    header: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => response.json())
                    .then(result => {
                        console.log('createdBy', result)
                        let projectAuthor = `${result.firstname} ${result.lastname}`;
                        document.getElementById("project_author").textContent = projectAuthor;
                    })
            }).catch(error => {
                console.log(error)
            })
    }
} 
