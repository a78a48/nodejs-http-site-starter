import url from "url"
import fs from "fs"
import path from "path"
import ENV from "../env.js"

const Default_Page = "index.html"

export function handle_files(req, res) {

    if (!ENV.__dirname) {
        console.error("ENV.__dirname not set.")
        return
    }

    const q = url.parse(req.url || "", true)

    const req_path = q.pathname || ""

    let filepath = ENV.Public_Directory + (req_path === "/" ? "" : req_path)

    if (IsDirectory(filepath))
        filepath = filepath + "/" + Default_Page

    console.log("---> read", filepath)

    fs.readFile(filepath, (err, data) => {

        if (err) {

            console.error("handle_files", filepath)
            res.writeHead(404, { "Content-Type": "text/plain" })
            return res.end("404 Not Found");

        } else {

            const ext = path.extname(filepath)

            const ContentType = MIME_Map.get(ext)

            if (!ContentType) {
                // 415 Unsupported Media Type
                console.log("No MIME defined for", ext)
                res.writeHead(415, { "Content-Type": "text/plain" })
                res.end("415 Unsupported Media Type" + ext)

            } else {

                res.writeHead(200, { "Content-Type": ContentType })
                res.end(data)
            }
        }//if
    })
}

function IsDirectory(filepath) {
    return fs.existsSync(filepath) && fs.lstatSync(filepath).isDirectory();
}

const MIME_Map = new Map([
    [".html", "text/html"],
    [".htm", "text/html"],
    [".txt", "text/plain"],
    [".css", "text/css"],
    [".js", "text/javascript"],
]);

