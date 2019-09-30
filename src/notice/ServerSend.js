const source = new EventSource('http://open.local.com/api/send')
source.onmessage = function(event) {
  console.log(event.data)
}
export default source
