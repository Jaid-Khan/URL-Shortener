function copytext(){
    const getText = document.getElementById("textToCopy").innerText;
    navigator.clipboard.writeText(getText).then(() => {
        alert("Text copied to clipboard!");
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}