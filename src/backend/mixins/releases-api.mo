import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Storage "mo:caffeineai-object-storage/Storage";
import AccessControl "mo:caffeineai-authorization/access-control";
import ReleaseTypes "../types/releases";
import ReleasesLib "../lib/releases";

mixin (
  accessControlState : AccessControl.AccessControlState,
  freeReleases : List.List<ReleaseTypes.FreeRelease>,
  nextReleaseId : Nat,
) {
  var _nextReleaseId : Nat = nextReleaseId;

  public shared ({ caller }) func addFreeRelease(
    title : Text,
    description : Text,
    category : Text,
    file : Storage.ExternalBlob,
    isPublished : Bool,
  ) : async ReleaseTypes.FreeRelease {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add free releases");
    };
    let id = _nextReleaseId;
    _nextReleaseId += 1;
    ReleasesLib.addFreeRelease(freeReleases, id, title, description, category, file, isPublished);
  };

  public query func getFreeReleases() : async [ReleaseTypes.FreeRelease] {
    ReleasesLib.getFreeReleases(freeReleases);
  };

  public shared func incrementDownloadCount(id : Nat) : async Bool {
    ReleasesLib.incrementDownloadCount(freeReleases, id);
  };

  public shared ({ caller }) func deleteFreeRelease(id : Nat) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete free releases");
    };
    ReleasesLib.deleteFreeRelease(freeReleases, id);
  };
};
