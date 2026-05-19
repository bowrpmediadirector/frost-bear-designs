import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Storage "mo:caffeineai-object-storage/Storage";
import AccessControl "mo:caffeineai-authorization/access-control";
import GalleryTypes "../types/gallery";
import GalleryLib "../lib/gallery";

mixin (
  accessControlState : AccessControl.AccessControlState,
  galleryItems : List.List<GalleryTypes.GalleryItem>,
  nextGalleryId : Nat,
) {
  var _nextGalleryId : Nat = nextGalleryId;

  public shared ({ caller }) func addGalleryItem(
    title : Text,
    description : Text,
    category : Text,
    image : Storage.ExternalBlob,
    isPublished : Bool,
  ) : async GalleryTypes.GalleryItem {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add gallery items");
    };
    let id = _nextGalleryId;
    _nextGalleryId += 1;
    GalleryLib.addGalleryItem(galleryItems, id, title, description, category, image, isPublished);
  };

  public query func getGalleryItems() : async [GalleryTypes.GalleryItem] {
    GalleryLib.getGalleryItems(galleryItems);
  };

  public shared ({ caller }) func deleteGalleryItem(id : Nat) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete gallery items");
    };
    GalleryLib.deleteGalleryItem(galleryItems, id);
  };
};
