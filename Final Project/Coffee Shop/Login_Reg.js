	  document.addEventListener("DOMContentLoaded", () => {
	const loginForm = document.querySelector("#login");
	const createAccountForm = document.querySelector("#createAccount");
		
	document.querySelector("#linkCreateAccount").addEventListener("click", e =>{
		e.preventDefault();
		loginForm.classList.add("form_hidden");
		createAccountForm.classList.remove("form_hidden");
	});
		
	document.querySelector("#linkLogin").addEventListener("click", e =>{
		e.preventDefault();
		loginForm.classList.remove("form_hidden");
		createAccountForm.classList.add("form_hidden");
	});
		
	loginForm.addEventListener("submit", e=> {
		e.preventDefault();
			
		setFormMessage(loginForm, "error", "Invalid username/password combination");
	});
		
	document.querySelectorAll(".form_input").forEach(inputElement => {
		inputElement.addEventListener("blur", e => {
			if(e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 6){
				setInputError(inputElement, "Username must be at least 6 characters in length");
			}
			if(e.target.id === "signupEmail"){
				var text = e.target.value;
				var regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
				//^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+).([a-z]{2,8})(.[a-z]{2,8})?$/;
				if(regex.test(text)){
					clearInputError(inputElement);
				} else {
					setInputError(inputElement, "Invalid Email!");
				}
			}
			if(e.target.id === "signupPassword" && e.target.value.length > 0 && e.target.value.length < 10){ // Тук може да се добави и паролата да съдържа поне 1 главна буква, поне 1 цифра и т.н....
				setInputError(inputElement, "Password must be at least 10 characters in length");
			}
			if(e.target.id === "signupConfirmPassword"){
				var password = document.getElementById("signupPassword").value;
				if(password != e.target.value){
					setInputError(inputElement, "Password didn't match! Please try again");
				} else {
					clearInputError(inputElement);	
				}
			}
		});
			
		inputElement.addEventListener("input", e => {
			clearInputError(inputElement);
		});
	});
		
});
		
function signUp(){
	const auth = firebase.auth();
		  
	var email = document.getElementById("signupEmail");
	var password = document.getElementById("signupPassword");
			  
	const promise = auth.createUserWithEmailAndPassword(email.value, password.value);
	
	const loginForm = document.querySelector("#login");
	const createAccountForm = document.querySelector("#createAccount");
	loginForm.classList.add("form_hidden");
	createAccountForm.classList.remove("form_hidden");
}

(function(){
	var ui = new firebase.auth.AuthUI(firebase.auth());
	var uiConfig = {
		callback: {
			signInSuccess: function(currentUser, credential,redirectUrl){
				return true;
			},
			uiShown: function(){
				
			}
		},
		signInFlow: 'popup',
		signInSuccess: 'Coffee Shop.html',
		signInOptions: [
			firebase.auth.GoogleAuthProvider.PROVIDER_ID
		],
		tosUrl: 'Coffee Shop.html'
	};
	ui.start('#firebaseui-auth-container', uiConfig);
})()

function signIn(){
	const auth = firebase.auth();
		  
	var email = document.getElementById("signupEmail");
	var password = document.getElementById("signupPassword");
			  
	const promise = auth.signInWithEmailAndPassword(email.value, password.value);
	
	window.location.replace('Coffee Shop.html');
}
	
var uid = null;

firebase.auth().onAuthStateChanged(function(user){
	if(user){
		uid = user.uid;
	}else {
		uid = null;
		window.alert("Invalid username/password combination");
	}
});	
		  
function setFormMessage(formElement, type, message){
	const messageElement = formElement.querySelector(".form_message");
	
	messageElement.textContent = message;
	messageElement.classList.remove("form_message_success", "form_message_error");
	messageElement.classList.add("form_message_$(type)");
}

function setInputError(inputElement, message){
	inputElement.classList.add("form_message_input");
	inputElement.parentElement.querySelector(".form_input_error").textContent = message;
}

function clearInputError(inputElement){
	inputElement.classList.remove("form_message_input");
	inputElement.parentElement.querySelector(".form_input_error").textContent = "";
}
