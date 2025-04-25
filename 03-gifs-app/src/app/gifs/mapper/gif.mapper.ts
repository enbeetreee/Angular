import type { Gif } from "../interfaces/gif.interface";
import type { GiphyItem} from "../interfaces/giphy.interface";

export class GifMapper{
  static mapGiphyItemtoGif(item: GiphyItem):Gif{
    return {
      id:item.id,
      title:item.title,
      url:item.images.original.url,
    }
  }

  static mapGiphyItemstoGifArray(items: GiphyItem[]): Gif[]{
    return items.map(this.mapGiphyItemtoGif)
  }
}
