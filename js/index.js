
function register(event) {
    event.preventDefault();
    const firstName = document.querySelector('#firstName').value;
    const lastName = document.querySelector('#lastName').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    // console.log(firstName, lastName, email, password)

    if (firstName == "" || lastName == "" || email == "" || password == "") {
        document.querySelector('#errorMessage').innerHTML = `
        <div class="alert alert-danger" id="errorMessage"> An error has occured </div>
        `;
    } else {
        const data = {
            firstname: firstName,
            lastname: lastName,
            password: password,
            username: email,
            email: email,
            authType: "userAuth",
            submit: "Apply",
            passwordType: "Cleartext-Password"
        };

        //console.log(data)
             $.when(
                 $.ajax({
                     url: "http://172.16.0.144/daloradius/mng-new.php",
                     data: data,
                     dataType: "text/html",
                     type: "POST",
                     error: function(err) {
                         //console.log("an error has occured")
             		//console.warn(err)
			if(err.responseText.indexOf(`user already exist in database`) !== -1)
				 document.querySelector('#errorMessage').innerHTML = `<div class="alert alert-danger">Email is already in use</div>`
			else{
				 document.querySelector('#errorMessage').innerHTML = `<div class="alert alert-success">Registred</div>`
				setTimeout(function(){ window.location.href = "http://172.16.0.7:8004/index.php?zone=portail_captif_esprit" },2000)
				//window.location.href = "http://172.16.0.7:8004/index.php?zone=portail_captif_esprit"
				//document.querySelector('#errorMessage').innerHTML = `<div class="alert alert-success">Registred</div>`
			    }
		    }

                 })
             ).done((result) => {
		 document.querySelector('#errorMessage').innerHTML = `<div class="alert alert-success">Registred</div>`
                setTimeout(function(){ window.location.href = "http://172.16.0.7:8004/index.php?zone=portail_captif_esprit" },2000)

                 //console.log("result")
		//document.querySelector('#errorMessage').innerHTML = ` <div class="alert alert-success"> registred successfully </div> `
             })
    }
}

function validate() {
    const emailPattern = /^\b[A-Z0-9._%-]+@esprit.tn\b$/i
    const email = document.querySelector('#email').value;

    if (!emailPattern.test(email)) {
        //console.log("does not match")
        document.querySelector('#emailError').innerHTML = `
            <div class="alert alert-danger"> Esprit email is required! </div>
        `
        document.querySelector("#btn").disabled = true;
    } else {
        //console.log("it's okey")
        document.querySelector('#emailError').innerHTML = "";
        document.querySelector("#btn").disabled = false;
    }
}
