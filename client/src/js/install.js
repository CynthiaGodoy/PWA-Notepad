const butInstall = document.getElementById('buttonInstall');

//LOGIC FOR INSTALLING THE PWA
//EVENT HANDLER TO THE BEFOREINSTALLPROMPT EVENT
window.addEventListener('beforeinstallprompt', (event) => {
    window.deferredPrompt = event;
    butInstall.classList.toggle('hidden', false);
});

//CLICK EVENT HANDLER ON THE BUTINSTALL ELEMENT
butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;
    if(!promptEvent) {
        return;
    }
    //SHOW PROMPT
    promptEvent.prompt();
    //RESET THE DEFERRED PROMPT VARIABLE, IT CAN ONLY BE USED ONCE
    window.deferredPrompt = null;
    butInstall.classList.toggle('hidden', true);
});

//EVENT HANDLER FOR THE APPINSTALLED EVENT
window.addEventListener('appinstalled', (event) => {
    //CLEAR PROMPT
    window.deferredPrompt = null;
});
