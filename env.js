
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const ENV = {

    HTTP_Port: 80,
    __dirname: dirname(fileURLToPath(import.meta.url)),
    Public_Directory: ""

}

ENV.Public_Directory = ENV.__dirname + "/public"

export default ENV 
