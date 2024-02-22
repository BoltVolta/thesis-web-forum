




////////////////////////////////////////////////////////
////////////////////////FIX THIS////////////////////////
////////////////////////////////////////////////////////

var errorContainer = document.getElementById('popup');

function errorMsg() {
    var errorHtml = `
				<div class="overlay-container is-active">
					<div class="overlay" tabindex="-1" data-url="null" role="alertdialog" aria-hidden="false">
						<div class="overlay-title"><a class="overlay-titleCloser" onClick="closeOverlay(this)" aria-label="Close">X</a>Oops! We ran into
							some problems.</div>
						<div class="overlay-content">
							<div class="blockMessage">
								Please enter a valid message.
							</div>
						</div>
					</div>
				</div>
				`
    errorContainer.insertAdjacentHTML('beforeend', errorHtml);
}

function closeOverlay() {
    document.getElementById("popup").style.display = "none";
}
function init() {
    document.getElementById("text").value = "";
}
window.onload = init;