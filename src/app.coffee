http = require('http')

server = http.createServer (req, res) ->
  res.writeHead 200
  res.end 'Hello World!!'

server.listen 8080
