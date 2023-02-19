export default class AssetsLoader {

    basePath: string

    constructor(
        basePath?: string
    ){
        this.basePath = basePath ?? "assets"
    }

    loadFromJSON = (fileName: string) => { return new Promise((resolve,reject) => {
            fetch(`${this.basePath}/${fileName}.json`)
                .then(res => res.json())
                .then(res => resolve(res))
                .catch(res => reject("Error! Check if your file is correct and is a JSON file!"))
        })  
    }   
}