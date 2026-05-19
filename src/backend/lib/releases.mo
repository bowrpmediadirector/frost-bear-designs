import List "mo:core/List";
import Storage "mo:caffeineai-object-storage/Storage";
import ReleaseTypes "../types/releases";
import Time "mo:core/Time";

module {
  public type FreeRelease = ReleaseTypes.FreeRelease;

  public func addFreeRelease(
    releases : List.List<FreeRelease>,
    nextId : Nat,
    title : Text,
    description : Text,
    category : Text,
    file : Storage.ExternalBlob,
    isPublished : Bool,
  ) : FreeRelease {
    let release : FreeRelease = {
      id = nextId;
      title;
      description;
      category;
      file;
      downloadCount = 0;
      createdAt = Time.now();
      isPublished;
    };
    releases.add(release);
    release;
  };

  public func getFreeReleases(releases : List.List<FreeRelease>) : [FreeRelease] {
    releases.filter(func(r) { r.isPublished }).toArray()
  };

  public func incrementDownloadCount(releases : List.List<FreeRelease>, id : Nat) : Bool {
    var found = false;
    releases.mapInPlace(
      func(r) {
        if (r.id == id) {
          found := true;
          { r with downloadCount = r.downloadCount + 1 };
        } else { r };
      }
    );
    found;
  };

  public func deleteFreeRelease(releases : List.List<FreeRelease>, id : Nat) : Bool {
    let sizeBefore = releases.size();
    let filtered = releases.filter(func(r) { r.id != id });
    releases.clear();
    releases.append(filtered);
    releases.size() < sizeBefore;
  };
};
