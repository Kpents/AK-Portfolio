const effectSwitcherToggler = document.querySelector(".effect-switcher-toggler");

effectSwitcherToggler.addEventListener("click", () =>{
	document.querySelector(".effect-switcher").classList.toggle("open");
})


window.addEventListener("scroll",() =>{
	if(document.querySelector(".effect-switcher").classList.contains("open")){
		document.querySelector(".effect-switcher").classList.remove("open");

	}
})

