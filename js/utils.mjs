export function renderListWithTemplate(templateFn, parentElement, list, clear = true) {
    if (clear) parentElement.innerHTML = "";
    const htmlStrings = list.map(templateFn);
    parentElement.insertAdjacentHTML("afterbegin", htmlStrings.join(""));
}

export function setClick(selector, callback) {
    const element = document.querySelector(selector);
    if (element) {
        element.addEventListener("click", callback);
        element.addEventListener("touchend", (e) => {
            e.preventDefault();
            callback();
        });
    }
}