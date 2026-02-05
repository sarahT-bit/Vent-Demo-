// ABSOLUTE MINIMUM MAP TEST
const map = L.map('map').setView([40.7128, -74.0060], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19
}).addTo(map);

// TEST CIRCLE (you should SEE THIS)
L.circle([40.7128, -74.0060], {
  radius: 500,
  color: 'red',
  fillOpacity: 0.3
}).addTo(map);

// Example function to open the chat with post data
function openPostChat(postData) {
    const panel = document.getElementById('chat-panel');
    
    // 1. Inject the post data into the UI
    document.getElementById('chat-post-title').innerText = postData.title;
    document.getElementById('chat-post-author').innerText = postData.user;
    document.getElementById('chat-post-desc').innerText = postData.description;
    
    // 2. Clear previous messages (optional)
    document.getElementById('chatMessages').innerHTML = 
        `<div class="message system">Displaying thread for "${postData.title}"</div>`;
    
    // 3. Show the panel
    panel.hidden = false;
}

// Example: How you would call it from a map marker click
// marker.on('click', () => {
//    openPostChat({
//        title: "Traffic is insane!",
//        user: "RoadRager99",
//        description: "Been stuck on the I-95 for 40 minutes. Avoid at all costs."
//    });
// });

function closeChat() {
    document.getElementById('chat-panel').hidden = true;
}

