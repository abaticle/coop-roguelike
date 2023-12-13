import Tile from './tile.js'
import * as tmx from 'tmx-parser'

export default class Map {

    width = 0
    height = 0
    
    rooms = [] 
    tiles = {}

    /**
     * 
     */
    constructor({name = ""}) {
        global.map = this

        this.name = name
    }


    _getCoordinatesFromIndex(index, width, height) {
        if (index < 1 || index > width * height) {
          console.error("Index hors des limites");
          return null;
        }
      
        const y = Math.floor(index / width)
        const x = index % width
      
        return { x, y } 
    }

    /**
     * @returns Promise
     */
    async parseTilemap() {
        return new Promise((resolve, reject) => {
            tmx.parseFile(`./lib/data/${this.name}`, (err, map) => {
                if (err) {
                    reject(error)
                }
                else {
                    resolve(map)
                }
            })
        })
    }



    parseLevelLayer(layer) {

        for (let x = 1; x <= this.width; x++) {
            for (let y = 1; y <= this.height; y++) {

                const layerTile = layer.tileAt(y, x) 
                let tile
                
                if (layerTile === undefined) {
                    tile = new Tile({
                        x,
                        y, 
                        id: 0,
                        walkable: true
                    })
                } else {
                    tile = new Tile({
                        x,
                        y, 
                        id: layerTile.id
                    })
                }

                this.tiles[`${x}-${y}`] = tile

            }
        }
    }

    parseEntitiesLayer(layer) {

    }

    
    async init() {
        //const target = path.join(__dirname, "vapor-test.tmx");

        //const fileData = await readFile(`lib/data/map_0.tmx`) 
        const {
            width,
            height,
            layers
        } = await this.parseTilemap("map_0.tmx")

        this.width = width
        this.height = height

        layers.forEach(layer => {
            switch(layer.name) {
                case "level":
                    this.parseLevelLayer(layer)
                    break
                case "entities":
                    this.parseEntitiesLayer(layer)
                    break

            }
        })
    }
}