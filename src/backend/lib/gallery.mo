import List "mo:core/List";
import Storage "mo:caffeineai-object-storage/Storage";
import GalleryTypes "../types/gallery";
import Time "mo:core/Time";

module {
  public type GalleryItem = GalleryTypes.GalleryItem;

  public func addGalleryItem(
    items : List.List<GalleryItem>,
    nextId : Nat,
    title : Text,
    description : Text,
    category : Text,
    image : Storage.ExternalBlob,
    isPublished : Bool,
  ) : GalleryItem {
    let item : GalleryItem = {
      id = nextId;
      title;
      description;
      category;
      image;
      createdAt = Time.now();
      isPublished;
    };
    items.add(item);
    item;
  };

  public func getGalleryItems(items : List.List<GalleryItem>) : [GalleryItem] {
    items.filter(func(i) { i.isPublished }).toArray()
  };

  public func deleteGalleryItem(items : List.List<GalleryItem>, id : Nat) : Bool {
    let sizeBefore = items.size();
    let filtered = items.filter(func(i) { i.id != id });
    items.clear();
    items.append(filtered);
    items.size() < sizeBefore;
  };
};
