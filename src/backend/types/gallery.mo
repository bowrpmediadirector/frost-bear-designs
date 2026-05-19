import Storage "mo:caffeineai-object-storage/Storage";

module {
  public type GalleryItem = {
    id : Nat;
    title : Text;
    description : Text;
    category : Text;
    image : Storage.ExternalBlob;
    createdAt : Int;
    isPublished : Bool;
  };
};
