import Storage "mo:caffeineai-object-storage/Storage";

module {
  public type FreeRelease = {
    id : Nat;
    title : Text;
    description : Text;
    category : Text;
    file : Storage.ExternalBlob;
    downloadCount : Nat;
    createdAt : Int;
    isPublished : Bool;
  };
};
