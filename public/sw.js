self.addEventListener('install', function() {
  console.log('install')
})
self.addEventListener('activate', async function() {
  const source = new EventSource('http://open.local.com/api/send')
  source.onmessage = function(event) {
    const  options = {
      body: event.data,
      icon: 'http://front.jingmai.shop/app/logo.png'
    }
    self.registration.showNotification('open source',options);
  }
})
