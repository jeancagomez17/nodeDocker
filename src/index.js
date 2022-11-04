const app =  require('./app')
require('./database')
async function init(){
    await app.listen(3000)
    console.log('Listening on http://localhost:3000')
}
init()